const Post = require('../model/postByFarmer');
const Farmer = require('../model/farmer');

exports.createPost = async (req, res) => {
    const { cropType, price, location, landArea, images, description } = req.body;
    //const farmerId = req.userId; 
    const farmerId='66cb1bb47de6e1d78926ad08';

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
            images,
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
