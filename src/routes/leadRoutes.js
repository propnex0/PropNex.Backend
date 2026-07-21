const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const Lead = require("../models/Lead");


// CREATE LEAD

router.post("/", protect, async(req,res)=>{

try{

const lead = await Lead.create({

name:req.body.name,

phone:req.body.phone,

email:req.body.email,

property:req.body.property,

status:req.body.status || "New",

notes:req.body.notes,

followUp:req.body.followUp,

assignedTo:req.body.assignedTo,

agencyCode:req.body.agencyCode,

owner:req.user._id

});


res.json(lead);


}
catch(error){

res.status(500).json({
message:error.message
});

}

});




// GET ALL LEADS

router.get("/", protect, async(req,res)=>{

try{

const leads = await Lead.find({
owner:req.user._id
});


res.json(leads);


}
catch(error){

res.status(500).json({
message:error.message
});

}

});





// GET SINGLE LEAD

router.get("/:id",protect,async(req,res)=>{

try{


const lead = await Lead.findOne({

_id:req.params.id,

owner:req.user._id

});


if(!lead){

return res.status(404).json({
message:"Lead not found"
});

}


res.json(lead);



}
catch(error){

res.status(500).json({
message:error.message
});

}

});





// UPDATE LEAD


router.put("/:id",protect,async(req,res)=>{

try{


const lead = await Lead.findOneAndUpdate(

{
_id:req.params.id,
owner:req.user._id
},

req.body,

{
new:true
}

);


res.json(lead);


}
catch(error){

res.status(500).json({
message:error.message
});

}

});





// DELETE LEAD


router.delete("/:id",protect,async(req,res)=>{

try{


await Lead.findOneAndDelete({

_id:req.params.id,

owner:req.user._id

});


res.json({
message:"Lead Deleted"
});


}
catch(error){

res.status(500).json({
message:error.message
});

}

});




module.exports = router;