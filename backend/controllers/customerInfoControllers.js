import asyncHandler from "express-async-handler";
import Customer from "../models/customersInfoModels.js";

// @desc    Fetch all users
// @route   GET /api/customer
// @access  public
export const getAllCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.find().populate({
    path: "user", // Assuming "user" is a reference to the User model
    match: { isAdmin: false }, // Only populate users where isAdmin is false
    select: "name email isAdmin", // Fetch only required fields
  });
  const filteredCustomers = customers.filter(
    (customer) => customer.user !== null
  );

  res.json(filteredCustomers);
});

// @desc    Add a customer detail
// @route   POST /api/customer/
// @access  private/admin
export const addCustomerDetails = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    image1,
    image2,
    image3,
    image4,
    gender,
    phone,
    user,
    address,
    kycStatus,
  } = req.body;

  console.log("customer with userId in backend==>", kycStatus);

  const customer = await Customer.findOne({ user });
  if (customer) {
    customer.firstName = firstName;
    customer.lastName = lastName;
    customer.email = email;
    customer.gender = gender;
    customer.image1 = image1;
    customer.image2 = image2;
    customer.image3 = image3;
    customer.image4 = image4;
    customer.phone = phone;
    customer.address = address;
    customer.kycStatus = kycStatus;

    const updatedCustomer = await customer.save();
    res.json(updatedCustomer);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Fetch single Customer
// @route   GET /api/customer/:id
// @access  public
export const getCustomerByUserId = asyncHandler(async (req, res) => {
  try {
    console.log("User ID:", req.params.id);

    const customer = await Customer.findOne({ user: req.params.id });

    if (!customer) {
      return res.status(404).json({ message: "Customer details not found" });
    }

    console.log("Customer details found==>", customer);

    res.json(customer);
  } catch (error) {
    console.error("Error fetching customer details:", error);
    res.status(500).json({ message: "Server error" });
  }
});
