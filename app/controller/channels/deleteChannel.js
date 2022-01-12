const Channel = require('../../model/Channel');

exports.deleteChannel = async (req, res) => {
    const { channelId } = req.params;

    let channel;
    try {
        channel = await Channel.deleteOne({
            _id: channelId,
            admin: req.user.id
        });
    } catch (err) {
        console.error(err);
        if (err.kind === 'ObjectId') {
            return res
                .status(404)
                .json({ errors: [{ msg: 'Channel not found' }] });
        }
        return res.status(500).json({ errors: [{ msg: 'Server error' }] });
    }

    return res.status(200).json({ msg: 'Channel deleted' });
};
