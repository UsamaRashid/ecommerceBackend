const { sendOTP, verifyOTP, deleteOTP } = require("./otp");
const User = require("../models/user");
const { hashData } = require("../utils/hashData");
const sendPasswordResetOTPEmail = async (email) => {
  try {
    // if account exists
    const existingUser = User.findOne({ email });
    if (!existingUser) {
      throw Error("There's no account provided with this email");
    }

    if (existingUser.verified) {
      throw Error("Email has not been verified yet, Check your email");
    }

    const otpDetails = {
      email: email,
      subject: "Password Reset",
      message: "Reset your password with code below",
      duration: 1,
    };
    const createdOTP = await sendOTP(otpDetails);
    return createdOTP;
  } catch (error) {
    throw error;
  }
};

const resetUserPassword = async ({ email, otp, newPassword }) => {
  try {
    const validOTP = await verifyOTP({ email, otp });
    if (!validOTP) {
      throw Error("Invalid OTP, Check your inbox");
    }
    // now update user record with new password
    if (newPassword.length < 8) {
      throw Error("Password must be at least 8 characters");
    }
    const hashedPassword = await hashData(newPassword);
    await User.updateOne({ email }, { password: hashedPassword });
    await deleteOTP(email);
    return;
  } catch (error) {
    throw error;
  }
};

module.exports = { sendPasswordResetOTPEmail, resetUserPassword };
