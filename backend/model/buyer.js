const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    address:{
        type: String,
        required:true
    },
    district:{
        type: String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    requirements:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'buyerRequirement'
    }],
    bidposts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bidding'
    }],
}, { timestamps: true });

const Buyer = mongoose.model('Buyer', buyerSchema);
module.exports = Buyer;
