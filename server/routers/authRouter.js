import express from 'express';
import validateForm from '../controllers/validateForm.js';
import { handleLogin,attemptLogin,attemptSignup } from '../controllers/authController.js';
import keyvalidator from '../controllers/keyValidation.js';
const router =express.Router();

import  authController   from "../controllers/authController.js" 
import ratelimiter from '../controllers/limiiter.js';
router
.route("/login")
.get(handleLogin)
.post(validateForm, ratelimiter(60, 10), attemptLogin);
router.post("/signup", validateForm, ratelimiter(30, 4), attemptSignup);

router.route("/keyvalidation").post(keyvalidator);


export default router;