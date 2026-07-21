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

router.post(
  "/",
  protect,
  upload.fields([
    {
      name: "images",
      maxCount: 10,
    },
    {
      name: "video",
      maxCount: 1,
    },
    {
  name: "agentPhoto",
  maxCount: 1,
},
  ]),
  createListing
);

router.get("/", protect, getListings);
router.get(
"/my",
protect,
getMyListings
);

router.put(
  "/:id",
  protect,
  upload.fields([
    {
      name: "images",
      maxCount: 10,
    },
    {
      name: "video",
      maxCount: 1,
    },
{
    name: "agentPhoto",
    maxCount: 1,
  },

  ]),
  updateListing
);

router.delete("/:id", deleteListing);

router.get("/:id", getSingleListing);

module.exports = router;