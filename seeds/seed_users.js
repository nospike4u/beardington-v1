/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  await knex("users").del();
  await knex("users").insert([
    {
      name: "James Harrison",
      password_hash:
        "$2b$12$LRYuS9H72S69.oV0/DshmOaFzWvP1V9H.m1K7vLz1Q5vR2w4x5y6z",
      email: "james.h@example.com",
      billing_address: "123 Beard St, Seattle, WA 98101",
      shipping_address: "123 Beard St, Seattle, WA 98101",
    },
    {
      name: "Marcus Aurelius",
      password_hash:
        "$2b$12$K89xP2j9L0m1N2o3P4q5R6s7T8u9V0w1X2y3Z4a5B6c7D8e9F0g1H",
      email: "marcus.wax@philosophy.com",
      billing_address: "456 Moustache Ln, Austin, TX 73301",
      shipping_address: "456 Moustache Ln, Austin, TX 73301",
    },
    {
      name: "Elena Fisher",
      password_hash:
        "$2b$12$Q1w2E3r4T5y6U7i8O9p0A1s2D3f4G5h6J7k8L9z0X1c2V3b4N5m6",
      email: "elena.f@adventure.io",
      billing_address: "789 Grooming Blvd, Miami, FL 33101",
      shipping_address: "789 Grooming Blvd, Miami, FL 33101",
    },
    {
      name: "Arthur Morgan",
      password_hash:
        "$2b$12$Z9x8C7v6B5n4M3k2J1h0G9f8D7s6A5p4O3i2U1y0T9r8E7e6W5q4",
      email: "arthur.m@outlaw.net",
      billing_address: "101 Bristle Terrace, Portland, OR 97201",
      shipping_address: "101 Bristle Terrace, Portland, OR 97201",
    },
    {
      name: "Geralt Rivia",
      password_hash:
        "$2b$12$M1n2B3v4C5x6Z7l8K9j0H1g2F3d4S5a6P7o8I9u0Y1t2R3e4W5q6",
      email: "white.wolf@kaermorhen.com",
      billing_address: "505 Silver Sword Way, Denver, CO 80201",
      shipping_address: "505 Silver Sword Way, Denver, CO 80201",
    },
  ]);
};
