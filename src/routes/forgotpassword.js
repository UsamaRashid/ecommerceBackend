const express = require("express");
const router = express.Router();
const {
  sendPasswordResetOTPEmail,
  resetUserPassword,
} = require("../controller/forgotPassword");

// password reset request
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw Error("Email is required!");
    }
    const createdPasswordResetOTPEmail = await sendPasswordResetOTPEmail(email);
    res.status(200).json(createdPasswordResetOTPEmail);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/reset", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!(email && otp && newPassword)) {
      throw Error("Empty Credentails are not allowed ");
    }
    await resetUserPassword({ email, otp, newPassword });
    res.status(200).json({ email, passwordReset: true });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
