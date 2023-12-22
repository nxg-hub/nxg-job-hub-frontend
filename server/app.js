const express = require("express");
const cors = require("cors");
const uploadFile = require("./uploadFile.js");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.post("/uploadFile", (req, res) => {
    uploadFile(req.body.file)
      .then((url) => res.send(url))
      .catch((err) => res.status(500).send(err));
});

app.post("/uploadMultipleFiles", (req, res) => {
    uploadFile
      .uploadMultipleFiles(req.body.files)
      .then((urls) => res.send(urls))
      .catch((err) => res.status(500).send(err));
  });

app.listen(port, () => {
    console.log(`nxgjobhubProject is listening at http://localhost:${port}`);
});