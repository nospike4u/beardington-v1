/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  await knex("addresses").del();
  await knex("addresses").insert([
    // James Harrison (user_id: 1)
    {
      user_id: 1,
      full_name: "James Harrison",
      street: "123 Beard St",
      city: "Seattle",
      postal_code: "98101",
      country: "United States",
      phone: "206-555-0101",
      is_default: true,
    },
    {
      user_id: 1,
      full_name: "James Harrison",
      street: "77 Grooming Ave, Apt 4B",
      city: "Tacoma",
      postal_code: "98401",
      country: "United States",
      phone: "206-555-0102",
      is_default: false,
    },

    // Marcus Aurelius (user_id: 2)
    {
      user_id: 2,
      full_name: "Marcus Aurelius",
      street: "456 Moustache Ln",
      city: "Austin",
      postal_code: "73301",
      country: "United States",
      phone: "512-555-0201",
      is_default: true,
    },
    {
      user_id: 2,
      full_name: "Marcus Aurelius",
      street: "12 Philosophy Rd",
      city: "Dallas",
      postal_code: "75201",
      country: "United States",
      phone: "512-555-0202",
      is_default: false,
    },

    // Elena Fisher (user_id: 3)
    {
      user_id: 3,
      full_name: "Elena Fisher",
      street: "789 Grooming Blvd",
      city: "Miami",
      postal_code: "33101",
      country: "United States",
      phone: "305-555-0301",
      is_default: true,
    },
    {
      user_id: 3,
      full_name: "Elena Fisher",
      street: "34 Adventure Way, Suite 2",
      city: "Orlando",
      postal_code: "32801",
      country: "United States",
      phone: "305-555-0302",
      is_default: false,
    },

    // Arthur Morgan (user_id: 4)
    {
      user_id: 4,
      full_name: "Arthur Morgan",
      street: "101 Bristle Terrace",
      city: "Portland",
      postal_code: "97201",
      country: "United States",
      phone: "503-555-0401",
      is_default: true,
    },

    // Geralt Rivia (user_id: 5)
    {
      user_id: 5,
      full_name: "Geralt Rivia",
      street: "505 Silver Sword Way",
      city: "Denver",
      postal_code: "80201",
      country: "United States",
      phone: "720-555-0501",
      is_default: true,
    },
  ]);
};
