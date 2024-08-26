const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    farmer: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Farmer', required: true 
    },
    buyer: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Buyer', required: true 
    },
    rating: { 
        type: Number, 
        min: 1, 
        max: 5, 
        required: true 
    },
    comment: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
