import pool from "../models/db.js";
import { capitalizeWords } from "../utils/format.js";

export const createItem = async (req, res) => {
  const { name, type, rotation_days, image_URL } = req.body;
  try {
    const formattedName = capitalizeWords(name);
    const result = await pool.query(
      `INSERT INTO items (name, type, rotation_days, image_URL)
            VALUES ($1,$2,$3,$4) RETURNING id, name, type, rotation_days, image_URL`,
      [formattedName, type, rotation_days || null, image_URL || null]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getItems = async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT * from items ORDER BY id `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateItems = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, rotation_days, image_URL } = req.body;

    let updateFields = [];
    let values = [];

    if (name) {
      updateFields.push("name =  $" + (values.length + 1));
      values.push(capitalizeWords(name));
    }

    if (type) {
      updateFields.push("type =  $" + (values.length + 1));
      values.push(type);
    }

    if (rotation_days) {
      updateFields.push("rotation_days = $" + (values.length + 1));
      values.push(rotation_days);
    }

    if (image_URL) {
      updateFields.push("image_URL = $" + (values.length + 1));
      values.push(image_URL);
    }

    if (values.length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    values.push(id);

    const query = `UPDATE items SET ${updateFields.join(", ")} WHERE id = $${
      values.length
    } RETURNING id, name, type, rotation_days, image_URL`;

    const result = await pool.query(query, values);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Item not found" });
    }
    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: "Error updating item" });
  }
};
