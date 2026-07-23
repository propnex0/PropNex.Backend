const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate 6 Digit OTP
    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const otpExpire = new Date(
      Date.now() + 10 * 60 * 1000
    );

    // Create User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,

      listingCredits: 0,
      packageName: "",

      otp,
      otpExpire,
      isVerified: false,
    });

    // Send Email
    // Send Professional Email
await sendEmail(
  email,
  "Verify Your PropNex Account",
  `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Verify Your Email</title>
</head>

<body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0"
style="background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 5px 20px rgba(0,0,0,.08);">

<tr>
<td align="center" style="background:#166534;padding:30px;">
<h1 style="color:#fff;margin:0;font-size:30px;">
🏡 PropNex
</h1>
<p style="color:#d1fae5;margin-top:10px;">
India's Trusted Real Estate Platform
</p>
</td>
</tr>

<tr>
<td style="padding:40px;">

<h2 style="margin-top:0;color:#111827;">
Verify Your Email
</h2>

<p style="font-size:16px;color:#4b5563;line-height:28px;">
Hi,
</p>

<p style="font-size:16px;color:#4b5563;line-height:28px;">
Thank you for registering with <strong>PropNex</strong>.
Please use the verification code below to activate your account.
</p>

<div
style="
margin:35px auto;
width:240px;
background:#ecfdf5;
border:2px dashed #16a34a;
border-radius:12px;
padding:18px;
text-align:center;
font-size:36px;
font-weight:bold;
letter-spacing:8px;
color:#166534;
">
${otp}
</div>

<p style="text-align:center;color:#6b7280;font-size:15px;">
This OTP is valid for <strong>10 minutes</strong>.
</p>

<hr style="margin:35px 0;border:none;border-top:1px solid #e5e7eb;">

<p style="font-size:14px;color:#6b7280;line-height:24px;">
If you did not create a PropNex account, you can safely ignore this email.
</p>

</td>
</tr>

<tr>
<td align="center"
style="background:#f9fafb;padding:25px;color:#9ca3af;font-size:13px;">

© 2026 PropNex. All Rights Reserved.<br>

This is an automated email. Please do not reply.

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`
);

    res.status(200).json({
      message: "OTP Sent Successfully",
      email,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

   const resendOtp = async (req, res) => {

  try {



    const { email } = req.body;



    const user = await User.findOne({ email });



    if (!user) {

      return res.status(404).json({

        message: "User not found",

      });

    }



    const otp = Math.floor(

      100000 + Math.random() * 900000

    ).toString();



    user.otp = otp;

    user.otpExpire = new Date(

      Date.now() + 10 * 60 * 1000

    );



    await user.save();



    await sendEmail(

      email,

      "PropNex Email Verification",

      `

      <h2>Your New OTP</h2>



      <h1 style="letter-spacing:6px;color:#166534;">

        ${otp}

      </h1>



      <p>

      This OTP expires in 10 minutes.

      </p>

      `

    );



    res.json({

      message: "OTP Resent Successfully",

    });



  } catch (error) {



    res.status(500).json({

      message: error.message,

    });



  }

};
const verifyOtp = async (req, res) => {
  
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "Email already verified",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    if (new Date() > user.otpExpire) {
      return res.status(400).json({
        message: "OTP Expired",
      });
    }

    user.isVerified = true;
    user.otp = "";
    user.otpExpire = null;

    await user.save();

    const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

res.json({
  message: "Email Verified Successfully",

  token,

  _id: user._id,

  name: user.name,

  email: user.email,

  listingCredits: user.listingCredits,

  packageName: user.packageName,
});

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }
if (!user.isVerified) {
  return res.status(401).json({
    message: "Please verify your email first.",
  });
}
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({

_id:user._id,

name:user.name,

email:user.email,

listingCredits:user.listingCredits,

packageName:user.packageName,

token,

});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateProfile = async (req, res) => {
  try {

    console.log("BODY =", req.body);
    console.log("FILE =", req.file);

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = req.body.name || user.name;
    user.agencyName =
      req.body.agencyName || user.agencyName;
    user.phone =
      req.body.phone || user.phone;
    user.bio =
      req.body.bio || user.bio;
      user.facebook =
  req.body.facebook || user.facebook;

user.instagram =
  req.body.instagram || user.instagram;

user.linkedin =
  req.body.linkedin || user.linkedin;
      user.whatsapp =
  req.body.whatsapp || user.whatsapp;

user.city =
  req.body.city || user.city;

user.slug =
  req.body.slug || user.slug;

user.reraNumber =
  req.body.reraNumber || user.reraNumber;

user.experience =
  req.body.experience !== undefined
    ? Number(req.body.experience)
    : user.experience;


user.dealsClosed =
  req.body.dealsClosed !== undefined
    ? Number(req.body.dealsClosed)
    : user.dealsClosed;

user.responseTime =
  req.body.responseTime || user.responseTime;

user.areas =
  req.body.areas
    ? JSON.parse(req.body.areas)
    : user.areas;

user.languages =
  req.body.languages
    ? JSON.parse(req.body.languages)
    : user.languages;

user.propertyTypes =
  req.body.propertyTypes
    ? JSON.parse(req.body.propertyTypes)
    : user.propertyTypes;

    if (req.file) {
  user.photo = req.file.path;
}

    const updatedUser = await user.save();

    console.log("UPDATED USER =", updatedUser);

    const safeUser = updatedUser.toObject();

delete safeUser.password;

res.json(safeUser);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getBrokerProfile = async (req, res) => {
  try {
    const user = await User.findById(
  req.params.id
).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "Broker not found",
      });
    }

    res.json(user);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const addCredits = async (req,res)=>{
  try{

    const { credits, packageName } = req.body;


    const user = await User.findById(req.user.id);


    if(!user){
      return res.status(404).json({
        message:"User not found"
      });
    }


    user.listingCredits =
      (user.listingCredits || 0) + Number(credits);


    user.packageName = packageName || "";


    await user.save();


    res.json({
      message:"Credits Added Successfully",
      listingCredits:user.listingCredits,
      packageName:user.packageName
    });


  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }
};
module.exports = {
  registerUser,
  verifyOtp,
  resendOtp,
  loginUser,
  getProfile,
  updateProfile,
  addCredits,
  getBrokerProfile,
};
