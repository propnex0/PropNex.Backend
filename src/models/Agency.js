const mongoose = require("mongoose");

const agencySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    ownerName: {
      type: String,
      required: true,
    },

    code: {
      type: String,
      unique: true,
      required: true,
    },

    members: [
      {
        name: String,
        role: {
          type: String,
          default: "Agent",
        },
      },
    ],

    listings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
      },
    ],

    leads: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Agency",
  agencySchema
);