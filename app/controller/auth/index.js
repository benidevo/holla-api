const { loginUser } = require('./loginUser');
const { verifyUser } = require('./verifyUser');
const { registerUser } = require('./registerUser');
const { changePassword } = require('./password');

module.exports = {
    loginUser,
    registerUser,
    verifyUser,
    changePassword
};