const express = require("express");
const router = express.Router();
const sendOTP = require("../controller/otp");

// request new verification OTP
router.post("/", async (req, res) => {
  try {
    const { email, subject, message, duration } = req.body;
    const createdOTP = await sendOTP({ email, subject, message, duration });
    console.log("Created OTP");
    res.status(200).json(createdOTP);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
