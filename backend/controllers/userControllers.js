import asyncHandler from "express-async-handler";
import User from "../models/userModels.js";
import generateToken from "../utils/generateToke.js";
import UserKyc from "../models/kycModels.js";

// @desc    Auth user & get token
// @route   GET /api/users/login
// @access  public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && user.matchPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401); // Unauthorized
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400); // BAD REQUEST
    throw new Error("User already exists");
  }

  const user = await User.create({ email, password, role });

  if (user) {
    // 201 - created successfully

    res.status(201).json({
      _id: user._id,
      email: user.email,
      isAdmin: user.idAdmin,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400); // BAD REQUEST
    throw new Error("Invalid user data");
  }
});

export { authUser, registerUser };
