import pool from "../models/db.js";

export const addStationItem = async (req, res) => {
  const { station_id, item_id, location_id, quantity } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO stations_items (station_id, item_id, location_id, quantity)
            VALUES ($1, $2, $3, $4) RETURNING *`,
      [station_id, item_id, location_id, quantity]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding station item:", error.message);
    res.status(500).json({ error: "Error adding station item" });
  }
};

export const getStationItem = async (req, res) => {
  const { station_id } = req.params;
  try {
    const result = await pool.query(
      `SELECT si.id, s.name AS station, i.name AS item, l.name AS location, i.type, si.quantity
            FROM stations_items si
            JOIN stations s ON si.station_id = s.id
            JOIN items i ON si.item_id = i.id
            JOIN locations l ON si.location_id = l.id
            WHERE si.station_id = $1`,
      [station_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error getting items from the station:", error);
    res.status(500).json({ message: "Error getting items from the station" });
  }
};
