require('dotenv').config();

const AWS = require('aws-sdk');
const crypto = require('crypto');

const cognito = new AWS.CognitoIdentityServiceProvider();

const auth = {

    sendConfirmationCode: async (email, res) => {
        const secretHash = getSecretHash(email); // Calculate the SECRET_HASH
        const params = {
            ClientId: process.env.COGNITO_CLIENT_ID,
            SecretHash: secretHash, // Include the SECRET_HASH
            Username: email
        };

        try {
            // Resend the confirmation code
            await cognito.resendConfirmationCode(params).promise();
            res.status(200).json({ message: 'Confirmation code sent successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error sending confirmation code', error });
        }
    },


};

function getSecretHash(username) {
    const clientId = process.env.COGNITO_CLIENT_ID;
    const clientSecret = process.env.COGNITO_CLIENT_SECRET;

    // Generate the HMAC-SHA256 hash of the username and clientId using the clientSecret
    return crypto
        .createHmac('SHA256', clientSecret)
        .update(username + clientId)
        .digest('base64');
}

module.exports = auth;