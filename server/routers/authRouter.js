import express from 'express';
import validateForm from '../controllers/validateForm.js';
import { handleLogin,attemptLogin,attemptSignup } from '../controllers/authController.js';
const router =express.Router();

import  authController   from "../controllers/authController.js" 
import ratelimiter from '../controllers/limiiter.js';
router
.route("/login")
.get(handleLogin)
.post(validateForm, ratelimiter(60, 10), attemptLogin);
router.post("/signup", validateForm, ratelimiter(30, 4), attemptSignup);


export default router;