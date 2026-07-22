const User = require("../models/User");
const Listing = require("../models/Listing");

// CREATE LISTING
const createListing = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const totalListings = await Listing.countDocuments({
      owner: req.user.id,
    });

    const isPaidListing = totalListings > 0;

    if (
      isPaidListing &&
      (user.listingCredits || 0) <= 0
    ) {
      return res.status(400).json({
        message:
          "Your free listing has already been used. Please purchase a package to add more properties.",
      });
    }

    const {
      title,
      price,
      location,
      propertyType,
      description,
      phone,
      whatsapp,
      transactionType,
      bhk,
      carpetArea,
      builtUpArea,
      superBuiltUpArea,
      bathrooms,
      balconies,
      floor,
      totalFloors,
      propertyAge,
      facing,
      furnishing,
      carParking,
      bikeParking,
      city,
      pinCode,
      googleMapUrl,
      brokerName,
      agencyName,
      status,
      amenities,
      swimmingPool,
      lift,
      gym,
    } = req.body;

    const images = req.files?.images
  ? req.files.images.map(
      (file) => file.path
    )
  : [];

console.log("FILES =",req.files);

    const video =
req.files?.video?.[0]
? req.files.video[0].path
: "";

    const agentPhoto =
req.files?.agentPhoto?.[0]
? req.files.agentPhoto[0].path
: "";

    const listing = await Listing.create({
      title,
      price,
      location,
      propertyType,
      description,
      phone,
      whatsapp,
      transactionType,
      bhk,
      carpetArea,
      builtUpArea,
      superBuiltUpArea,
      bathrooms,
      balconies,
      floor,
      totalFloors,
      propertyAge,
      facing,
      furnishing,
      carParking,
      bikeParking,
      city,
      pinCode,
      googleMapUrl,
      brokerName,
      agencyName,
      agentPhoto,
      status,
      amenities,
      swimmingPool,
      lift,
      gym,
      images,
      video,
      owner: req.user.id,
    });

    // Deduct credit after successful listing creation
    if (isPaidListing) {
      user.listingCredits -= 1;
      await user.save();
    }

    res.status(201).json(listing);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// MY LISTINGS
const getMyListings = async (req, res) => {
  try {
    const listings = await Listing.find({
      owner: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json(listings);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ALL LISTINGS
const getListings = async (req, res) => {
  try {
    const listings = await Listing.find().sort({
      createdAt: -1,
    });

    res.json(listings);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// SINGLE LISTING
const getSingleListing = async (req, res) => {
  try {
    const listing = await Listing.findById(
      req.params.id
    );

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    listing.views += 1;
    await listing.save();

    res.json(listing);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE LISTING
const deleteListing = async (req, res) => {
  try {
    await Listing.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Listing Deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE LISTING
const updateListing = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
    };

    if (req.files?.agentPhoto?.[0]) {
      updateData.agentPhoto =
req.files.agentPhoto[0].path;
    }

    if (req.files?.images?.length > 0) {
      updateData.images =
req.files.images.map(
(file)=>file.path
);
    }

    const listing =
      await Listing.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

    res.json(listing);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createListing,
  getListings,
  getMyListings,
  getSingleListing,
  deleteListing,
  updateListing,
};