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


// MongoDB
connectDB();


// CORS

app.use(
  cors({
    origin: [
      "https://prop-nex-frontend-fd2aw0fhe-prop-nex1.vercel.app",
      "https://prop-nex-frontend.vercel.app"
    ],
    credentials: true,
    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "OPTIONS"
    ],
    allowedHeaders: [
      "Content-Type",
      "Authorization"
    ]
  })
);


app.options("*", cors());


// Body

app.use(express.json());
app.use(express.urlencoded({
  extended:true
}));


// Routes

app.use("/api/auth", authRoutes);

app.use("/api/listings", listingRoutes);

app.use("/api/agency", agencyRoutes);

app.use("/api/leads", leadRoutes);

app.use("/api/payment", paymentRoutes);



app.get("/",(req,res)=>{
 res.json({
  success:true,
  message:"PropNex API Running"
 });
});


module.exports = app;