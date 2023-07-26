const nodemailer = require("nodemailer");
const { AUTH_EMAIL, AUTH_PASSWORD } = process.env;

// let transporter = nodemailer.createTransport({
//   //   host: "smtp-mail.outlook.com",
//   service: "gmail",
//   auth: {
//     user: AUTH_EMAIL,
//     pass: AUTH_PASSWORD,
//   },
// });
// let testAcount = nodemailer.createTestAccount();

// const transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.net",
//   port: 465,
//   //   secure: true,
//   auth: {
//     // user: AUTH_EMAIL,
//     // pass: AUTH_PASSWORD,
//     //   // TODO: replace `user` and `pass` values from <https://forwardemail.net>
//     user: testAcount.user,
//     pass: testAcount.pass,
//   },
// });

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: AUTH_EMAIL,
    pass: AUTH_PASSWORD,
  },
});

// const transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   auth: {
//     user: "hardy.stark@ethereal.email",
//     pass: "QEuVub2U1ujrmdJRg4",
//   },
// });

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
    console.log(success);
  }
});

const sendEmail = async (mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
