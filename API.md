## GET /api/products

Get all products with optional filters.

Query params: ?q=search&category=oils

Response: 200 OK
{
"products": [
{ "id": 1, "slug": "beard-oil", "name": "...", "priceCents": 2999, ... }
]
}

Errors:

- 400 Bad Request (invalid query params)

## GET /api/products/:slug

Get a single product by slug.

Path params:

- slug (string, required)

Response: 200 OK
{
"product": {
"id": 1,
"slug": "beard-oil-premium-30ml",
"name": "Beard Oil Premium 30ml",
"description": "Oil for the beard",
"priceCents": 2999,
"imageUrls": ["https://..."],
"category": "hair-care",
"inStockQty": 12
}
}

Errors:

- 404 Not Found (product does not exist)

## GET /api/cart

Get cart returns items in the cart that have been added

GET /api/cart

{
"cart": {
"items":[
{ "productId": 1, "name": "Beard Oil", "priceCents": 30, "quantity": 2 },
{ "productId": 2, "name": "Beard Scent", "priceCents": 70, "quantity": 5 },
],
"subtotalCents": 90
}
}

- 403 Forbidden (this is not the user's cart)

## POST /api/cart/items/:productId

Response: 200 OK
{
"cart": [
{ "id": 1, "slug": "beard-oil", "name": "...", "priceCents": 2999, ... }
]
}

Errors:

- 404 Product cannot be found.

## DELETE /api/cart/items/:productId

When quantity <= 0 remove item

Response: 200 OK
{
"cart": [
{ "id": 1, "slug": "beard-oil", "name": "...", "priceCents": 2999, ... }
]
}

Errors:

- 404 Product cannot be found.

## POST /api/checkout

POST /api/checkout

- User must have an active and valid session i.e., logged in.
-
- Shipping costs, price for the item, sub total, taxes and total should be calculated
- No real payment processing (mock checkout only).
- No inventory sync beyond basic stock fields.

Response: 200 OK

// POST /api/checkout
{
"products": {
"name": "Oil",
"description": "Oil for the beard",
"priceCents": 4545,
"imageUrls": ["https://fake-images.com/images/12345"],
"category": "hair-care",
"inStockQty": "2"
},
"cart": { "userId": 286354,
items: [
{ 28762, "oil", 4545, 5 }
],
},
"orders": {
"userId": 34,
"subtotalCents": 5600,
"taxCents": 30,
"shippingCents": 45,
"totalCents": 5675,
"status": "placed",
"shippingAddress": "8 Leaf Road",
"billingAddress": "8 Leaf Road"
}
}

## GET /api/orders/:id

Path params

GET /api/orders/:id

- Check userId from the session against the order's userId.

Response: 200 OK

{
"order": {
"id": 123,
"userId": 321,
"items": ["beard oil", "shaving cream", "moustache wax"],
"subtotalCents": 22021,
"shippingCents": 3678,
"totalCents": 25699,
"status": "placed",
"shippingAddress": "8 Leaf Road",
"billingAddress": "8 Leaf Road"
}
}

Errors:

- 404 Not Found (orders don't exist)
- 403 Forbidden (user doesn't own this order)

## POST /api/signup

- First time sign up creates an entry in the database.
- Email and password created
- A user Id is created and immutable

## POST /api/login

- Email and password used to login. Needs to match the hash in the database else cannot login.
- User session can be stored in Redis like the cart data.

## POST /api/logout

- Destroy session on logout.
