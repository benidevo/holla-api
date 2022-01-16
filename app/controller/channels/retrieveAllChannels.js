const Channel = require('../../model/Channel');

exports.retrieveAllChannels = async (req, res) => {
    try {
        const channels = await Channel.find().populate('messages');
        res.json(channels);
    } catch (err) {
        res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
    }
};

exports.getChannel = async (req, res) => {
    try {
        const channel = await Channel.findById(req.params.channelId).populate(
            'messages'
        );
        res.json(channel);
    } catch (err) {
        res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
    }
};
