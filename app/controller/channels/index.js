const { createChannel } = require('./createChannel');
const { updateChannel } = require('./updateChannel');
const { deleteChannel } = require('./deleteChannel');
const { joinChannel, leaveChannel, sendMessage } = require('./actions');
const { retrieveAllChannels, getChannel } = require('./retrieveAllChannels');

module.exports = {
    createChannel,
    updateChannel,
    deleteChannel,
    joinChannel,
    retrieveAllChannels,
    leaveChannel,
    sendMessage,
    getChannel
};
