const express = require('express');
const { body } = require('express-validator');
const feedbackController = require('../controllers/feedback');

const router = express.Router();

router.post('/feedback', [
    body('rating').isInt({ min: 1, max: 5 }),
    body('comment').trim().isLength({ min: 5 })
], feedbackController.submitFeedback);

router.get('/feedback/:farmerId', feedbackController.getFeedbackForFarmer);

module.exports = router;
