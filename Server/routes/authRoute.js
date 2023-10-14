import { Router } from "express";
const router = Router();

import { signIn, signUp } from "../controller/authController.js";
import {
  SigInValidator,
  signUpValidator,
} from "../validators/authValidation.js";

router.post("/signup", signUpValidator, signUp);
router.post("/signin", SigInValidator, signIn);

export default router;
