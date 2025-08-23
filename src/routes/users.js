import express from "express";
import pool from "../models/db.js";
import { getUsers } from "../controllers/usersController.js";

const router = express.Router();

router.get("/", getUsers);

export default router;
