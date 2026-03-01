const db = require('../db');
const redisClient = require('../redisClient');
const { getSessionUserId } = require('../utils/session');

const SHIPPING_CENTS = 150; // £1.50 flat rate

const placeOrder = async (req, res) => {
    const userId = await getSessionUserId(req);
    if (!userId) {
        res.writeHead(401);
        return res.end(JSON.stringify({ error: 'Not authenticated' }));
    }

    const cartData = await redisClient.get(`cart:${userId}`);
    const cart = cartData ? JSON.parse(cartData) : { items: [] };

    if (!cart.items || cart.items.length === 0) {
        res.writeHead(400);
        return res.end(JSON.stringify({ error: 'Cart is empty' }));
    }

    const ids = cart.items.map(i => i.productId);
    const products = await db('products').whereIn('id', ids);
    const productMap = Object.fromEntries(products.map(p => [p.id, p]));

    const subtotalCents = cart.items.reduce((sum, item) => {
        const product = productMap[item.productId];
        return sum + (product ? product.price_cents * item.quantity : 0);
    }, 0);
    const totalCents = subtotalCents + SHIPPING_CENTS;

    const user = await db('users').where({ id: userId }).first();

    const trx = await db.transaction();
    try {
        const [orderRow] = await trx('orders').insert({
            user_id: userId,
            sub_total_cents: subtotalCents,
            tax_cents: 0,
            shipping_cents: SHIPPING_CENTS,
            total_cents: totalCents,
            status: 'placed',
            shipping_address: user.shipping_address || '',
            billing_address: user.billing_address || '',
        }).returning('id');

        const orderId = orderRow.id ?? orderRow;

        const orderItems = cart.items.map(item => {
            const product = productMap[item.productId];
            return {
                order_id: orderId,
                product_id: item.productId,
                name: product?.name || 'Unknown',
                price_cents: product?.price_cents || 0,
                quantity: item.quantity,
            };
        });

        await trx('order_items').insert(orderItems);
        await trx.commit();

        await redisClient.del(`cart:${userId}`);

        res.writeHead(200);
        res.end(JSON.stringify({ message: 'Order placed', orderId }));
    } catch (e) {
        await trx.rollback();
        res.writeHead(500);
        res.end(JSON.stringify({ error: e.message }));
    }
};

const getOrder = async (req, res, orderId) => {
    const userId = await getSessionUserId(req);
    if (!userId) {
        res.writeHead(401);
        return res.end(JSON.stringify({ error: 'Not authenticated' }));
    }

    const order = await db('orders').where({ id: orderId }).first();
    if (!order) {
        res.writeHead(404);
        return res.end(JSON.stringify({ error: 'Order not found' }));
    }
    if (order.user_id !== userId) {
        res.writeHead(403);
        return res.end(JSON.stringify({ error: 'Forbidden' }));
    }

    const items = await db('order_items').where({ order_id: orderId });

    res.writeHead(200);
    res.end(JSON.stringify({ order: { ...order, items } }));
};

module.exports = { placeOrder, getOrder };
