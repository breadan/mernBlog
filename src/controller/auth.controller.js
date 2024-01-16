import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import {
  User,
  validateUser,
  validateLogin,
  generateAuthToken,
} from "../models/user.model.js";
import { sendEmail } from "../emailes/nodemailer.js";
/*
#Desc: Register
#Rout: /api/auth/register
#Method: post
#Access: public
*/

const registerUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  // check validate
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  //check if user is exists already
  if (user) {
    return res.status(400).json({
      Status: false,
      message: "User already exists",
    });
  }else {

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // to verify email
    // sendEmail({ email });
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      age: req.body.age,
    });
    const savedUser = await newUser.save();
  
    res.status(201).json({
      Status: true,
      message: "User created successfully",
      user: savedUser,
    });
  }
  //# => sending email To verify account
  res.status(200).json({ message: "User created successfully Please Log In" });
});

/*
#Desc: LogIn
#Rout: /api/auth/login
#Method: post
#Access: public
*/
const loginUser = asyncHandler(async (req, res) => {
  // check validate
  const { error } = validateLogin(req.body);
  if (error) {
    return res.status(400).json({
      status: false,
      message: error.details[0].message,
    });
  }
  //check if user is exists already
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({
      Status: false,
      message: "User not found Or Password Wrong",
    });
  }
  //check password    //user.password it is in db //req.body.password from clint
  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) {
    return res.status(400).json({
      Status: false,
      message: "User not found Or Password Wrong",
    });
  }
  const token = user.generateAuthToken(); //it create new token
  res.status(200).json({
    _id: user._id,
    isAdmin: user.isAdmin,
    profilePhoto: user.profilePhoto,
    token,
  });
});

export { registerUser, loginUser };
