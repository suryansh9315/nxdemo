const mongoose = require('mongoose');

const physioPlanSchema = new mongoose.Schema({

    userId: {
        type: Number, 
        required: true,
    },
    petId: {
        type: Number,  
        required: true,
    },
    typeOfPlan: {
        type: String,
    },
    condition: {
        type: String,
    },
    weeksSinceSurgery: {
        type: String,
    },
    mobilityLevel: {
        type: String,
    },
    painLevel: {
        type: String,
    },

}, { timestamps: true});
const YoshPhysioPlans = mongoose.model('YoshPhysioPlan',physioPlanSchema);
module.exports = YoshPhysioPlans;