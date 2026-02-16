/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("Products", function(table) {
    table.increments("id");
    table.string("slug");
    table.string("name");
    table.text("description");
    table.integer("price_cents");
    table.text("image_urls");
    table.string("category");
    table.integer("in_stock_qty");
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("Products");
};
