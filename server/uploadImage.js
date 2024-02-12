const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true
});

const opts = {
    overwrite: true,
    invalidate: true,
    resource_type: "auto",
};

const uploadImage = (image) => {
    return cloudinary.uploader.upload(image, opts)
    .then((result) => {
      if (result && result.secure_url) {
        console.log(result.secure_url);
        return result.secure_url;
      } else {
        console.log("Error uploading image. No secure_url in the result.");
        throw new Error("Error uploading image.");
      }
    })
    .catch((error) => {
      console.log("Error uploading image:", error.message);
      throw new Error(error.message);
    });
};

module.exports = {
    uploadImage: uploadImage,
    uploadMultipleImages: (images) => {
      const uploads = images.map((base) => uploadImage(base));
      return Promise.all(uploads);
    },
  };