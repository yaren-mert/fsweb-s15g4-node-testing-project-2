/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const defGorevler = [
  { GorevId: 1, Adi: "Sağlıklı Beslen", Aciklama: "Sağlıklı Ol" },
];
const defTasklar = [
  {
    Adi: "Spora Git",
    Aciklama: "Spor Yap",
    Tarih: new Date().toLocaleString(),
    GorevId: 1,
  },
  {
    Adi: "Meyve Ye",
    Aciklama: "Sağlıklı Ol",
    Tarih: new Date().toLocaleString(),
    GorevId: 1,
  },
];

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("Gorevler").truncate();
  await knex("Gorevler").insert(defGorevler);

  await knex("Tasklar").truncate();
  await knex("Tasklar").insert(defTasklar);
};
