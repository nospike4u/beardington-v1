/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("products").del();
  await knex("products").insert([
    {
      slug: "beard-oil-premium",
      name: "Beard Oil Premium",
      description: "Premium oil for a healthy beard.",
      price_cents: 2999,
      image_urls: JSON.stringify(["https://example.com/img1.jpg"]),
      category: "oils",
      in_stock_qty: 10,
    },
    {
      slug: "moustache-wax-classic",
      name: "Moustache Wax Classic",
      description: "Classic hold for your moustache.",
      price_cents: 1599,
      image_urls: JSON.stringify(["https://example.com/img2.jpg"]),
      category: "waxes",
      in_stock_qty: 15,
    },
    {
      slug: "sandalwood-beard-balm",
      name: "Sandalwood Beard Balm",
      description:
        "Medium hold balm with a classic woody scent to tame flyaways.",
      price_cents: 2499,
      image_urls: '["https://example.com/img3.jpg"]',
      category: "balms",
      in_stock_qty: 20,
    },
    {
      slug: "artisan-neem-wood-comb",
      name: "Artisan Neem Wood Comb",
      description: "Hand-carved anti-static comb that distributes oils evenly.",
      price_cents: 1250,
      image_urls: '["https://example.com/img4.jpg"]',
      category: "tools",
      in_stock_qty: 50,
    },
    {
      slug: "peppermint-beard-wash",
      name: "Peppermint Beard Wash",
      description:
        "Refreshing cleanser that removes grit without stripping natural oils.",
      price_cents: 1899,
      image_urls: '["https://example.com/img5.jpg"]',
      category: "washes",
      in_stock_qty: 12,
    },
    {
      slug: "boar-bristle-brush-pro",
      name: "Boar Bristle Brush Pro",
      description:
        "Firm bristles designed to exfoliate skin and soften coarse hair.",
      price_cents: 3499,
      image_urls: '["https://example.com/img6.jpg"]',
      category: "tools",
      in_stock_qty: 8,
    },
    {
      slug: "cedar-forest-oil-dry",
      name: "Cedar Forest Dry Oil",
      description:
        "A lightweight, fast-absorbing oil for a non-greasy matte finish.",
      price_cents: 2750,
      image_urls: '["https://example.com/img7.jpg"]',
      category: "oils",
      in_stock_qty: 25,
    },
    {
      slug: "citrus-conditioning-butter",
      name: "Citrus Conditioning Butter",
      description:
        "Deep-conditioning overnight treatment for maximum hydration.",
      price_cents: 2200,
      image_urls: '["https://example.com/img8.jpg"]',
      category: "balms",
      in_stock_qty: 14,
    },
    {
      slug: "precision-trimming-scissors",
      name: "Precision Trimming Scissors",
      description:
        "Japanese steel blades for perfect moustache and beard shaping.",
      price_cents: 4500,
      image_urls: '["https://example.com/img9.jpg"]',
      category: "tools",
      in_stock_qty: 5,
    },
    {
      slug: "unscented-sensitive-oil",
      name: "Unscented Sensitive Oil",
      description: "Hypoallergenic formula for easily irritated skin.",
      price_cents: 2999,
      image_urls: '["https://example.com/img10.jpg"]',
      category: "oils",
      in_stock_qty: 18,
    },
  ]);
};
