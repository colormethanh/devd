const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { extractPublicId } = require("cloudinary-build-url");
const multer = require("multer");
const keys = require("../config/keys");

cloudinary.config({
  cloud_name: keys.CLOUDINARY_CLOUD_NAME,
  api_key: keys.CLOUDINARY_API_KEY,
  api_secret: keys.CLOUDINARY_SECRET_KEY,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "devd",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

// Image deletion middleware
const deleteCloudinaryImage = async (req, res, next) => {
  try {
    const { image } = req.body;
    const imageUrl = image.url;

    const publicId = extractPublicId(imageUrl);

    if (publicId)
      cloudinary.uploader
        .destroy(publicId, { invalidate: true })
        .then((resp) => {
          console.log(resp);
        });
  } catch (err) {
    return next(err);
  }
};

const upload = multer({ storage });

module.exports = { upload, deleteCloudinaryImage };
