require('dotenv').config();

const express = require("express");
const cors = require("cors");
const uploadImage = require("./uploadImage.js");
const app = express();
const port = 5000;

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with the actual hosted link of React app 
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
    console.log(`nxgjobhubProject is listening at http://localhost:${port}`);
});