import { Router } from "express";
const router = Router();

import { signIn, signUp } from "../controller/authController.js";
import {
  SigInValidator,
  signUpValidator,
} from "../validators/authValidation.js";

import validationErrorHandler from "../middleware/errorHandler.js";

router.post("/signup", signUpValidator, validationErrorHandler, signUp);
router.post("/signin", SigInValidator, validationErrorHandler, signIn);

export default router;
