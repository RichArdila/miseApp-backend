import express from "express";
import { authMiddelware } from "../middlewares/auth.js";
import {
  createChecklist,
  finishChecklist,
  getActiveChecklists,
  verifyChecklistItem,
} from "../controllers/checklistController.js";

const router = express.Router();

router.post("/", authMiddelware, createChecklist);
router.get("/", authMiddelware, getActiveChecklists);
router.patch("/:id/verify", authMiddelware, verifyChecklistItem);
router.patch("/:id/finish", authMiddelware, finishChecklist);

export default router;
