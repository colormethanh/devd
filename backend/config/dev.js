// configs for dev

module.exports = {
  MONGO_URI: "mongodb://localhost/devd",
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET_KEY: process.env.CLOUDINARY_SECRET_KEY,
};
