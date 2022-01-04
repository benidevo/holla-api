const { check } = require('express-validator');

exports.authCredentialsValidation = [
    check('email', 'Enter a valid email address').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({
        min: 6
    })
];

exports.registrationValidation = [
    check('name', 'Name must be at least 3 characters')
        .isString()
        .isLength({ min: 5 }),
    check('email', 'Enter a valid email address').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({
        min: 6
    })
];
