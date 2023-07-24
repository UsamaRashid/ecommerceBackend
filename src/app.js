// mongodb connection
require("./config/database");

const express = require("express");
const cors = require("cors");

// create a server
const app = express();
app.use(cors());
app.use(express.json());

module.exports = app;
