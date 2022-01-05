const Profile = require('../../model/Profile');

exports.userProfile = async (req, res) => {
    const profile = await Profile.findOne({ user: req.user.id }).select(
        '-user'
    );
    res.status(200).json(profile);
};
