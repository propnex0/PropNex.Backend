const express = require("express");
const router = express.Router();

const {
  createAgency,
  joinAgency,
  getAgency,
} = require("../controllers/agencyController");


// Create Agency
router.post(
  "/create",
  createAgency
);


// Join Agency
router.post(
  "/join",
  joinAgency
);


// Get Agency
router.get(
  "/:code",
  getAgency
);


module.exports = router;