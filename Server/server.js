import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const PORT = process.env.PORT || 4000;
import connection from "./config/database.js";

//MogoDB Connection
connection();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log("Listing to", PORT);
});
