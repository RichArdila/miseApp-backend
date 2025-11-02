import pool from "../models/db.js";

export const createChecklist = async (req, res) => {
  const user_id = req.user.id;
  const { station_id } = req.body;

  try {
    //1. create main checklist
    const checklistRes = await pool.query(
      `INSERT INTO checklists (station_id, user_id)
            VALUES ($1, $2)
            RETURNING *`,
      [station_id, user_id]
    );

    const checklist = checklistRes.rows[0];

    //2. Get items for this station
    const { rows: stationItems } = await pool.query(
      `SELECT id FROM stations_items WHERE station_id = $1`,
      [station_id]
    );

    //3. Insert each items in checklist_items with status 'pending'
    for (const item of stationItems) {
      await pool.query(
        `INSERT INTO checklist_items (checklist_id, station_item_id)
            VALUES ($1, $2)`,
        [checklist.id, item.id]
      );
    }
    res.status(201).json({
      message: "Created Checklist successfully",
      checklist_id: checklist.id,
      total_items: stationItems.length,
      created_by: user_id,
    });
  } catch (error) {
    console.error("Error creating checklist: ", error.message);
    res
      .status(500)
      .json({ message: "Error creating checklist", error: error.message });
  }
};

export const getActiveChecklists = async (req, res) => {
  try {
    const { rows } = await pool.query(`
            SELECT c.*, s.name AS station_name, u.username
            FROM checklists c
            JOIN stations s ON c.station_id = s.id
            LEFT JOIN users u ON c.user_id = u.id
            WHERE C.status = 'active'
            ORDER BY c.started_at DESC
            `);
    res.json(rows);
  } catch (error) {
    console.error("Error getting checklists: ", error);
    res.status(500).json({ message: "Error getting checklists" });
  }
};

export const verifyChecklistItem = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;
  try {
    const result = await pool.query(
      `
            UPDATE checklist_items
            SET status = 'verified', verified_at = CURRENT_TIMESTAMP, verified_by = $1
            WHERE id = $2
            RETURNING *
            `,
      [user_id, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "item not found" });

    res.json({
      message: "Item verified successfully",
      verified_by: user_id,
      item: result.rows[0],
    });
  } catch (error) {
    console.error("Error verify item: ", error);
    res.status(500).json({ message: "Error verify item" });
  }
};

export const finishChecklist = async (req, res) => {
  const { id } = req.params; // ID del checklist
  const user_id = req.user.id;

  try {
    const result = await pool.query(
      `UPDATE checklists
         SET status = 'finished', finished_at = CURRENT_TIMESTAMP, finished_by = $1
         WHERE id = $2
         RETURNING *`,
      [user_id, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Checklist not found" });

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error finishing checklist: ", error);
    res.status(500).json({ message: "Error finishing checklist" });
  }
};
