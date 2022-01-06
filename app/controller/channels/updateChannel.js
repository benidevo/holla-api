const { validationResult } = require('express-validator');

const Channel = require('../../model/Channel');

exports.updateChannel = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    let channel;
    try {
        channel = await Channel.findById(req.params.channelId);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res
                .status(404)
                .json({ errors: [{ msg: 'Channel not found' }] });
        }
        return res.status(500).json({ errors: [{ msg: 'Server error' }] });
    }

    if (!channel) {
        return res.status(400).json({ errors: [{ msg: 'Channel not found' }] });
    }

    if (channel.admin.toString() !== req.user.id) {
        return res.status(401).json({
            errors: [{ msg: 'You are not authorized to modify this channel' }]
        });
    }

    try {
        channel = await Channel.findOneAndUpdate(
            { id: req.params.channelId },
            { $set: { ...req.body, updatedAt: Date.now() } },
            { new: true }
        )
            .select('-__v')
            .select('-user');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }

    return res.status(200).json({ msg: 'channel updated', channel });
};
