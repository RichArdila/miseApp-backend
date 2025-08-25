import express from "express";
import pool from "../models/db.js";
import { createUsers, getUsers } from "../controllers/usersController.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUsers);

export default router;
