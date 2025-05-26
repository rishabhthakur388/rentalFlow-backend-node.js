const { ExpressValidator } = require("express-validator")
const { body, validationResult } = require('express-validator')
const { min } = require("moment")

exports.createAccountValidator = [
    body('Email').notEmpty().isEmail().trim().withMessage('Please Enter the Email or Check it is valid or Not'),
    body('password').notEmpty().isString().trim().isLength({ min: 8 }).withMessage('Please Enter the Valid Password And minimum of 9 characters'),
    body('confirmPassword').notEmpty().isString().trim().isLength({ min: 8 }).withMessage('Please Enter the Valid Password And minimum of 9 characters')
]

exports.logInValidation = [
    body('Email').optional().isEmail().notEmpty().isString().trim().withMessage('Please Enter the Email'),
    body('password').notEmpty().isString().trim().isLength({ min: 8 }).withMessage('Please Enter the Valid Password And minimum of 9 characters'),
]

exports.forgetPasswordOtpValidation = [
    body('Email').isEmail().notEmpty().isString().trim().withMessage('Please Enter the Email'),
]
exports.numberOtpGenerater = [
    body('phoneNumber').isEmail().notEmpty().isString().trim().withMessage('Please Enter the Number'),
]
exports.setNewPasswordValidator = [
    body('newPassword').notEmpty().isString().trim().isLength({ min: 8 }).withMessage('Please Enter the Valid Password And minimum of 9 characters'),
    body('confirmPassword').notEmpty().isString().trim().withMessage('Please Enter the Valid Password And minimum of 9 characters')
]
 exports.otpVarificationValidatios=[
    body('otp').notEmpty().trim().withMessage('Please Enter the otp'),
 ]

exports.setNewEmailValidator = [
    body('otp').notEmpty().trim().withMessage('Please Enter the oyp'),
    body('Email').notEmpty().isString().trim().withMessage('Please Enter the Valid Password And minimum of 9 characters'),
    body('NewEmail').notEmpty().isString().trim().withMessage('Please Enter the Valid Password And minimum of 9 characters')
]

exports.setNewPhoneValidator = [
    body('otp').notEmpty().trim().withMessage('Please Enter the oyp'),
    body('phoneNumber').notEmpty().isString().trim().withMessage('Please Enter the Valid Password And minimum of 9 characters'),
    body('newPhoneNumber').notEmpty().isString().trim().withMessage('Please Enter the Valid Password And minimum of 9 characters')
]

exports.addUserDataValidations = [
    body("phoneNumber").notEmpty().trim().isLength({ min: 10, max: 10 }).withMessage('Please Enter the Vailed Mobile Number of length 10...'),
    body("fullName").notEmpty().trim().isString().withMessage('Please Enter FullName ...'),
    body("zipCode").notEmpty().trim().isString().isLength({ min: 6, max: 6 }).withMessage('Please Enter zipCode and Check length of Zipcode is of 6... ...'),
    body("businessAcount").optional().trim().isBoolean().withMessage('Please Enter businessAcount ...'),
    body("id_type").notEmpty().trim().isNumeric().withMessage('Please Enter id_type ...'),
    body("businessName").optional().trim().isString().withMessage('Please Enter the businessName...'),
    body("businessNumber").optional().trim().isString().withMessage('Please Enter the businessNumber...'),
    body("businessWebsite").optional().trim().isString().withMessage('Please Enter the businessWebsite...'),
    body("businessAddress").optional().trim().isString().withMessage('Please Enter the businessAddress...'),
]

exports.itemDataValidtion = [
    body('otp').notEmpty().trim().withMessage('Please Enter the oyp'),
    body('newPassword').notEmpty().isString().trim().isLength({ min: 8 }).withMessage('Please Enter the Valid Password And minimum of 9 characters'),
    body('confirmPassword').notEmpty().isString().trim().withMessage('Please Enter the Valid Password And minimum of 9 characters')
]