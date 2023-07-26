const OTP = require("../models/otp");
const generateOTP = require("../utils/generateOTP");
const sendEmail = require("../utils/sendEmail");
const { AUTH_EMAIL } = process.env;
const { hashData, verifyHashData } = require("../utils/hashData");
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

const verifyOTP = async ({ email, otp }) => {
  try {
    if (!email || !otp) {
      // validations
      throw Error("Empty Credentials");
    }
    // ensure otp record exists
    const existingOTP = await OTP.findOne({ email });
    if (!existingOTP) {
      throw Error("OTP doesn't exist");
    }
    const { expiresAt } = existingOTP;
    // checking for expired code
    if (Date.now() > expiresAt) {
      await OTP.deleteOne({ email });
      throw Error("OTP Expired. Request a new one");
    }
    // not expired , verify value
    const hashedOTP = existingOTP.otp;
    const validOTP = await verifyHashData(otp, hashedOTP);
    return validOTP;
  } catch (error) {
    throw error;
  }
};

const deleteOTP = async ({ email }) => {
  try {
    await OTP.deleteOne({ email });
  } catch (error) {
    throw error;
  }
};
module.exports = { sendOTP, verifyOTP, deleteOTP };
