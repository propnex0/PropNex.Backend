const Agency = require("../models/Agency");


// CREATE AGENCY
const createAgency = async (req, res) => {
  try {

    const {
      name,
      ownerName,
      code,
      userId
    } = req.body;

    const existingAgency = await Agency.findOne({
      code
    });

    if (existingAgency) {
      return res.status(400).json({
        message: "Agency code already exists"
      });
    }

    const agency = await Agency.create({
      name,
      ownerName,
      code,
      ownerId: userId,
      members: [],
      listings: [],
      leads: []
    });

    res.status(201).json({
      message: "Agency Created Successfully",
      agency
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }
};


// JOIN AGENCY
const joinAgency = async (req, res) => {

  try {

    const {
      code,
      memberName,
      userId
    } = req.body;

    const agency = await Agency.findOne({
      code
    });

    if (!agency) {
      return res.status(404).json({
        message: "Invalid Agency Code"
      });
    }

    const alreadyMember = agency.members.some(
      (member) =>
        member.userId?.toString() === userId ||
        member.name.toLowerCase() ===
        memberName.toLowerCase()
    );

    if (alreadyMember) {
      return res.status(400).json({
        message: "Member Already Exists"
      });
    }

    agency.members.push({
      userId,
      name: memberName,
      role: "Agent"
    });

    await agency.save();

    res.status(200).json({
      message: "Joined Agency Successfully",
      agency
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};


// GET AGENCY
const getAgency = async (req, res) => {

  try {

    const agency = await Agency.findOne({
      code: req.params.code
    })
      .populate("listings")
      .populate("ownerId", "name email");

    if (!agency) {
      return res.status(404).json({
        message: "Agency Not Found"
      });
    }

    res.json(agency);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};


module.exports = {
  createAgency,
  joinAgency,
  getAgency
};