const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
{
  name:{
    type:String,
    required:true
  },

  phone:{
    type:String,
    default:""
  },

  email:{
    type:String,
    default:""
  },

  property:{
    type:String,
    default:""
  },

  status:{
    type:String,
    default:"New"
  },

  notes:{
    type:String,
    default:""
  },

  followUp:{
    type:String,
    default:""
  },

  followUpCompleted:{
    type:Boolean,
    default:false
  },

  followUpCompletedAt:{
    type:Date,
    default:null
  },

  assignedTo:{
    type:String,
    default:""
  },

  agencyCode:{
    type:String,
    default:""
  },

  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }

},
{
  timestamps:true
}
);


module.exports = mongoose.model(
  "Lead",
  leadSchema
);