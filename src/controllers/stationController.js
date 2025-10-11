import pool from "../models/db.js";

export const createStation = async (req, res) => {
  const { name, description } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO stations (name, description)
         VALUES ($1, $2)
         ON CONFLICT (name) DO NOTHING
         RETURNING *`,
      [name, description]
    );
    if (rows.length === 0)
      return res.status(409).json({ message: "La estación ya existe" });
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
