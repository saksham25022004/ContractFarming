const Post = require('../model/postByFarmer');
const Farmer = require('../model/farmer');

exports.createPost = async (req, res) => {
    const { cropType, price, location, landArea, description } = req.body;
    const farmerId = req.userId; 
    const imageUrls = req.files.map(file=>file.path);

    try {
        const farmer = await Farmer.findById(farmerId);
        console.log(farmer);
        if (!farmer) {
            return res.status(404).json({ message: 'Farmer not found' });
        }

        const post = new Post({
            farmer: farmerId,
            farmerName: farmer.name,
            phoneNumber: farmer.phoneNumber,
            cropType,
            price,
            location,
            landArea,
            images:imageUrls,
            description
        });

        await post.save();
        farmer.posts.push(post._id);
        await farmer.save();
        res.status(201).json({ message: 'Post created successfully', post });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

//fetch all posts
exports.getAllPosts = async (req, res) => {

    try {
        const posts = await Post.find().populate('farmer', 'name phoneNumber');

        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: 'No posts found for this farmer' });
        }

        res.status(200).json({ message: 'Posts retrieved successfully', posts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a single post
exports.getSinglePost = async (req, res) => {
    const postId = req.params.postId; 

    try {
        const post = await Post.findById(postId).populate('farmer', 'name phoneNumber');

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json({ message: 'Post retrieved successfully', post });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a post by its ID
exports.deletePost = async (req, res) => {
    const postId = req.params.postId;  
    const farmerId = req.userId; 

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.farmer.toString() !== farmerId) {
            return res.status(403).json({ message: 'Unauthorized action' });
        }

        await Post.findByIdAndDelete(postId);

        await Farmer.findByIdAndUpdate(farmerId, {
            $pull: { posts: postId }
        });

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Search for posts by crop type
exports.searchByCrop = async (req, res) => {
    const { cropType } = req.params;

    try {
        const posts = await Post.find({ cropType: { $regex: cropType, $options: 'i' } });
        if (posts.length === 0) {
            return res.status(404).json({ message: 'No posts found for the given crop type' });
        }

        res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

//get particular farmer crops
exports.yourCrop = async (req, res) => {
    const farmerId = req.userId;

    try {
        const farmer = await Farmer.findById(farmerId).populate('posts'); 

        if (!farmer) {
            return res.status(404).json({ message: 'Farmer not found' });
        }

        const cropPosts = await Post.find({ farmer: farmerId });

        res.status(200).json({ message: 'Farmer crop posts fetched successfully', cropPosts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};