const { Client } = require("pg");
require('dotenv').config();

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 ),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO messages (username, message) VALUES
  ('Tyrell Wellick', 'Bonsoir'), 
  ('Walter White', 'I am the one who KNOCKS')
`;

async function main() {
  console.log("seeding...");
  console.log("Using the following database configuration:");
  console.log(`HOST: ${process.env.HOST}`);
  console.log(`USER: ${process.env.USER}`);
  console.log(`DATABASE: ${process.env.DATABASE}`);
  console.log(`PASSWORD: ${process.env.PASSWORD}`);
  console.log(`PORT: ${process.env.PORT}`);

  const client = new Client({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log("Database seeded successfully");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await client.end();
    console.log("Connection closed");
  }
}

main();