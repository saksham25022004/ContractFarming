const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const farmerSchema = new Schema({
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
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PostByFarmer'
    }],
    bidposts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bidding'
    }],
    rating:{
        type:Number,
        default:0
    },
}, { timestamps: true });

const Farmer = mongoose.model('Farmer', farmerSchema);
module.exports = Farmer;
