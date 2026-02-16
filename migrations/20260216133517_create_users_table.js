/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("Users", function (table) {
    table.increments("id");
    table.string("name", 50).notNullable();
    table.string("password_hash").notNullable();
    table.string("email", 100).unique().notNullable();
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
    return knex.schema.dropTable("Users");
};
