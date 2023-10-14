import { body, param, query } from "express-validator";
import User from "../models/User.js";
import mongoose from "mongoose";

const signUpValidator = [
  body("email")
    .notEmpty()
    .trim()
    .escape()
    .isEmail()
    .withMessage("Invalid email")
    .bail()
    // .custom(async () => {
    //   const user = await User.findOne({ email });
    //   if (user) {
    //     throw new Error("Email Already used");
    //   }
    // })
    ,
  body("password")
    .notEmpty()
    .trim()
    .escape()
    .withMessage("Password is required"),
];

const SigInValidator = [
  body("email")
    .notEmpty()
    .trim()
    .escape()
    .isEmail()
    .withMessage("Invalid email"),
  body("password")
    .notEmpty()
    .trim()
    .escape()
    .withMessage("Password is required"),
];

export { signUpValidator, SigInValidator };
