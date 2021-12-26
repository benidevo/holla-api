const express = require('express');
const { authCredentialsValidation } = require('../app/middleware/authValidation');
const { registerUser } = require('../app/controller/auth/registerUser');
const {verifyUser} = require('../app/controller/auth/verifyUser');
const router = express.Router();


router.post('/register', authCredentialsValidation, registerUser);
router.get('/verify', verifyUser)

module.exports = router;