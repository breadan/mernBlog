import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

const verifyToken = (req, res, next) => {
  const authToken = req.headers.authorization;
  if (authToken) {
    const token = authToken.split(" ")[1];
    try {
      //decodedPayload has  data from schema of user
      const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decodedPayload; //here we create object it's name user

      // console.log(decodedPayload);
      next();
    } catch (e) {
      return res.status(401).json({
        Status: false,
        message: "Invalid Token",
      });
    }
  } else {
    return res.status(401).json({
      Status: false,
      message: "No Token Provided",
    });
  }
};

const verifyMailer = (req, res, next) => {
  verifyToken(req, res, () => {
    User.findOneAndUpdate({ email: decodedPayload.email }, { verified: true });
    res.status(200).json({
      status: httpStatusText.SUCCESS,
      message: "Email Verified! Controller",
    });
  });
};

//verify tokenis admin access
const verifyAdminAccess = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({
        Status: false,
        message: "Not Allowed, Only Admin",
      });
    }
  });
};

const verifyUserAccess = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      return res.status(403).json({
        Status: false,
        message: "Not Allowed, Only User can access His Profile",
      });
    }
  });
};
const verifyUserAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({
        Status: false,
        message: "Not Allowed, Only User can access His Profile or Admin",
      });
    }
  });
};

export {
  verifyToken,
  verifyAdminAccess,
  verifyUserAccess,
  verifyUserAndAdmin,
  verifyMailer,
};
