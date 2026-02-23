/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  await knex("order_items").del();
  await knex("order_items").insert([
    {
      order_id: 1,
      product_id: 1,
      name: "Beard Oil Premium",
      price_cents: 2999,
      quantity: 1,
    },
    {
      order_id: 1,
      product_id: 2,
      name: "Moustache Wax Classic",
      price_cents: 1501,
      quantity: 1,
    },
    {
      order_id: 2,
      product_id: 8,
      name: "Cedar Forest Dry Oil",
      price_cents: 2999,
      quantity: 1,
    },
    {
      order_id: 3,
      product_id: 2,
      name: "Moustache Wax Classic",
      price_cents: 1599,
      quantity: 1,
    },
    {
      order_id: 4,
      product_id: 7,
      name: "Precision Trimming Scissors",
      price_cents: 4500,
      quantity: 1,
    },
    {
      order_id: 4,
      product_id: 3,
      name: "Sandalwood Beard Balm",
      price_cents: 2000,
      quantity: 2,
    },
    {
      order_id: 5,
      product_id: 4,
      name: "Artisan Neem Wood Comb",
      price_cents: 1250,
      quantity: 1,
    },
  ]);
};
