const mongoose = require('mongoose');
const User = require('./User');
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

// add admin as a member of the channel after creating it
ChannelSchema.post('save', async function (doc, next) {
    // check if admin is already a member of the channel
    if (!doc.admin.equals(doc.members[0])) {
        this.members.push(this.admin._id);
        await this.save();

        const user = await User.findById(this.admin._id);
        user.channels.push(this._id);
        await user.save();
    }
    next();
});

module.exports = mongoose.model('Channel', ChannelSchema);
