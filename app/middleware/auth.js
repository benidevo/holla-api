const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = async (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];

    if (!token) {
        return res.status(401).send({
            errors: [
                {
                    msg: 'Access denied. No token provided.'
                }
            ]
        });
    }

    try {
        user = await jwt.verify(token, process.env.SECRET_KEY);
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ errors: [{ msg: 'invalid token' }] });
    }
};

module.exports = auth;
