import express from "express";
import { deleteUserProfile, getAllUsers, getUserProfile, getUsersCount, profilePhoto, updateUserProfile } from "../controller/user.controller.js";
import { verifyAdminAccess, verifyToken, verifyUserAccess, verifyUserAndAdmin } from "../middlewares/verifyToken.js";
import { validateId } from "../middlewares/validateId.js";
import { photoUpload } from "../middlewares/photoUpload.js";

const userRouter = express.Router();


userRouter.get("/api/users/profile",[verifyAdminAccess], getAllUsers);
userRouter.get("/api/users/count",[verifyAdminAccess], getUsersCount);
userRouter.get("/api/users/profile/:id", [validateId], getUserProfile);
userRouter.put("/api/users/profile/:id", [validateId, verifyUserAccess], updateUserProfile);
userRouter.post("/api/users/profile/profile-Photo/:id", [ verifyToken, photoUpload.single("image")], profilePhoto);
userRouter.delete("/api/users/profile/:id", [validateId, verifyUserAndAdmin], deleteUserProfile);






export default userRouter
