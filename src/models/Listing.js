const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    price: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    propertyType: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    phone: String,
    whatsapp: String,

    transactionType: String,
    bhk: String,

    carpetArea: String,
    builtUpArea: String,
    superBuiltUpArea: String,

    bathrooms: String,
    balconies: String,

    floor: String,
    totalFloors: String,

    propertyAge: String,
    facing: String,
    furnishing: String,

    carParking: String,
    bikeParking: String,

    city: String,
    pinCode: String,

    googleMapUrl: String,

    brokerName: String,
    agencyName: String,

    views: {
      type: Number,
      default: 0,
    },

    status: {
  type: String,
  default: "Live",
},

    agentPhoto: String,

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    swimmingPool: String,
    lift: String,
    gym: String,

    amenities: [String],

    images: [
      {
        type: String,
      },
    ],

    video: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Listing",
  listingSchema
);