# Beardington MVP Spec (One Page)

## Core User Flows
- Browse catalog (landing page and product list).
- View product detail (images, price, description).
- Add/update/remove items in cart.
- Checkout (enter shipping/billing, review order, place order).
- Order confirmation (order id + summary).

## Data Models (Fields Only)
### User
- id: INTEGER PRIMARY KEY AUTOINCREMENT
- email: string NOT NULL
- passwordHash: string NOT NULL
- name: string NOT NULL
- billingAddress: string (nullable on signup but NOT NULL on checkout)
- shippingAddress: string (nullable on signup but NOT NULL on checkout)
- createdAt: datetime

### Products
- id: INTEGER PRIMARY KEY AUTOINCREMENT
- slug: string
- name: string
- description: string
- priceCents: number
- imageUrls: string[]
- category: string
- inStockQty: number
- createdAt: datetime

### Cart
- id: string
- userId: INTEGER (nullable for guest)
- items: CartItem[]
- subtotalCents: number
- updatedAt: datetime

### CartItem
- productId: INTEGER
- name: string NOT NULL
- priceCents: number
- quantity: number

### Order
- id: INTEGER PRIMARY KEY AUTOINCREMENT
- userId: INTEGER (nullable for guest)
- subtotalCents: number
- taxCents: number
- shippingCents: number
- totalCents: number
- status: string (placed, shipped, delivered)
- shippingAddress: string (nullable on signup but NOT NULL on checkout)
- billingAddress: string (nullable on signup but NOT NULL on checkout)
- createdAt: datetime

### OrderItem
- id: INTEGER PRIMARY KEY AUTOINCREMENT
- orderID: INTEGER
- productId: INTEGER
- name: string
- priceCents: number
- quantity: number

## Routes / Pages
- / (home)
- /products (catalog)
- /products/:slug (product detail)
- /cart (cart)
- /checkout (checkout)
- /orders/:id (order confirmation)

## Non-Goals (MVP)
- No real payment processing (mock checkout only).
- No Google OAuth yet (email/password only).
- No wishlists, personalization, or recommendations.
- No promotions, coupons, or advanced analytics.
- No inventory sync beyond basic stock fields.

## Tech Stack
- Client: Vanilla JS, HTML, CSS
- Server: Node.js (simple HTTP server + REST)
- Validation: Zod
- Cache: Redis (sessions, carts, product list)
- Persistence: SQLite for MVP (can move to Postgres later)
- Sessions: Stateful (server-side, Redis-backed)