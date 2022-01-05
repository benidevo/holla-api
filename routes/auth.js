const express = require('express');
const {
    authCredentialsValidation,
    registrationValidation,
    changePasswordValidation,
    passwordValidation,
    emailValidation
} = require('../app/middleware/authValidation');
const {
    registerUser,
    loginUser,
    verifyUser,
    changePassword,
    forgotPassword,
    resetPassword,
    resendVerificationLink
} = require('../app/controller/auth');
const auth = require('../app/middleware/auth');

const router = express.Router();

router.post('/register', registrationValidation, registerUser);
router.get('/verify', verifyUser);
router.post('/verify/resend', emailValidation, resendVerificationLink);
router.post('/login', authCredentialsValidation, loginUser);
router.patch(
    '/change-password',
    [auth, changePasswordValidation],
    changePassword
);
router.post('/forgot-password', emailValidation, forgotPassword);
router.patch('/reset-password', passwordValidation, resetPassword);

module.exports = router;
