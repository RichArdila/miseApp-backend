import express from "express";
import {
  createStation,
  getStation,
  updateStation,
} from "../controllers/stationController.js";
import { authMiddelware, authorizeRole } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", authMiddelware, authorizeRole("admin"), createStation);
router.get("/", authMiddelware, getStation);
router.patch("/:id", authMiddelware, authorizeRole("admin", updateStation));

export default router;
