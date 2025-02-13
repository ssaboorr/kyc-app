import express from "express";
import {
  createCustomer,
  getAllCustomers,
} from "../controllers/customerInfoControllers.js";
import { protect, admin } from "../middlewares/authMiddlewares.js";
const router = express.Router();

router.route("/").get(getAllCustomers).post(protect, admin, createCustomer);

export default router;
