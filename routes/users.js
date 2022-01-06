const express = require('express');
const multer = require('multer');
const auth = require('../app/middleware/auth');
const {
    getUser,
    retrieveUserProfile,
    updateUserProfile
} = require('../app/controller/user');
const { updateProfileValidation } = require('../app/middleware/userValidation');

const router = express.Router();
const upload = multer({ dest: 'tmp/' });

router.get('/me/', auth, getUser);
router.get('/me/profile', auth, retrieveUserProfile);
router.patch(
    '/me/profile',
    [auth, updateProfileValidation, upload.single('avatar')],
    updateUserProfile
);

module.exports = router;
