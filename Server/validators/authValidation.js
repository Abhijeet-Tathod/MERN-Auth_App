import { body, param, query } from "express-validator";
import User from "../models/authUser.js";
import mongoose from "mongoose";

const signUpValidator = [
  body("email")
    .notEmpty()
    .trim()
    .escape()
    .isEmail()
    .withMessage("Invalid email")
    .bail()
    .custom(async (value, { req }) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("User already exists");
      }
    }),
  body("password")
    .notEmpty()
    .trim()
    .escape()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .isLength({ max: 255 })
    .withMessage("Password is too long"),
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
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .isLength({ max: 255 })
    .withMessage("Password is too long"),
];

export { signUpValidator, SigInValidator };
