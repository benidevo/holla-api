const express = require('express');
const {
    createChannelValidation,
    updateChannelValidation,
    messageValidation
} = require('../app/middleware/channelValidation');
const {
    createChannel,
    updateChannel,
    deleteChannel,
    joinChannel,
    retrieveAllChannels,
    leaveChannel,
    sendMessage,
    getChannel
} = require('../app/controller/channels');
const auth = require('../app/middleware/auth');

const router = express.Router();

router.post('/', [auth, createChannelValidation], createChannel);
router.get('/', auth, retrieveAllChannels);
router.get('/:channelId', auth, getChannel);
router.patch('/:channelId', [auth, updateChannelValidation], updateChannel);
router.delete('/:channelId', auth, deleteChannel);
router.patch('/:channelId/join', auth, joinChannel);
router.patch('/:channelId/leave', auth, leaveChannel);
router.post('/:channelId/chat', [auth, messageValidation], sendMessage);
module.exports = router;
