const express = require('express');
const {
    authCredentialsValidation,
    registrationValidation,
    changePasswordValidation
} = require('../app/middleware/authValidation');
const {
    registerUser,
    loginUser,
    verifyUser,
    changePassword
} = require('../app/controller/auth');
const router = express.Router();

router.post('/register', registrationValidation, registerUser);
router.get('/verify', verifyUser);
router.post('/login', authCredentialsValidation, loginUser);
router.patch('/change-password', changePasswordValidation, changePassword);

module.exports = router;
