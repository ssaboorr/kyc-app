import asyncHandler from "express-async-handler";
import UserKyc from "../models/kycModels.js";
import User from "../models/userModels.js";
import mongoose from "mongoose";

// @desc    Fetch all users
// @route   GET /api/customer
// @access  public
export const getAllUserKyc = asyncHandler(async (req, res) => {
  const userKycList = await UserKyc.find({});
  const totalCount = userKycList.length;
  const pendingCount = userKycList.filter(
    (user) => user.kycStatus === "Pending"
  ).length;
  const rejectedCount = userKycList.filter(
    (user) => user.kycStatus === "Reject"
  ).length;
  const approvedCount = userKycList.filter(
    (user) => user.kycStatus === "Approve"
  ).length;

  const userList = {
    userKycList,
    totalCount,
    pendingCount,
    rejectedCount,
    approvedCount,
  };

  res.json(userList);
});

// @desc    Add a customer detail
// @route   POST /api/customer/
// @access  private/admin
export const addUserKyc = asyncHandler(async (req, res) => {
  const userKyc = new UserKyc(req.body);
  const userKycData = await userKyc.save();
  res.json(userKycData);
});

// @desc    Fetch single Customer
// @route   GET /api/customer/:id
// @access  public
export const getUserKycbyId = asyncHandler(async (req, res) => {
  try {
    const userKyc = await UserKyc.findOne({ user: req.params.id });

    if (!userKyc) {
      return res.status(404).json({ message: "Customer details not found" });
    }

    console.log("userKyc ==>", userKyc);

    res.json(userKyc);
  } catch (error) {
    console.error("Error fetching customer details:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export const updateById = asyncHandler(async (req, res) => {
  console.log("Req body ==>", req.body, req.params.id);
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  const kyc = await UserKyc.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true, runValidators: true }
  );

  if (!kyc) {
    return res.status(404).json({ message: "Customer not found" });
  }
  res.json(kyc);
});
