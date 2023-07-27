const User = require("../models/user");
const { sendOTP, verifyOTP, deleteOTP } = require("../controller/otp");
const sendVerificationOTPEmail = async ({ email }) => {
  try {
    const existingUser = User.findOne({ email });
    // check if account exists
    if (!existingUser) {
      throw Error("There's no account provided with this email");
    }
    const otpDetails = {
      email,
      subject: "Email Verification",
      message: "Verify your email with code below",
      duration: 1,
    };
    const createdOTP = await sendOTP(otpDetails);

    return;
  } catch (error) {
    throw error;
  }
};
const verifyUserEmail = async ({ email, otp }) => {
  try {
    const validOTP = await verifyOTP({ email, otp });
    if (!validOTP) {
      throw Error("Invalid OTP, Check your inbox");
    }
    const deletedOTP = await deleteOTP({ email });

    return validOTP;
  } catch (error) {
    throw error;
  }
};

module.exports = { sendVerificationOTPEmail, verifyUserEmail };
