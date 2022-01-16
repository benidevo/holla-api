const Channel = require('../../model/Channel');
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
                channel.admin = channel.members[1];
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
        res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
    }
};
