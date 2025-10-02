import express from "express";
import { createItem } from "../controllers/itemsController.js";
import { authMiddelware, authorizeRole } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", authMiddelware, authorizeRole("admin"), createItem);

export default router;
