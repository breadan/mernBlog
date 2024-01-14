import {loginUser, registerUser} from "../controller/auth.controller.js";
import express from "express";

const authRouter = express.Router();

authRouter.post("/api/auth/register", registerUser);
authRouter.post("/api/auth/login", loginUser);





export default authRouter
