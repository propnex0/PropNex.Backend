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


// MongoDB Connect

connectDB();


// CORS

app.use(
  cors({
    origin:[
      "https://prop-nex-frontend-fd2aw0fhe-prop-nex1.vercel.app"
    ],
    credentials:true,
    methods:[
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "OPTIONS"
    ],
    allowedHeaders:[
      "Content-Type",
      "Authorization"
    ]
  })
);cd


// Body Parser

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Static Files

app.use(
  "/uploads",
  express.static("uploads")
);


// Routes

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/agency", agencyRoutes);
app.use("/api/payment", paymentRoutes);


// Home Route

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "PropNex API Running"
  });
});


// 404 Route

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found"
  });
});


// Export for Vercel

module.exports = app;