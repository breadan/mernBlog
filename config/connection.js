import mongoose from "mongoose";
import express from "express";
import "dotenv/config";

// const app = express();

export default mongoose;
const url = process.env.MONGO_URL;

mongoose
  .connect(url, {})
  .then(() => {
    // console.log("posses", process.env.MONGO_URL);
    console.log("db connection established");
  });

mongoose.connection.on("connected", () => {
  console.log("Mongoose Connected");
});

mongoose.connection.on("error", (err) => {
  console.log(err.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose Disconnected");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

//UnHandleRejection Error
process.on("unhandledRejection", (err) => {
  console.log(`Unhandled Rejection Error: ${err.name} | ${err.message}`);
  server.close(() => {
    console.log(`Shutting down.....`)
    process.exit(1);
  });
});

