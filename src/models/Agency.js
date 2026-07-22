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

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    members: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },

        name: {
          type: String,
          required: true,
        },

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
        ref: "Lead",
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