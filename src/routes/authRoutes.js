const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");


const {
  registerUser,
  verifyOtp,
  resendOtp,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
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
router.post(
  "/resend-otp", 
  resendOtp);

// FORGOT PASSWORD
router.post(
  "/forgot-password",
  forgotPassword
);
// VERIFY RESET OTP
router.post(
  "/verify-reset-otp",
  verifyResetOtp
);

// RESET PASSWORD
router.post(
  "/reset-password",
  resetPassword
);
// LOGIN
router.post(
  "/login",
  loginUser
);

router.get(
  "/broker/:id",
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