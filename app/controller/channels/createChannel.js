const { validationResult } = require('express-validator');
const Channel = require('../../model/Channel');

exports.createChannel = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
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
