import express from "express";
import cors from "cors";
import dotenv from "dotenv"; //secure 1
import "./config/connection.js";
import authRouter from "./src/routes/auth.routs.js";
import userRouter from "./src/routes/user.rout.js";
import { ApiError } from "./src/utils/apiError.js"
import { globalError } from "./src/middlewares/err.middlware.js";


const port =  process.env.PORT || 7000
const mode = process.env.NODE_ENV 
//secure 2
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(userRouter);
// app.use("/v1/messages", messageRouter);
app.get("/", (req, res) => res.send(" World!"));

app.all("*", (req, res, next) => {
  // const err = new Error(`Cant find this rout: ${req.originalUrl}`);
  // next(err.message);
  next(new ApiError(`Cant find this rout: ${req.originalUrl}`, 400));
});

//Global error handler
app.use(globalError);


app.listen(port, () => {
  console.log(`Example app running on port ${port} mode: ${mode}! ^_^ `);
});
