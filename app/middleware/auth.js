const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = async (req, res, next) => {
    let token = req.headers['authorization'];

    if (!token) {
        return res.status(401).send({
            errors: [
                {
                    msg: 'Access denied. No token provided.'
                }
            ]
        });
    }

    token = token.split(' ')[1];

    try {
        user = await jwt.verify(token, process.env.SECRET_KEY);
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ errors: [{ msg: 'invalid token' }] });
    }
};

module.exports = auth;
