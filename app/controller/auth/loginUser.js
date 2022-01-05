const { validationResult } = require('express-validator');
const User = require('../../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.loginUser = async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const { email, password } = req.body;
    // find user with email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ msg: 'Invalid credentials' });
    }
    if (!user.isActive) {
        return res
            .status(400)
            .json({ msg: 'Inactive user. Kindly verify your account' });
    }

    // check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ msg: 'Invalid credentials' });
    }
    // return jsonwebtoken
    const payload = {
        id: user.id
    };

    let token;
    try {
        token = await jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 360000
        });
    } catch (error) {
        return res.status(500).json({ msg: 'Internal server error' });
    }

    res.status(200).json({ msg: 'User login successful', accessToken: token });
};
