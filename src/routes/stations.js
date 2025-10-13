import express from "express";
import { createStation, getStation } from "../controllers/stationController.js";
import { authMiddelware, authorizeRole } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", authMiddelware, authorizeRole("admin"), createStation);
router.get("/", authMiddelware, getStation);

export default router;
