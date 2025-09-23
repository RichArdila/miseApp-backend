import pool from "../models/db.js";
import bcrypt from "bcrypt";
import { capitalizeWords } from "../utils/format.js";

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
    let { username, password, role } = req.body;

    username = capitalizeWords(username);
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id, username, role, created_at",
      [username, hashedPassword, role]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error creating user" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, role } = req.body;

    console.log("Parametros recibidos:", { id, username, password, role }); // 👈 Log de depuración

    let updateFields = [];
    let values = [];

    if (username) {
      updateFields.push("username = $" + (values.length + 1));
      values.push(capitalizeWords(username));
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.push("password = $" + (values.length + 1));
      values.push(hashedPassword);
    }

    if (role) {
      updateFields.push("role = $" + (values.length + 1));
      values.push(role);
    }

    if (values.length === 0) {
      return res.status(400).json({ message: " There's not field to update" });
    }

    values.push(id);

    const query = `UPDATE users SET ${updateFields.join(", ")} WHERE id = $${
      values.length
    } RETURNING id, username, role, created_at`;

    console.log("Query generada:", query); // 👈 Log de depuración
    console.log("Valores:", values); // 👈 Log de depuración

    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);

    console.error("Error real:", error); // 👈 Mostrar error real en consola

    res.status(500).json({ error: "Error updating user" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.json({ message: "Deleted User" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error deleting user" });
  }
};
