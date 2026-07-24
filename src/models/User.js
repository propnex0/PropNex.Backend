const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
  name:{
    type:String,
    required:true,
  },

  email:{
    type:String,
    required:true,
    unique:true,
  },

  password: {
  type: String,
  required: true,
},

resetOtp: {
  type: String,
  default: "",
},

resetOtpExpiry: {
  type: Date,
},

  photo:{
    type:String,
    default:"",
  },

  agencyName:{
    type:String,
    default:"",
  },

  phone:{
    type:String,
    default:"",
  },

  bio:{
    type:String,
    default:"",
  },

  facebook:{
    type:String,
    default:"",
  },

  instagram:{
    type:String,
    default:"",
  },

  linkedin:{
    type:String,
    default:"",
  },

  whatsapp:{
    type:String,
    default:"",
  },

  city:{
    type:String,
    default:"",
  },

  slug:{
    type:String,
    unique:true,
    sparse:true,
  },

  reraNumber:{
    type:String,
    default:"",
  },

  experience:{
    type:Number,
    default:0,
  },

  dealsClosed:{
    type:Number,
    default:0,
  },

  areas:[{
    type:String,
  }],

  propertyTypes:[{
    type:String,
  }],

  languages:[{
    type:String,
  }],

  responseTime:{
    type:String,
    default:"Within 24 hours",
  },

  listingCredits:{
    type:Number,
    default:0,
  },

  packageName:{
    type:String,
    default:"",
  },

  otp: {
  type: String,
  default: "",
},

otpExpire: {
  type: Date,
},

isVerified: {
  type: Boolean,
  default: false,
},

},
{
  timestamps:true,
}
);

module.exports = mongoose.model("User", userSchema);