const express = require('express');

const auth = require('../app/middleware/auth');
const { getUser, userProfile } = require('../app/controller/user');

const router = express.Router();

router.get('/me/', auth, getUser);
router.get('/me/profile', auth, userProfile);
router.patch('/me/profile', auth, userProfile);

module.exports = router;
