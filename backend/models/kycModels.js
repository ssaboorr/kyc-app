import mongoose from "mongoose";

const kycInfoSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    image1: {
      type: String,
      required: false,
    },
    image2: {
      type: String,
      required: false,
    },
    image3: {
      type: String,
      required: false,
    },
    image4: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
    },
    address: {
      type: String,
      required: false,
    },
    phone: {
      type: Number,
      required: false,
      default: 0,
    },
    kycStatus: {
      type: String,
      required: false,
      default: "Pending",
    },
  },
  {
    timestamps: false,
  }
);

const UserKyc = mongoose.model("UserKyc", kycInfoSchema);

export default UserKyc;
