import { Router } from "express";
const router = Router();

import { signIn, signUp } from "../controller/authController.js";
import {
  authVaildator,
} from "../validators/authValidation.js";

import validationErrorHandler from "../middleware/errorHandler.js";

router.post("/signup", authVaildator, validationErrorHandler, signUp);
router.post("/signin", authVaildator, validationErrorHandler, signIn);

export default router;
