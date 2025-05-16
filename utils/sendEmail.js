const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,       // make sure your .env uses EMAIL_FROM
    pass: process.env.EMAIL_PASS,   // and EMAIL_PASSWORD
  },
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  // Return the promise so caller can await and catch errors
  return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
