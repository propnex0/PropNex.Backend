const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

    const user = await User.create({
  name,
  email,
  password: hashedPassword,
  listingCredits: 0,
  packageName: "",
});

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      message: "User Registered Successfully",
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
    const user = await User.findOne({
      name: req.params.name,
    }).select("-password");

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
  loginUser,
  getProfile,
  updateProfile,
  addCredits,
  getBrokerProfile,
};
