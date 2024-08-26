const express = require('express');
const router = express.Router();
const { createPost, getAllPosts, getSinglePost, deletePost, searchByCrop } = require('../controllers/PostByFarmer');
const { createRequirement, getAllRequirements }=require('../controllers/PostByBuyer');
const isauth = require('../middleware/is_auth'); 
const upload= require('../middleware/multer');

router.post('/postByFarmer', upload.array('images'), isauth, createPost);

router.get('/allPosts', getAllPosts);

router.get('/post/:postId', getSinglePost);

router.delete('/posts/:postId', isauth, deletePost);

router.get('/searchByCrop', searchByCrop);

router.post('/postByBuyer', isauth, createRequirement);

router.get('/allRequirements', getAllRequirements);

module.exports = router;
