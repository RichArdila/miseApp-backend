import pool from "../models/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

//POST /auth/login
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query(
      "SELECT id, username, password, role FROM users WHERE username = $1",
      [username]
    );
    if (result.rows.length === 0)
      return res.status(400).json({ message: "User not found" });

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      SECRET_KEY
      // { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error in login" });
  }
};
