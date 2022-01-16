const { createChannel } = require('./createChannel');
const { updateChannel } = require('./updateChannel');
const { deleteChannel } = require('./deleteChannel');
const { joinChannel, leaveChannel } = require('./actions');
const { retrieveAllChannels } = require('./retrieveAllChannels');

module.exports = {
    createChannel,
    updateChannel,
    deleteChannel,
    joinChannel,
    retrieveAllChannels,
    leaveChannel
};
