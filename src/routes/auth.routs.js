import { verify } from "crypto";
import {loginUser, registerUser} from "../controller/auth.controller.js";
import express from "express";
import { verifyMailer } from "../middlewares/verifyToken.js";

const authRouter = express.Router();

authRouter.post("/api/auth/register", registerUser);
authRouter.get("/api/users/verify/:token", verifyMailer);       //to mailer
authRouter.post("/api/auth/login", loginUser);





export default authRouter
