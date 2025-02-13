import mongoose from "mongoose";

const customersInfoSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
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
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("CustomerInfo", customersInfoSchema);

export default Customer;
