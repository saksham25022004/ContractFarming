const express = require('express');
const router = express.Router();
const { createPostForBidding, submitBid, viewBids } = require('../controllers/bidding');
const isauth = require('../middleware/is_auth'); 

router.post('/createBid', isauth, createPostForBidding);

router.post('/submitBid', isauth, submitBid);

router.post('/viewBid', isauth, viewBids);

module.exports = router;