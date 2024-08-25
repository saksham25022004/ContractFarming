const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmer',
        required: true
    },
    farmerName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    cropType: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    landArea: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: false
    },
    description: {
        type: String,
        required: true
    },
    postDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Post = mongoose.model('PostByFarmer', postSchema);

module.exports = Post;
