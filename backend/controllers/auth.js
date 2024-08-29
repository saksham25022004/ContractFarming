const jwt = require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const Farmer = require('../model/farmer');
const Buyer=require('../model/buyer');

// Farmer signup
exports.signupFarmer= async (req, res) => {
    const { phoneNumber, password, name, address, district, state } = req.body;

    try {
        const existingFarmer = await Farmer.findOne({ phoneNumber });
        if (existingFarmer) {
            return res.status(400).json({ message: 'Farmer already registered with this phone number' });
        }
        const hashedPw=await bcrypt.hash(password,12);
        const farmer =new Farmer({ phoneNumber, password:hashedPw, name, address, district, state });
        await farmer.save();

        res.status(201).json({ message: 'Farmer registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

//Farmer login
exports.loginFarmer=async (req, res) => {
    const { phoneNumber, password } = req.body;

    try {
        const farmer = await Farmer.findOne({ phoneNumber });
        if (!farmer || !(await bcrypt.compare(password, farmer.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: farmer._id, role: 'farmer' }, 'techburner', { expiresIn: '1d' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Buyer signup
exports.signupBuyer=async (req, res) => {
    const { phoneNumber, password, name, address, district, state } = req.body;

    try {
        const existingBuyer = await Buyer.findOne({ phoneNumber });
        if (existingBuyer) {
            return res.status(400).json({ message: 'Buyer already registered with this phone number' });
        }
        const hashedPw=await bcrypt.hash(password,12);
        const buyer = new Buyer({ phoneNumber, password:hashedPw, name, address, district, state });
        await buyer.save();

        res.status(201).json({ message: 'Buyer registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Buyer login
exports.loginBuyer=async (req, res) => {
    const { phoneNumber, password } = req.body;

    try {
        const buyer = await Buyer.findOne({ phoneNumber });
        if (!buyer || !(await bcrypt.compare(password, buyer.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: buyer._id, role: 'buyer' }, 'techburner', { expiresIn: '1d' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};