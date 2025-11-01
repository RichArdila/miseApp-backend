import express from "express";
import {
  addStationItem,
  deleteStationItem,
  getStationItem,
  updateStationItem,
} from "../controllers/stationItemsController.js";
import { authMiddelware, authorizeRole } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", authMiddelware, authorizeRole("admin"), addStationItem);
router.get("/:station_id", authMiddelware, getStationItem);
router.patch("/:id", authMiddelware, authorizeRole("admin"), updateStationItem);
router.delete(
  "/:id",
  authMiddelware,
  authorizeRole("admin"),
  deleteStationItem
);

export default router;
