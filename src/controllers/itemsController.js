import pool from "../models/db.js";

export const createItem = async (req, res) => {
  const { name, type, rotation_days, image_URL } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO items (name, type, rotation_days, image_URL)
            VALUES ($1,$2,$3,$4) RETURNING id, name, type, rotation_days, image_URL`,
      [name, type, rotation_days || null, image_URL || null]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
