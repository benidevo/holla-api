const { check } = require('express-validator');

exports.createChannelValidation = [
    check('name', 'Name is required').not().isEmpty().isString(),
    check('description', 'Description is required').not().isEmpty().isString()
];

exports.updateChannelValidation = [
    check('name', 'Name is required').optional({ checkFalsy: true }).isString(),
    check('description', 'Description is required')
        .optional({ checkFalsy: true })
        .isString()
];

exports.messageValidation = [
    check('content', 'content is required').not().isEmpty().isString()
];
