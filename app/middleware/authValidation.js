const { check } = require('express-validator');

exports.authCredentialsValidation = [
    check('email', 'Enter a valid email address').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({
        min: 6
    })
];
