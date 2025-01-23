const mongoose = require('mongoose');
const recordSchema = new mongoose.Schema({

    userId: {
        type: Number, 
        required: true,
    },
    petId: {
        type: Number,  
        required: true,
    },
    recordDate: {
        type: Date,
    },
    recordTime: {
        type: String,
    },
    waterIntake: {
        type: String,
    },
    foodIntake: {
        type: String,
    },
    activityLevel: {
        type: String,
    },
    urination: {
        type: String,
    },
    signOfIllness: {
        type: String,
    },
    bloodGlucose: {
        type: String,
    },
    urineGlucose: {
        type: String,
    },
    urineKetones: {
        type: String,
    },
    weight: {
        type: String,
    },
    bodyCondition:[
        {
            filename: String,
            path: String,
            uploadDate: {
                type: Date,
                default: Date.now
            },
        }
    ],
    vetId: {
        type: Number,
    },

}, { timestamps: true});

const diabetesRecord = mongoose.model('YoshDiabetesRecords',recordSchema);
module.exports = diabetesRecord;