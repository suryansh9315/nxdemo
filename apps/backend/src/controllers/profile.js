const Profile = require('../models/Profile');
const jwt = require('jsonwebtoken');

const profileController = {
    // Save profile with new fields
    saveProfile: async (req, res) => {
        const token = req.headers.authorization.split(' ')[1]; // Extract token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        //res.status(201).json({ decoded });
        const cognitoUserId = decoded.username; // Get user ID from token

        const { fullName, age, location, userType, occupation, organizationName, industry, interests } = req.body; // Data from request body

        try {
            const profile = new Profile({
                cognitoUserId,
                fullName,
                age,
                location,
                userType,
                occupation,
                organizationName,
                industry,
                interests
            });

            await profile.save();
            res.status(201).json({ message: 'Profile saved successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error saving profile', error });
        }
    },

    // Fetch profile by cognitoUserId
    getProfile: async (req, res) => {
        const token = req.headers.authorization.split(' ')[1]; // Extract token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        const cognitoUserId = decoded.sub; // Get user ID from token

        try {
            const profile = await Profile.findOne({ cognitoUserId });
            if (!profile) return res.status(404).json({ message: 'Profile not found' });

            res.status(200).json(profile);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching profile', error });
        }
    }
};

module.exports = profileController;