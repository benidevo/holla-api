const User = require('../../model/User');
const { retrieveUserProfile, updateUserProfile } = require('./userProfile');

const getUser = async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
};

module.exports = {
    getUser,
    updateUserProfile,
    retrieveUserProfile
};
