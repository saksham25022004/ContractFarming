const express=require('express');
const {body}=require('express-validator');
const authController=require('../controllers/auth');

const router=express.Router();

router.put('/signup-Farmer',[
    body('phoneNumber')
        .trim()
        .isLength({min:10, max:10})
        .isNumeric(),
    body('password')
        .trim()
        .isLength({min:5}),
    body('name')
        .trim()
        .not()
        .isEmpty()
],authController.signupFarmer);

router.put('/signup-Buyer',[
    body('phoneNumber')
        .trim()
        .isLength({min:10, MaxKey:10}),
    body('password')
        .trim()
        .isLength({min:5}),
    body('name')
        .trim()
        .not()
        .isEmpty()
],authController.signupBuyer);

router.post('/login-Farmer',authController.loginFarmer);

router.post('/login-Buyer',authController.loginBuyer);

module.exports=router;
