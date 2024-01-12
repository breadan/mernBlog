import express from "express";
import cors from "cors";
import dotenv from "dotenv"; //secure 1
import "./database/dbConnection/connection.js";

const port =  process.env.PORT || 8000
const mode = process.env.NODE_ENV 
//secure 2
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
// app.use(userRouter);
// app.use("/v1/messages", messageRouter);
app.get("/", (req, res) => res.send(" World!"));

// app.all("*", (req, res, next) => {
//   next(new AppError(`This Resource Is Not Available ${req.originalUrl}`, 404));
// });

// app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app running on port ${port} mode: ${mode}! ^_^ `);
});
