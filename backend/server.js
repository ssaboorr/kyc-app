import express from "express";
import path from "path";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import customersRoutes from "./routes/customerRoutes.js";
import uploadRoute from "./routes/uploadsRoutes.js";

dotenv.config();
connectDb();

const app = express();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/uploads", uploadRoute);

app.get("/", (req, res) => {
  res.send("api is running");
});

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5001;

app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
