const express = require('express');
const router = express.Router();
const { createPostForBidding, submitBid, viewBids, AllBids, yourBids } = require('../controllers/bidding');
const isauth = require('../middleware/is_auth'); 
const upload= require('../middleware/multer');

router.post('/createBid', upload.array('images'), isauth, createPostForBidding);

router.get('/allBids', AllBids);

router.post('/submitBid', isauth, submitBid);

router.get('/viewBid/:postId', isauth, viewBids);

router.get('/yourBids', isauth, yourBids);

module.exports = router;