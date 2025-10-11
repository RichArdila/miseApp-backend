import express from "express";
import { createStation } from "../controllers/stationController.js";
import { authMiddelware, authorizeRole } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", authMiddelware, authorizeRole("admin"), createStation);

export default router;
