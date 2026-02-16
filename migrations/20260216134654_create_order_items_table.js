/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("Order_items", function (table) {
    table.increments("id");
    table
      .integer("orders_id")
      .references("id")
      .inTable("Orders")
      .onDelete("CASCADE");
    table.integer("price_cents");
    table.integer("quantity").notNullable();
    table.string("name");
    table
      .integer("product_id")
      .references("id")
      .inTable("Products")
      .onDelete("SET NULL");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("Order_items");
};
