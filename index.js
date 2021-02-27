require("dotenv").config();
const express = require("express");
const http = require("http")
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./api");

require("./reponsitories");

const app = express();

app.use(cors());
const httpServer = http.createServer(app);
app.use(bodyParser.json());
app.use(router);


const PORT = 5500;
app.use("/static", express.static(path.join(__dirname, "static")));
app.listen(PORT, () => {
    console.log("App is running at " + PORT);
});