const mongoose = require('mongoose');
const Profile = require('../model/Profile');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
    otp: {
        type: Number
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    },
    channels: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Channel'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
});

// create profile after user is created
UserSchema.post('save', async function (doc, next) {
    const profile = await Profile.findOne({ user: doc._id });
    if (!profile) {
        const newProfile = new Profile({
            user: doc._id
        });
        await newProfile.save();

        doc.profile = newProfile._id;
        await doc.save();
        next();
    }
    next();
});

module.exports = mongoose.model('User', UserSchema);
