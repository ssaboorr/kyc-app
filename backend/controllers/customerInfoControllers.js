import asyncHandler from "express-async-handler";
import Customer from "../models/customersInfoModels.js";

// @desc    Fetch all users
// @route   GET /api/users
// @access  public
export const getAllCustomers = asyncHandler(async (reg, res) => {
  const customers = await Customer.find({});
  res.json(customers);
});

// @desc    Add a customer
// @route   POST /api/customer/
// @access  private/admin
export const createCustomer = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    image1,
    image2,
    image3,
    image4,
    gender,
    address,
    phone,
  } = req.body;

  const customer = new Customer({
    firstName,
    lastName,
    email,
    image1,
    image2,
    image3,
    image4,
    gender,
    address,
    phone,
  });

  const createdCustomer = await customer.save();
  res.status(201).json(createdCustomer);
});
