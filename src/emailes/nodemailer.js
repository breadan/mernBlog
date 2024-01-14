// all this from nodemailor
import nodemailer from "nodemailer";
import {htmlCode} from "../utils/html.js";
import jwt from "jsonwebtoken";

export const sendEmail = async (options) => {
  try{

    const transporter = nodemailer.createTransport({
      service: "gmail",
  
      auth: {
        user: process.env.APP_EMAIL_ADDRESS,
        pass: process.env.APP_EMAIL_PASSWORD,
      },
    });
  
    const token = jwt.sign({ email: options.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const mailOptions = {
      from: process.env.APP_EMAIL_ADDRESS,
      to: options.email,
      subject: "Welcom Our Site",
      html: htmlCode(token),
    }
  
    // send mail with defined transport object
    const info = await transporter.sendMail(mailOptions);
  
    console.log("Message sent: %s", info.messageId);
  }catch(err) {
    console.log(err);
  }
};
