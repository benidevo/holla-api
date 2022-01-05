const express = require('express');

const auth = require('../app/middleware/auth');
const { getUser } = require('../app/controller/user');

const router = express.Router();

router.get('/me', auth, getUser);

module.exports = router;
