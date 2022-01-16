const express = require('express');
const {
    createChannelValidation,
    updateChannelValidation
} = require('../app/middleware/channelValidation');
const {
    createChannel,
    updateChannel,
    deleteChannel,
    joinChannel,
    retrieveAllChannels,
    leaveChannel
} = require('../app/controller/channels');
const auth = require('../app/middleware/auth');

const router = express.Router();

router.post('/', [auth, createChannelValidation], createChannel);
router.get('/', auth, retrieveAllChannels);
router.patch('/:channelId', [auth, updateChannelValidation], updateChannel);
router.delete('/:channelId', auth, deleteChannel);
router.patch('/:channelId/join', auth, joinChannel);
router.patch('/:channelId/leave', auth, leaveChannel);

module.exports = router;
