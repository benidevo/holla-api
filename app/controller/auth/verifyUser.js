const { validationResult } = require('express-validator');

const User = require('../../model/User');
const { sendMail } = require('../../utils');

exports.verifyUser = async function (req, res) {
    const { otp, id } = req.query;

    // find user with id
    const user = await User.findById(id);

    if (user && user.isActive) {
        return res.status(200).json({ msg: 'User already verified' });
    }

    if (!user || user.otp != otp) {
        return res.status(401).json({ msg: 'Invalid credentials' });
    }

    // activate user
    user.otp = null;
    user.isActive = true;
    user.updatedAt = Date.now();

    // save user
    await user.save();
    // return response
    res.status(200).json({ msg: 'User verification successful' });
};

exports.resendVerificationLink = async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(200).json({
            msg: 'Verification link has been sent to your email address if you have a valid account with us'
        });
    }

    if (user.isActive) {
        return res.status(200).json({
            msg: 'User is already verified'
        });
    }

    const otp = Math.floor(1 * Math.random() * 9000);
    user.otp = otp;
    await user.save();

    // send verification email
    const subject = 'Verify your account';
    const text = `Hello ${
        user.name.split(' ')[0]
    },\n\nPlease verify your account by clicking the link below.\n\nhttp://localhost:8000/api/v1/auth/verify?otp=${otp}&id=${
        user._id
    }`;
    await sendMail(email, subject, text);

    res.status(200).json({
        msg: 'Verification link has been sent to your email address if you have a valid account with us'
    });
};
