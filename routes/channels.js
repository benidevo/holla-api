const express = require('express');
const {
    createChannelValidation,
    updateChannelValidation
} = require('../app/middleware/channelValidation');
const {
    createChannel,
    updateChannel,
    deleteChannel
} = require('../app/controller/channels');
const auth = require('../app/middleware/auth');

const router = express.Router();

router.post('/', [auth, createChannelValidation], createChannel);
router.patch('/:channelId', [auth, updateChannelValidation], updateChannel);
router.delete('/:channelId', auth, deleteChannel);

module.exports = router;
