const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const governmentReservesSchema = new Schema({
    type: {
        type: String, 
        required: true,
        enum: ['subsidized_input', 'emergency_support']
    },
    description: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    },
    eligibilityCriteria: {
        type: String,
        required: true
    },
    resourcesAvailable: {
        type: Number,
        required: true
    },
    distributedResources: {
        type: Number,
        default: 0
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const GovernmentReserve = mongoose.model('GovernmentReserve', governmentReservesSchema);
module.exports = GovernmentReserve;
