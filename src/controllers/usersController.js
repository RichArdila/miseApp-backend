import pool from "../models/db.js";
import bcrypt from "bcrypt";
import { capitalizeWords } from "../utils/format.js";
import { Pool } from "pg";

export const getUsers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, username, role, created_at FROM users"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error getting users" });
  }
};

export const createUsers = async (req, res) => {
  try {
    let { username, password } = req.body;

    username = capitalizeWords(username);

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username,role, created_at",
      [username, hashedPassword]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error creating user" });
  }
};
