/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("Orders", function (table) {
    table.increments("id");
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("Users")
      .onDelete("SET NULL");
    table.integer("sub_total_cents");
    table.integer("tax_cents");
    table.integer("shipping_cents");
    table.integer("total_cents");
    table.string("status");
    table.text("billing_address");
    table.text("shipping_address");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("Orders");
};
