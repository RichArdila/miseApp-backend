import express from "express";
import {
  createLocation,
  getLocations,
  updateLocation,
  deleteLocation,
} from "../controllers/locationController.js";
import { authMiddelware, authorizeRole } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", authMiddelware, authorizeRole("admin"), createLocation);
router.get("/", authMiddelware, getLocations);
router.patch("/:id", authMiddelware, authorizeRole("admin"), updateLocation);
router.delete("/:id", authMiddelware, authorizeRole("admin"), deleteLocation);

export default router;
