const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");


const {
  registerUser,
  verifyOtp,
  loginUser,
  getProfile,
  updateProfile,
  addCredits,
  getBrokerProfile,
} = require("../controllers/authController");



// REGISTER
router.post(
  "/register",
  registerUser
);

// VERIFY OTP
router.post(
  "/verify-otp",
  verifyOtp
);

// LOGIN
router.post(
  "/login",
  loginUser
);

router.get(
  "/broker/:name",
  getBrokerProfile
);

// PROFILE
router.get(
"/profile",
protect,
getProfile
);


// UPDATE PROFILE
router.put(
"/profile",
protect,
upload.single("photo"),
updateProfile
);


// ADD CREDITS
router.post(
"/add-credits",
protect,
addCredits
);



module.exports = router;