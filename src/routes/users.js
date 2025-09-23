import express from "express";
import {
  createUsers,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/usersController.js";
import { authMiddelware, authorizeRole } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", authMiddelware, authorizeRole("admin"), getUsers);
router.post("/", authMiddelware, authorizeRole("admin"), createUsers);
router.patch("/:id", authMiddelware, authorizeRole("admin"), updateUser);
router.delete("/:id", authMiddelware, authorizeRole("admin"), deleteUser);

export default router;
