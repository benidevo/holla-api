const { unlink } = require('fs/promises');
const { validationResult } = require('express-validator');
const cloudinary = require('cloudinary').v2;

const Profile = require('../../model/Profile');

exports.retrieveUserProfile = async (req, res) => {
    const profile = await Profile.findOne({ user: req.user.id }).select(
        '-user'
    );
    res.status(200).json(profile);
};

exports.updateUserProfile = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    if (req.file) {
        // check that provided file is an image
        if (!req.file.originalname.endsWith('jpg')) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'Please upload a valid jpg file' }] });
        }

        // upload image to cloudinary
        try {
            const avatar = await cloudinary.uploader.upload(req.file.path, {
                resource_type: 'image',
                public_id: `holla/users/${req.user.id}}/my_profile_pic`,
                overwrite: true
            });
            req.body.avatar = avatar.secure_url;
            // delete old avatar
            await unlink(`${req.file.path}`);
        } catch (error) {
            return res
                .status(500)
                .json({ errors: [{ msg: 'Error uploading image' }] });
        }
    }

    let profile;
    try {
        profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: { ...req.body, updatedAt: Date.now() } },
            { new: true }
        )
            .select('-__v')
            .select('-user');
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }

    return res.status(200).json(profile);
};
