const express = require("express");
const authRouter = require("./auth");
const uploadRoute = require("./upload");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/upload", uploadRoute);

module.exports = router;
