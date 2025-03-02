import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "./models/userModels.js";
import users from "./data/users.js";
import connectDb from "./config/db.js";

dotenv.config();

connectDb();

const importData = async () => {
  try {
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    console.log("Users Imported");
    process.exit();
  } catch (err) {
    console.error(`${err}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();

    console.log("Data destroyed");
    process.exit();
  } catch (err) {
    console.error(`${err}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
