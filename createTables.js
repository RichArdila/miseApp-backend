import dotenv from "dotenv";
import pool from "./src/models/db.js";

dotenv.config();

const createTables = async () => {
  try {
    await pool.query(`
        CREATE TABLE  IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)        
    `);
    console.log('Table "users" created sucessfully');
  } catch (error) {
    console.error('Error: Error creating table "users"', error.message);
  } finally {
    await pool.end();
  }
};

createTables();
