/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  await knex("orders").del();
  await knex("orders").insert([
    {
      user_id: 1,
      sub_total_cents: 4500,
      tax_cents: 360,
      shipping_cents: 500,
      total_cents: 5360,
      status: "completed",
      billing_address: "123 Beard St, Seattle, WA 98101",
      shipping_address: "123 Beard St, Seattle, WA 98101",
    },
    {
      user_id: 2,
      sub_total_cents: 2999,
      tax_cents: 240,
      shipping_cents: 0,
      total_cents: 3239,
      status: "shipped",
      billing_address: "456 Moustache Ln, Austin, TX 73301",
      shipping_address: "456 Moustache Ln, Austin, TX 73301",
    },
    {
      user_id: 1,
      sub_total_cents: 1599,
      tax_cents: 128,
      shipping_cents: 500,
      total_cents: 2227,
      status: "pending",
      billing_address: "123 Beard St, Seattle, WA 98101",
      shipping_address: "123 Beard St, Seattle, WA 98101",
    },
    {
      user_id: 3,
      sub_total_cents: 8500,
      tax_cents: 680,
      shipping_cents: 0,
      total_cents: 9180,
      status: "completed",
      billing_address: "789 Grooming Blvd, Miami, FL 33101",
      shipping_address: "789 Grooming Blvd, Miami, FL 33101",
    },
    {
      user_id: 4,
      sub_total_cents: 1250,
      tax_cents: 100,
      shipping_cents: 500,
      total_cents: 1850,
      status: "cancelled",
      billing_address: "101 Bristle Terrace, Portland, OR 97201",
      shipping_address: "101 Bristle Terrace, Portland, OR 97201",
    },
  ]);
};
