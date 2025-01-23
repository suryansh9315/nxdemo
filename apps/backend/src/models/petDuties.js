const mongoose = require('mongoose');
const sharedSchema = new mongoose.Schema({

    petId: {
        type: Number,  
        required: true,
    },
    userId: {
        type: Number, 
        required: true,
    },
    ownerId: {
        type: Number, 
        required: true,
    },
    taskName: {
        type: String,
    },
    taskDate: {
        type: Date,
    },
    taskTime: {
        type: String,
    },
    repeatTask: {
        type: String,
    },
    taskReminder: {
        type: String,
    },
}, { timestamps: true});

const sharedRecord = mongoose.model('YoshSharedPetDuties',sharedSchema);
module.exports = sharedRecord;