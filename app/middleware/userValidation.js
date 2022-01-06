const { check } = require('express-validator');

exports.updateProfileValidation = [
    check('bio', 'Bio can only be a string')
        .optional({ checkFalsy: true })
        .isString(),
    check('phone', 'Phone can only be a string')
        .optional({ checkFalsy: true })
        .isString(),
    check('avatar', 'Avatar is required')
        .optional({ checkFalsy: true })
        .isBase64()
];
