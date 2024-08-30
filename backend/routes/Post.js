const express = require('express');
const router = express.Router();
const { createPost, getAllPosts, getSinglePost, deletePost, searchByCrop, yourCrop } = require('../controllers/PostByFarmer');
const { createRequirement, getAllRequirements, getYourRequirements }=require('../controllers/PostByBuyer');
const isauth = require('../middleware/is_auth'); 
const upload= require('../middleware/multer');

router.post('/postByFarmer', upload.array('images'), isauth, createPost);

router.get('/allPosts', getAllPosts);

router.get('/post/:postId', getSinglePost);

router.delete('/posts/:postId', isauth, deletePost);

router.get('/searchByCrop/:cropType', searchByCrop);

router.get('/yourCrop',isauth, yourCrop);

router.post('/postByBuyer', isauth, createRequirement);

router.get('/allRequirements', getAllRequirements);

router.get('/yourRequirement', isauth, getYourRequirements);

module.exports = router;
