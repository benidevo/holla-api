const { validationResult } = require('express-validator');

const Channel = require('../../model/Channel');
const Message = require('../../model/Message');
const User = require('../../model/User');

exports.joinChannel = async (req, res) => {
    try {
        const channel = await Channel.findById(req.params.channelId);
        if (!channel) {
            return res
                .status(404)
                .json({ errors: [{ msg: 'Channel not found' }] });
        }
        const user = await User.findById(req.user.id);

        if (user.channels.includes(channel._id)) {
            return res.status(400).json({
                errors: [{ msg: 'User already joined this channel' }]
            });
        }
        user.channels.push(channel._id);
        await user.save();
        res.json({ msg: 'User joined channel' });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                errors: [{ msg: 'Invalid channel id' }]
            });
        }

        res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
    }
};

exports.leaveChannel = async (req, res) => {
    try {
        const channel = await Channel.findById(req.params.channelId);
        if (!channel) {
            return res
                .status(404)
                .json({ errors: [{ msg: 'Channel not found' }] });
        }
        const user = await User.findById(req.user.id);

        if (!user.channels.includes(channel._id)) {
            return res.status(400).json({
                errors: [{ msg: 'User has not joined this channel' }]
            });
        }

        // set new user admin
        if (channel.admin.equals(user._id)) {
            if (channel.members.length > 1) {
                const oldestMember = channel.members[1];
                channel.admin = oldestMember;

                channel.members.pull(user._id);
                await channel.save();
                user.channels.pull(channel._id);
                await user.save();
                return res.json({ msg: 'User left channel' });
            }

            user.channels.pull(channel._id);
            await user.save();
            channel.delete();
            return res.json({ msg: 'User left channel' });
        }

        channel.members.pull(user._id);
        await channel.save();
        user.channels.pull(channel._id);
        await user.save();
        res.json({ msg: 'User left channel' });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                errors: [{ msg: 'Invalid channel id' }]
            });
        }
        res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
    }
};

exports.sendMessage = async (req, res) => {
    const { content } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const channel = await Channel.findById(req.params.channelId);
        if (!channel) {
            return res
                .status(404)
                .json({ errors: [{ msg: 'Channel not found' }] });
        }
        const user = await User.findById(req.user.id);

        if (!user.channels.includes(channel._id)) {
            return res.status(400).json({
                errors: [{ msg: 'User has not joined this channel' }]
            });
        }
        const message = new Message({
            content,
            author: user._id,
            channel: channel._id
        });
        await message.save();
        channel.messages.push(message._id);
        await channel.save();
        res.json({ msg: 'Message sent' });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                errors: [{ msg: 'Invalid channel id' }]
            });
        }
        res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
    }
};
