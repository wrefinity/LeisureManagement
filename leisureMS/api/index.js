import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import reserveRoute from "./routes/reservations.js";
import bookingRoute from "./routes/booking.js";
import categoryRoute from "./routes/category.js";
import coupsRoute from "./routes/coup.js";
import createAdminUser from "./utils/createAdmin.js"
import cors from "cors";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    await createAdminUser();
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/coupons", coupsRoute);
app.use("/api/reservations", reserveRoute);
app.use("/api/bookings", bookingRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(process.env.SERVER_PORT || 8033, () => {
  connect();
  console.log("Connected to backend.");
});
