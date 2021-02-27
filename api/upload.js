const path = require("path");
const express = require("express");
const multer = require("multer");
const router = express.Router();

const fileExtensions = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
};

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../static"));
  },
  filename: (req, file, cb) => {
    const fileName =
      file.fieldname + "-" + Date.now() + fileExtensions[file.mimetype];
    req.savedFile = fileName;
    cb(null, fileName);
  },
});

const upload = multer({ storage: diskStorage });

router.post("/", upload.single("file"), (req, res) => {
  res.json({ filePath: "/static/" + req.savedFile });
});

module.exports = router;
