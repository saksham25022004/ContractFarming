const express = require('express');
const router = express.Router();
const { createPost } = require('../controllers/PostByFarmer');
const { createRequirement }=require('../controllers/PostByBuyer');
const isauth = require('../middleware/is_auth'); 

router.post('/postByFarmer', isauth, createPost);

router.post('/postByBuyer', isauth, createRequirement);

module.exports = router;
