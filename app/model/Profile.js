const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    avatar: {
        type: String
    },
    phone: {
        type: String
    },
    updatedAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Profile', ProfileSchema);
