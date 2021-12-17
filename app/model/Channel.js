const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChannelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Message'
        }
    ],
    updatedAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Channel', ChannelSchema);
