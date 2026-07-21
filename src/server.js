require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const listingRoutes = require("./routes/listingRoutes");
const agencyRoutes = require("./routes/agencyRoutes");
const leadRoutes = require("./routes/leadRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

connectDB();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://prop-nex-five.vercel.app"
    ],
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/agency", agencyRoutes);
app.use("/api/payment", paymentRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "PropNex API Running"
  });
});

module.exports = app;