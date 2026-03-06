/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("addresses", function (table) {
    table.increments("id");
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.string("full_name", 100).notNullable();
    table.string("street", 255).notNullable();
    table.string("city", 100).notNullable();
    table.string("postal_code", 20).notNullable();
    table.string("country", 100).notNullable();
    table.string("phone", 30);
    table.boolean("is_default").notNullable().defaultTo(false);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("addresses");
};
