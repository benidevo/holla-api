const { validationResult } = require('express-validator');
const User = require('../../model/User');
const bcrypt = require('bcrypt');

const { sendMail } = require('../../utils/index');

exports.changePassword = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const { password, newPassword } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(401).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ msg: 'Incorrect password' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
    res.status(200).json({ msg: 'Password changed successfully' });
};

exports.forgotPassword = async (req, res) => {
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
            msg: 'Password reset link has been sent to your email address if you have a valid account with us'
        });
    }

    const otp = Math.floor(1 * Math.random() * 9000);
    user.otp = otp;
    await user.save();

    // send password reset link
    const subject = 'Reset Password';
    const text = `Hello ${user.name},\n\nyou can reset your password by clicking the link below.\n\nhttp://localhost:8000/api/v1/auth/reset-password?otp=${otp}&id=${user._id}`;

    await sendMail(email, subject, text);

    res.status(200).json({
        msg: 'Password reset link has been sent to your email address if you have a valid account with us'
    });
};

exports.resetPassword = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const { password } = req.body;

    const { otp, id } = req.query;
    let user;
    try {
        user = await User.findById(id);
    } catch (error) {
        return res.status(400).json({ msg: 'Invalid credentials' });
    }

    if (!user || user.otp != otp) {
        return res.status(401).json({ msg: 'Invalid credentials' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.otp = null;
    await user.save();

    res.status(200).json({ msg: 'Password reset successful' });
};
