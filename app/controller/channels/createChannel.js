const { validationResult } = require('express-validator');
const Channel = require('../../model/Channel');
const User = require('../../model/User');

exports.createChannel = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(404).json({
            errors: [{ msg: 'User not found' }]
        });
    }

    const { name, description } = req.body;
    const channel = new Channel({
        name,
        description,
        admin: req.user.id
    });

    try {
        await channel.save();
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({
                errors: [
                    {
                        msg: 'Channel already exists'
                    }
                ]
            });
        }
        res.status(500).send('Server Error');
    }

    res.status(201).json({ msg: 'channel created', channel });
};
