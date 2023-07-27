const express = require("express");
const router = express.Router();
const { sendOTP, verifyOTP } = require("../controller/otp");

// verify opt
router.post("/verify", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const verified = await verifyOTP({ email, otp });
    res.status(200).json({ valid: verified });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// request new verification OTP
router.post("/", async (req, res) => {
  try {
    const { email, subject, message, duration } = req.body;
    const createdOTP = await sendOTP({ email, subject, message, duration });

    res.status(200).json(createdOTP);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
