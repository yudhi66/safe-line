import express from 'express';
import validateForm from '../controllers/validateForm.js';
const router =express.Router();


router.post("/login",(req,res)=>{
   validateForm(req,res);
})
router.post("/signup",(req,res)=>{
    validateForm(req,res);
 })




export default router;