import express from "express";

import { protect, admin } from "../middlewares/authMiddlewares.js";
import {
  addUserKyc,
  getAllUserKyc,
  getUserKycbyId,
  updateById,
} from "../controllers/kycInfoControllers.js";
const router = express.Router();

router.route("/").get(protect, admin, getAllUserKyc).post(protect, addUserKyc);

router.route("/:id").get(protect, getUserKycbyId).put(protect, updateById);

export default router;
