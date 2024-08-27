const express=require('express');
const governmentReserveController=require('../controllers/govenmentReserve');
const router=express.Router();

router.post('/createReserve', governmentReserveController.createReserve);
router.get('/allReserve', governmentReserveController.allReserve);
router.post('/applyForReserve/:reserveId', governmentReserveController.applyForReserve);

module.exports=router;
