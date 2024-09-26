import express from 'express';
import validateForm from '../controllers/validateForm.js';
import { handleLogin,attemptLogin,attemptSignup } from '../controllers/authController.js';
const router =express.Router();

import  authController   from "../controllers/authController.js" 
router.route("/login").get(handleLogin).post(validateForm,  attemptLogin);
  
router.post("/signup",validateForm,  attemptSignup);




export default router;