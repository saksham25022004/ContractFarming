const Feedback = require('../model/feedback');
const Farmer = require('../model/farmer');

exports.submitFeedback = async (req, res) => {
    const { farmerId, rating, comment } = req.body;
    const buyerId = req.userId;

    try {
        const feedback = new Feedback({
            farmer: farmerId,
            buyer: buyerId,
            rating,
            comment
        });

        await feedback.save();

        const farmer = await Farmer.findById(farmerId);
        const feedbacks = await Feedback.find({ farmer: farmerId });
        const totalRatings = feedbacks.reduce((sum, fb) => sum + fb.rating, 0);
        farmer.rating = totalRatings / feedbacks.length;
        await farmer.save();

        res.status(201).json({ message: 'Feedback submitted successfully', feedback });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getFeedbackForFarmer = async (req, res) => {
    const { farmerId } = req.params;

    try {
        const feedbacks = await Feedback.find({ farmer: farmerId }).populate('buyer', 'name');

        if (!feedbacks || feedbacks.length === 0) {
            return res.status(404).json({ message: 'No feedback found for this farmer' });
        }

        res.status(200).json({ feedbacks });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
