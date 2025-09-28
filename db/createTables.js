import dotenv from "dotenv";
import pool from "../src/models/db.js";

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

    await pool.query(`
      CREATE TABLE IF NOT EXISTS items (
      id SERIAL PRIMARY KEY, 
      name VARCHAR(150) UNIQUE NOT NULL),
      type VARCHAR(20) CHECK (type IN ('Food', 'Tools')) NOT NULL,
      rotation_days INT,  -- only for food items
      imagen_URL TEXT
      `);
    console.log('table "items" created sucessfully');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS stations_items (
      id SERIAL PRIMARY KEY,
      station VARCHAR(50) NOT NULL,
      subcategory VARCHAR(20) NOT NULL, -- Ej: Food or Tools
      location VARCHAR(50) NOT NULL,
      item_id INT REFERENCES items(id) ON DELETE CASCADE,
      quantity INT DEFAULT 0,
      UNIQUE (station, subcategory, location, item_id) -- Ensure each combination is unique
      )
      `);
    console.log('table "stations_items" created sucessfully');

    // Checklist table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS checklists (
      id SERIAL PRIMARY KEY,
      station VARCHAR(50) NOT NULL,
      user_id INT REFERENCES users(id) ON DELETE SET NULL,
      status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('activo', 'finished')),
      started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      finished_at TIMESTAMP,
      finished_by INT REFERENCES users(id) ON DELETE SET NULL
      `);
    console.log('table "checklists" created sucessfully');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS checklist_items (
      id SERIAL PRIMARY KEY,
      checklist_id INT REFERENCES checklists(id) ON DELETE CASCADE,
      station_item_id INT REFERENCES station_items(id) ON DELETE CASCADE,
      status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'verified')),
      verified_at TIMESTAMP,
      verified_by INT REFERENCES users(id) ON DELETE SET NULL
      `);
    console.log('table "checklist_items" created sucessfully');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS created_history (
      id SERIAL PRIMARY KEY,
      checklist_id INT REFERENCES checklists(id) ON DELETE CASCADE,
      finished_at TIMESTAMP,
      finished_by INT REFERENCES users(id)
      `);
    console.log('table "created_history" created sucessfully');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS checklist_items_history (
      id SERIAL PRIMARY KEY,
      history_id INT REFERENCES checklist_history(id) ON DELETE CASCADE,
      item_name VARCHAR(150),
      status VARCHAR(20)
      `);
    console.log('table "checklist_items_history" created sucessfully');
  } catch (error) {
    console.error('Error: Error creating table "users"', error.message);
  } finally {
    await pool.end();
  }
};

createTables();
