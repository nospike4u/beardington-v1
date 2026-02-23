/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("order_items", function (table) {
    table.increments("id");
    table
      .integer("order_id")
      .references("id")
      .inTable("orders")
      .onDelete("CASCADE");
    table.integer("price_cents");
    table.integer("quantity").notNullable();
    table.string("name");
    table
      .integer("product_id")
      .references("id")
      .inTable("products")
      .onDelete("SET NULL");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("order_items");
};
