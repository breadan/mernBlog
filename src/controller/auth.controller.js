import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  User,
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
<<<<<<< HEAD
const {name, email, password, age} = req.body
  const existsUser = await User.findOne({ email});
  if (existsUser) {
    return res.status(400).json({
      Status: false,
      message: "User already exists",
    });
  }else {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
   
    const newUser = await User.create({name, email,password:hashedPassword, age});//if use insertMeny put newUser[0].id
    console.log(newUser._id)
    const tokenVerifying = jwt.sign({id: newUser._id}, process.env.VERIFY_SECRET)
    console.log(tokenVerifying)
    sendEmail({email, api: `http://localhost:7000/api/user/auth/verifyEmail/${tokenVerifying}`})
    res.status(201).json({
      Status: true,
      message: "User created successfully",
      newUser,
    });
  
=======
  const user = await User.findOne({ email: req.body.email });

  // NOTE: this should be a middleware
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
    return res.status(409).json({
      Status: false,
      message: "User already exists",
    });
>>>>>>> 892b231fdc3da3c6d35c3c9202e0eeef60066114
  }

  //Note: it is repetitive to make an else statement here as we are returning in the if statement

  //Note: move the password hashing to a presave hook in the user model
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

  //# => sending email To verify account
<<<<<<< HEAD
  // res.status(200).json({ message: "User created successfully Please Log In" });
=======
>>>>>>> 892b231fdc3da3c6d35c3c9202e0eeef60066114
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
      message: "User not found Please Sign Up",
    });
  }
  //check password    //user.password it is in db //req.body.password from clint
  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch || !user.verified) {
    return res.status(400).json({
      Status: false,
      message: " Password Wrong OR Your Account Not Valid",
    });
  }else {

    const token = user.generateAuthToken(); //it create new token
    res.status(200).json({
      _id: user._id,
      isAdmin: user.isAdmin,
      profilePhoto: user.profilePhoto,
      token,
    });
  }
<<<<<<< HEAD
=======

  const token = user.generateAuthToken(); //it create new token
  res.status(200).json({
    _id: user._id,
    isAdmin: user.isAdmin,
    profilePhoto: user.profilePhoto,
    token,
  });
>>>>>>> 892b231fdc3da3c6d35c3c9202e0eeef60066114
});

export { registerUser, loginUser };
