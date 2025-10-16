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

export const getStation = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM stations ORDER BY id ASC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// create updateStation
export const updateStation = async (req, res) => {
  console.log("Ruta alcanzada: updateStation");
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    let updateFields = [];
    let values = [];

    if (name) {
      updateFields.push("name = $" + (values.length + 1));
      values.push(name);
    }

    if (description) {
      updateFields.push("description = $" + (values.length + 1));
      values.push(description);
    }

    if (values.length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    values.push(id);

    const query = `UPDATE stations SET ${updateFields.join(", ")} WHERE id = $${
      values.length
    }
    RETURNING id, name, description`;

    const result = await pool.query(query, values);
    if (result.rowCount === 0) {
      return res.status(400).json({ error: "Station not found" });
    }
    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: "Error updating station" });
  }
};

// create deleteStation
export const deleteStation = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`DELETE FROM stations WHERE id = $1`, [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Station not found" });
    }
    return res.json({ message: "Station deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
