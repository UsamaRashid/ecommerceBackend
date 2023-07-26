const OTP = require("../models/otp");
const generateOTP = require("../utils/generateOTP");
const sendEmail = require("../utils/sendEmail");
const { AUTH_EMAIL } = process.env;
const { hashData } = require("../utils/hashData");
const sendOTP = async ({ email, subject, message, duration = 1 }) => {
  try {
    if (!(email && subject && message)) {
      throw Error("Provide values for email, subject and message");
    }
    // clear Old OTP if any
    await OTP.deleteOne({ email });

    // generate new pin
    const generatedOTP = await generateOTP();

    console.log("generated OTP", generatedOTP);
    const mailOptions = {
      from: AUTH_EMAIL,
      to: email,
      subject,
      html: `<p>${message}</p><p style="color:tomato;font-size:25px;letter-spacing:2px;"><b>${generatedOTP}</b></p><p>This code <b> expires in ${duration} Hour(s)</b></p>`,
    };
    // send email with OTP
    await sendEmail(mailOptions);
    //save OTP record
    const hashedOTP = await hashData(generatedOTP);
    const newOTP = await new OTP({
      email,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000 * +duration,
    });

    const newOTPRecord = await newOTP.save();
    return newOTPRecord;
  } catch (error) {
    throw error;
  }
};

module.exports = sendOTP;
