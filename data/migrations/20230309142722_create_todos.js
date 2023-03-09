/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  const all = knex.schema
    .createTable("Gorevler", (t) => {
      t.increments("GorevId");
      t.string("Adi").notNullable();
      t.string("Aciklama");
    })
    .createTable("Tasklar", (t) => {
      t.increments("Id");
      t.string("Adi").notNullable();
      t.string("Aciklama");
      t.dateTime("Tarih");
      t.integer("GorevId")
        .references("GorevId")
        .inTable("Gorevler")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
  return all;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Tasklar").dropTableIfExists("Gorevler");
};
