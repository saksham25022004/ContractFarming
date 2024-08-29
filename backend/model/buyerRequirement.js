const mongoose = require('mongoose');

const buyerRequirementSchema = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Buyer',
        required: true
    },
    cropType: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    timeframe: {
        type: String,
        required: true
    },
    expectedPriceRange: {
        type: Number,
        required: true 
    },
    location: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    description: {
        type: String,
    }
}, { timestamps: true });

const BuyerRequirement = mongoose.model('BuyerRequirement', buyerRequirementSchema);
module.exports = BuyerRequirement;
