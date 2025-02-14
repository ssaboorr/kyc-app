import express from "express";
import {
  addCustomerDetails,
  getAllCustomers,
  getCustomerByUserId,
} from "../controllers/customerInfoControllers.js";
import { protect, admin } from "../middlewares/authMiddlewares.js";
const router = express.Router();

router.route("/").get(getAllCustomers).post(protect, addCustomerDetails);
router.route("/:id").get(protect, getCustomerByUserId);

export default router;
