// mongodb connection
require("./config/database");

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const userRoutes = require("./routes/user");
const otpRoutes = require("./routes/otp");
const emailVerificationRoutes = require("./routes/emailVerification");

// create a server
const app = express();
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.use("/user", userRoutes);
app.use("/otp", otpRoutes);
app.use("/email_verification", emailVerificationRoutes);

module.exports = app;
