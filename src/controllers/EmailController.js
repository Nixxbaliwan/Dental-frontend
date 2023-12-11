const UserModel = require("../models/UserModel");
const nodemailer = require("nodemailer");

// send verification email
const sendVerificationEmail = async (req, res, next) => {
  let { recipient } = req.body;
  const enableLink = `https://dental-management-api-zlpf.onrender.com/api/email/enable?email=${recipient}`;

  try {
    const transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      service: "Gmail",
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: recipient,
      subject: "Email Verification",
      html: `<div className="email" style="
      border: 1px solid  black; 
      padding: 20px; 
      font-family: sans-serif; 
      line-height: 2;
      font-size: 20px;">
      
      <h2>Hi, </h2> \n
      <p>Click the link below to enable your account:</p>
      <a href="${enableLink}">${enableLink}</a>

      <p>Regards, \n Cota Dental</p>
      </div>`,
    };

    await transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error:", error);
      } else {
        console.log("Email sent: " + info.response);
        res.status(201).json({ status: 201, info });
      }
    });
  } catch (error) {
    res.status(201).json({ status: 401, error });
  }
};

// enableEmailVerification
const enableEmail = async (req, res, next) => {
  const { email } = req.query;

  console.log("email query", email);

  try {
    await UserModel.findOneAndUpdate({ email: email }, { isEnable: true });

    res.status(200).json("User account successfully enabled");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: 500, error: "Failed to enable the user's account" });
  }
};

module.exports = { sendVerificationEmail, enableEmail };
