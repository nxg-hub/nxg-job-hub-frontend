require('dotenv').config();

const express = require("express");
const cors = require("cors");
const uploadImage = require("./uploadImage.js");
const app = express();
// const port = process.env.PORT;
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: '*', // Allow requests from any origin
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));

app.post("/uploadImage", (req, res) => {
  uploadImage.uploadImage(req.body.image)
  .then((url) => res.send(url))
  .catch((err) => res.status(500).send(err));  
});

app.post("/uploadMultipleFiles", (req, res) => {
  uploadImage
    .uploadMultipleImages(req.body.images)
    .then((urls) => res.send(urls))
    .catch((err) => res.status(500).send(err));
  });

app.listen(port, () => {
    // console.log(`nxgjobhubProject is listening at http://localhost:${port}`);
    console.log(`nxgjobhubProject is listening at https://nxgjobhub.netlify.app:${port}`);
});
