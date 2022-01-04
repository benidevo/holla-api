const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../../model/User');
const { sendMail } = require('../../utils/index');

exports.registerUser = async function (req, res) {
    //  check if there are any errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const { email, password, name } = req.body;
    //  hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const otp = Math.floor(1 * Math.random() * 9000);

    const user = new User({
        email,
        name,
        password: hashedPassword,
        otp
    });

    // save the user
    try {
        await user.save();
    } catch (err) {
        if (err.code == 11000) {
            return res.status(400).json({
                errors: [{ msg: 'User already exists' }]
            });
        }
        return res.status(500).json({ msg: 'Internal server error' });
    }

    // send verification email
    const subject = 'Verify your account';
    const text = `Hello ${
        user.name.split(' ')[0]
    },\n\nPlease verify your account by clicking the link below.\n\nhttp://localhost:8000/api/v1/auth/verify?otp=${otp}&id=${
        user._id
    }`;
    await sendMail(email, subject, text);

    res.status(201).json({ msg: 'Registration Successful' });
};
