const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting MongoDB...");

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected ✅");

  } catch (err) {
    console.log("MongoDB Error ❌");
    console.log(err.message);
  }
};

module.exports = connectDB;