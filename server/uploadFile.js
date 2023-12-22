var cloudinary = require("cloudinary").v2;

const cloud_name = process.env.CLOUD_NAME;
const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;

cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret,
});

const opts = {
    overwrite: true,
    invalidate: true,
    resource_type: "auto",
};

const uploadFile = (file) => {
    //Convert file to base64
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file, opts, (error, result) => {
            if (result && result.secure_url) {
                console.log(result.secure_url);
                return resolve(result.secure_url);
            } else {
                console.log(error.message);
                return reject({message: error.message});
            }
        });
    });
};

const uploadMultipleFiles = (files) => {
    const uploads = files.map((base) => uploadFile(base));
    return Promise.all(uploads);
};

module.exports = {
    uploadFile,
    uploadMultipleFiles,
};

// module.exports = (file) => {
//     return new Promise((resolve, reject) => {
//         cloudinary.uploader.upload(file, opts, (error, result) => {
//             if (result && result.secure_url) {
//                 console.log(result.secure_url);
//                 return resolve(result.secure_url);
//             }
//             console.log(error.message);
//             return reject({ message: error.message });
//         });
//     });
// };

// module.exports.uploadMultipleFiles = (files) => {
//     return new Promise((resolve, reject) => {
//       const uploads = files.map((base) => uploadFile(base));
//       Promise.all(uploads)
//         .then((values) => resolve(values))
//         .catch((err) => reject(err));
//     });
//   };