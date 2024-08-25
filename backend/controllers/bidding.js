const Post = require('../model/bidding');
const Farmer=require('../model/farmer');
const Buyer=require('../model/buyer');

// Create a new post for bidding
exports.createPostForBidding = async (req, res) => {
    const { cropType, price, location, landArea, images, description } = req.body;
    //const farmerId = req.userId; 
    const farmerId='66cb1bb47de6e1d78926ad08';

    try {
        const farmer = await Farmer.findById(farmerId);

        const post = new Post({
            cropType,
            price,
            location,
            landArea,
            images,
            description,
            farmer: farmerId,
            biddingDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        await post.save();
        farmer.bidposts.push(post._id);
        await farmer.save();
        res.status(201).json({ message: 'Post created successfully', post });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Buyer submits a bid
exports.submitBid = async (req, res) => {
    const { postId, bidAmount } = req.body;
    //const buyerId = req.userId;
    const buyerId='66cb05dd8eeb4000b8ccf41d';

    try {
        const post = await Post.findById(postId);
        const buyer= await Buyer.findById(buyerId);

        if (!post || post.biddingStatus === 'closed') {
            return res.status(400).json({ message: 'Bidding is closed or post not found' });
        }

        post.bids.push({ buyer: buyerId, bidAmount });
        await post.save();

        buyer.bidposts.push(post._id);
        await buyer.save();

        res.status(201).json({ message: 'Bid submitted successfully', post });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// View bids after bidding is closed
exports.viewBids = async (req, res) => {
    const { postId } = req.params;
    //const farmerId = req.userId;
    const farmerId='66cb1bb47de6e1d78926ad08';

    try {
        const post = await Post.findById(postId).populate('bids.buyer').populate('farmer');

        if (!post || post.farmer.toString() !== farmerId) {
            return res.status(404).json({ message: 'Post not found or access denied' });
        }

        if (post.biddingStatus === 'open' && new Date() > post.biddingDeadline) {
            post.biddingStatus = 'closed';
            await post.save();
        }

        const sortedBids = post.bids.sort((a, b) => b.bidAmount - a.bidAmount);
        res.status(200).json({ message: 'Bids retrieved successfully', bids: sortedBids });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};