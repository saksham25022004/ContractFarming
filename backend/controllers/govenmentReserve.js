const GovernmentReserve = require('../model/governmentReserve');

// Create a new government reserve
exports.createReserve = async (req, res) => {
    const { type, description, eligibilityCriteria, resourcesAvailable, startDate, endDate } = req.body;

    try {
        const reserve = new GovernmentReserve({
            type,
            description,
            eligibilityCriteria,
            resourcesAvailable,
            startDate,
            endDate
        });

        await reserve.save();
        res.status(201).json({ message: 'Government reserve created successfully', reserve });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all government reserves
exports.allReserve = async (req, res) => {
    try {
        const reserves = await GovernmentReserve.find();
        res.status(200).json({ reserves });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Apply for a reserve by a farmer
exports.applyForReserve = async (req, res) => {
    const { reserveId } = req.params;
    const farmerId = req.userId;

    try {
        const reserve = await GovernmentReserve.findById(reserveId);
        if (!reserve) {
            return res.status(404).json({ message: 'Reserve not found' });
        }

        if (!reserve.availability) {
            return res.status(400).json({ message: 'Reserve not available' });
        }

        reserve.distributedResources += 1;
        if (reserve.distributedResources >= reserve.resourcesAvailable) {
            reserve.availability = false;
        }

        await reserve.save();
        res.status(200).json({ message: 'Successfully applied for reserve', reserve });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
