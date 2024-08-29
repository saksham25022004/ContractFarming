const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
    buyer: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Buyer' 
    },
    bidAmount: {
        type:Number,
        required:true,
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
});

const postSchema = new mongoose.Schema({
    cropType: {
        type:String,
        required:true,
    },
    price: {
        type:Number,
        required:true,
    },
    location: {
        type:String,
        required:true,
    },
    landArea: {
        type:String,
        required:true,
    },
    images: {
        type:[String],
        required:true,
    },
    description: {
        type:String,
    },
    farmer: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Farmer' 
    },
    biddingStatus: { 
        type: String, 
        enum: ['open', 'closed'], 
        default: 'open' },
    biddingDeadline: { 
        type: Date, 
        default: new Date( Date.now()) 
    },
    bids: [bidSchema],
});

const Post = mongoose.model('BidPost', postSchema);

module.exports = Post;
