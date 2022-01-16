const Channel = require('../../model/Channel');

exports.retrieveAllChannels = async (req, res) => {
    try {
        const channels = await Channel.find();
        res.json(channels);
    } catch (err) {
        res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
    }
};
