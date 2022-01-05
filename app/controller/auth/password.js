const { validationResult } = require('express-validator');
const User = require('../../model/User');
const bcrypt = require('bcrypt');

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
