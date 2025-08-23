import pool from "../models/db.js";

export const getUsers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, username, created_at FROM users"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error getting users" });
  }
};
