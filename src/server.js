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


// CORS

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://prop-nex-five.vercel.app"
    ],
    credentials: true
  })
);


// Body Parser

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Static Files

app.use(
  "/uploads",
  express.static("uploads")
);


// API Routes

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/agency", agencyRoutes);
app.use("/api/payment", paymentRoutes);


// Health Check

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "PropNex API Running"
  });
});


// 404

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found"
  });
});


const PORT = process.env.PORT || 5000;


const startServer = async () => {
  try {

    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {

    console.error("SERVER ERROR:", error);

    process.exit(1);
  }
};

startServer();