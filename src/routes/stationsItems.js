import express from "express";
import {
  addStationItem,
  getStationItem,
} from "../controllers/stationItemsController.js";
import { authMiddelware, authorizeRole } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", authMiddelware, authorizeRole("admin"), addStationItem);
router.get("/:station_id", authMiddelware, getStationItem);

export default router;
