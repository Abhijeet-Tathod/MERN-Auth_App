import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 4000;
import connection from "./config/database.js";
import authRoute from "./routes/authRoute.js";
import cors from "cors";

//MogoDB Connection
connection();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  console.log("Listing to", PORT);
});
