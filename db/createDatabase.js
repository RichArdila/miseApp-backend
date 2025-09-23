import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Client } = pg;

async function createDatabase() {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });
  try {
    await client.connect();
    await client.query("CREATE DATABASE mise_en_place_db");
    console.log("Database created successfully!");
  } catch (error) {
    if (error.code === "42P04") {
      console.log("The database already exists");
    } else {
      console.error("Error creating database: ", error.message);
    }
  } finally {
    await client.end();
  }
}

createDatabase();
