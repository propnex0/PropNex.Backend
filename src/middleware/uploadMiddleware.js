const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = "propnex";

    if (file.fieldname === "images") {
      folder = "propnex/properties";
    }

    if (file.fieldname === "agentPhoto") {
      folder = "propnex/agents";
    }

    if (file.fieldname === "video") {
      return {
        folder: "propnex/videos",
        resource_type: "video",
      };
    }

    return {
      folder,
      resource_type: "image",
    };
  },
});

module.exports = multer({
  storage,
});