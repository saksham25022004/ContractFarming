const BuyerRequirement = require('../model/buyerRequirement');
const Buyer = require('../model/buyer');

exports.createRequirement = async (req, res) => {
    const { cropType, quantity, timeframe, expectedPriceRange, location, description } = req.body;
    const buyerId = '66cb05dd8eeb4000b8ccf41d'; 

    try {
        const buyer = await Buyer.findById(buyerId);
        if (!buyer) {
            return res.status(404).json({ message: 'Buyer not found' });
        }

        const requirement = new BuyerRequirement({
            buyer: buyerId,
            cropType,
            quantity,
            timeframe,
            expectedPriceRange,
            location,
            phoneNumber: buyer.phoneNumber,
            description
        });

        await requirement.save();
        buyer.requirements.push(requirement._id);
        buyer.save();
        res.status(201).json({ message: 'Requirement posted successfully', requirement });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};