const express = require('express');
require('dotenv').config();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');

const authRoutes=require('./routes/auth');
const postRoutes=require('./routes/Post');
const bidRoutes=require('./routes/bidding');
const feedbackRoutes=require('./routes/feedback');
const governmentReserveRoutes=require('./routes/governmentReserve');
const upload = require('./middleware/multer');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.none());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/auth',authRoutes);
app.use('/post', postRoutes);
app.use('/bid', bidRoutes);
app.use('/feedback',feedbackRoutes);
app.use('/reserve',governmentReserveRoutes);

const PORT = process.env.PORT || 2000;
mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT);
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err.message);
    });
