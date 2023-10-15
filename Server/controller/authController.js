import User from "../models/authUser.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/customErrors.js";
import jwt from "jsonwebtoken";

const signUp = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });

    await newUser.save();

    res.status(201).json({ message: "User Added Successfully" });
  } catch (error) {
    next(errorHandler(500, "Internal Server Error"));
  }
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return next(errorHandler(401, "User not found"));

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) return next(errorHandler(401, "Invalid credentials"));

    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: Math.floor(expiryDate / 1000),
    });
    // Create a new object without the password field
    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;
    
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: false,
        expires: expiryDate,
      })
      .status(200)
      .json(userWithoutPassword);
  } catch (error) {
    next(errorHandler(500, "Server error", error.message));
  }
};

export { signUp, signIn };
