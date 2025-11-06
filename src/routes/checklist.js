import express from "express";
import { authMiddelware } from "../middlewares/auth.js";
import {
  createChecklist,
  finishChecklist,
  getActiveChecklists,
  getAllChecklists,
  verifyChecklistItem,
} from "../controllers/checklistController.js";

const router = express.Router();

router.post("/", authMiddelware, createChecklist);
router.get("/", authMiddelware, getActiveChecklists);
router.get("/all", authMiddelware, getAllChecklists);
router.patch("/:id/verify", authMiddelware, verifyChecklistItem);
router.patch("/:id/finish", authMiddelware, finishChecklist);

export default router;
