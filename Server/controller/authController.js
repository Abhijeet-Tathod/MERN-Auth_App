import UserAuthInfo from "../models/UserAuthInfo.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const signUp = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existingUser = await UserAuthInfo.findOne({ email });
    if (existingUser)
      return res
        .status(409)
        .json({ success: false, message: "UserAuthInfo already exists" });

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new UserAuthInfo({ email, password: hashedPassword });

    await newUser.save();

    res.status(201).json({ message: "User Added Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await UserAuthInfo.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid credentials" });

    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getDay() + 1);

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
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { signUp, signIn };
