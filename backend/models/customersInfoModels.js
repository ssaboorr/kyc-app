import mongoose from "mongoose";

const customersInfoSchema = mongoose.Schema(
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
      default: "pending",
    },
  },
  {
    timestamps: false,
  }
);

const Customer = mongoose.model("CustomerInfo", customersInfoSchema);

export default Customer;
