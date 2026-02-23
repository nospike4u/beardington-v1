const db = require('../db');
const { getRequestBody } = require('../utils/bodyParser');

    const checkout = async (req, res) => {
        const trx = await db.transaction();
        try {
            const { cart, shippingAddress, billingAddress } = await getRequestBody(req);
            
            // Logic based on API.md requirement: Calculate totals
            const subtotalCents = cart.items.reduce((sum, i) => sum + (i.priceCents * i.quantity), 0);
            const taxCents = Math.round(subtotalCents * 0.08); // Example 8% tax but can change dependent on market or currency in the future.
            const shippingCents = 500;
            const totalCents = subtotalCents + taxCents + shippingCents;

            const [orderId] = await trx('orders').insert({
                user_id: cart.userId,
                sub_total_cents: subtotalCents,
                tax_cents: taxCents,
                shipping_cents: shippingCents,
                total_cents: totalCents,
                status: 'placed',
                shipping_address: shippingAddress,
                billing_address: billingAddress
            }).returning('id');

            const orderItems = cart.items.map(item => ({
                order_id: orderId.id || orderId,
                product_id: item.productId,
                name: item.name,
                price_cents: item.priceCents,
                quantity: item.quantity
            }));

            await trx('order_items').insert(orderItems);
            await trx.commit();

            res.writeHead(200);
            res.end(JSON.stringify({ message: "Order placed", orderId }));
        } catch (e) {
            await trx.rollback();
            res.writeHead(500);
            res.end(JSON.stringify({ error: e.message }));
        }
    };

    module.exports = { checkout };