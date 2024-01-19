import { verify } from "crypto";
import {loginUser, registerUser} from "../controller/auth.controller.js";
import express from "express";
import { verifyMailer } from "../middlewares/verifyToken.js";
import { validateUser } from "../models/user.model.js";

const authRouter = express.Router();

authRouter.post("/api/auth/register",registerUser);
authRouter.post("/api/auth/login",loginUser);
authRouter.get("/api/user/auth/verifyEmail/:token", verifyMailer);






export default authRouter
