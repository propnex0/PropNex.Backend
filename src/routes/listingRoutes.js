const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const protect = require("../middleware/authMiddleware");

const {
  createListing,
  getMyListings,
  getListings,
  getSingleListing,
  deleteListing,
  updateListing,
} = require("../controllers/listingController");

// CREATE LISTING
router.post(
  "/",
  protect,
  upload.fields([
    {
      name: "images",
      maxCount: 10,
    },
    {
      name: "agentPhoto",
      maxCount: 1,
    },
  ]),
  createListing
);

// GET ALL LISTINGS
router.get("/", protect, getListings);

// MY LISTINGS
router.get("/my", protect, getMyListings);

// UPDATE LISTING
router.put(
  "/:id",
  protect,
  upload.fields([
    {
      name: "images",
      maxCount: 10,
    },
    {
      name: "agentPhoto",
      maxCount: 1,
    },
  ]),
  updateListing
);

// DELETE LISTING
router.delete("/:id", deleteListing);

// SINGLE LISTING
router.get("/:id", getSingleListing);

module.exports = router;