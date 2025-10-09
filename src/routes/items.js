import express from "express";
import {
  createItem,
  getItems,
  updateItems,
  deleteItem,
} from "../controllers/itemsController.js";
import { authMiddelware, authorizeRole } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", authMiddelware, authorizeRole("admin"), createItem);
router.get("/", authMiddelware, getItems);
router.patch("/:id", authMiddelware, authorizeRole("admin"), updateItems);
router.delete("/:id", authMiddelware, authorizeRole("admin"), deleteItem);

export default router;
