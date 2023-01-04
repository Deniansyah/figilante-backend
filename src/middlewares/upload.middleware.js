const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//       return cb(new Error("Only image files are allowed!"), false);
//     } else {
//       const extension = file.originalname.split(".");
//       const ext = extension[extension.length - 1];
//       const filename = `${new Date().getDate()}_${new Date().getTime()}.${ext}`;
//       cb(null, filename);
//     }
//   },
// });

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "figilante-coffee",
    format: async (req, file) => path.extname(file.originalname).slice(1), // supports promises as well
    public_id: (req, file) => {
      const randomNumber = Math.round(Math.random() * 90000);
      const filename = `${randomNumber}${Date.now()}`;
      return filename;
    },
  },
});

const uploadImage = multer({
  storage: storage,
}).single("picture");

module.exports = (req, res, next) => {
  uploadImage(req, res, (error) => {
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    next();
  });
};
