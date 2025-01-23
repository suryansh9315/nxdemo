const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({

    userId: {
        type: Number, 
        required: true,
    },
    documentType: {
        type: String,
    },
    title: {
        type: String,
    },
    issueDate: {
        type: String,
    },
    expiryDate: {
        type: String,
    },
    medicalDocs: [
        {
            filename: String,
            path: String,
            uploadDate: {
                type: Date,
                default: Date.now
            },
        }
    ],

}, { timestamps: true});

const medicalRecord = mongoose.model('YoshMedicalRecords',medicalRecordSchema);
module.exports = medicalRecord;