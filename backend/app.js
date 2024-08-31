const express = require('express');
require('dotenv').config();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');

const PDFDocument = require('pdfkit');
const { PassThrough } = require('stream');

const authRoutes=require('./routes/auth');
const postRoutes=require('./routes/Post');
const bidRoutes=require('./routes/bidding');
const feedbackRoutes=require('./routes/feedback');
const governmentReserveRoutes=require('./routes/governmentReserve');
// const profileRoutes=require('./routes/Profile');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


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
// app.use('./Profile', profileRoutes);



const PORT = process.env.PORT || 8080;
mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT);
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err.message);
    });

    app.post('/generate-pdf', (req, res) => {
        const content = req.body;
        const doc = new PDFDocument();
        const stream = new PassThrough();
        doc.pipe(stream);
    
        let contract = `
            CONTRACT FOR SALE OF CROPS
    
            This Contract for Sale of Crops ("Contract") is entered into on this ${content.date}, by and between:
    
            FARMER:
            - Name: ${content.farmerName}
            - Address: ${content.farmerAddress}
            - Contact Information: ${content.farmerContact}
    
            BUYER:
            - Name: ${content.buyerName}
            - Address: ${content.buyerAddress}
            - Contact Information: ${content.buyerContact}
    
            1. SALE OF CROPS
            The Farmer agrees to sell, and the Buyer agrees to purchase, the following crops ("Crops"):
    
            - Type of Crop: ${content.cropType}
            - Quantity: ${content.quantity}
            - Quality Specifications: ${content.quality}
    
            2. PURCHASE PRICE
            The Buyer agrees to pay the Farmer the total sum of ${content.price} for the Crops as described above.
    
            3. PAYMENT TERMS
            - Amount: ${content.price}
            - Due Date: ${content.paymentDueDate}
            - Method of Payment: Cash
    
            4. DELIVERY TERMS
            - Delivery Date: ${content.deliveryDate}
            - Delivery Location: ${content.buyerAddress}
    
            5. QUALITY ASSURANCE
            The Farmer guarantees that the Crops delivered will meet the quality specifications as outlined in Section 1.
            If the Crops do not meet the agreed-upon quality specifications, the Buyer has the right to:
            - Demand Compensation: The Farmer shall compensate the Buyer for any losses incurred due to the substandard quality of the Crops.
            - Legal Action: The Buyer may pursue legal action against the Farmer for breach of contract.
    
            6. INSPECTION
            The Buyer reserves the right to inspect the Crops upon delivery to ensure they meet the agreed-upon quality specifications.
    
            7. BREACH OF CONTRACT
            In the event of any breach of this Contract by the Farmer, the Buyer may pursue legal remedies, including but not limited to, seeking damages for any losses incurred.
    
            8. THIRD-PARTY INSPECTION
            - Pre-Delivery Inspection: The Buyer may appoint a third-party inspector to verify the quality and quantity of the Crops before delivery. The cost of this inspection shall be borne by {{inspectionCostResponsibility}}.
            - Post-Delivery Inspection: Upon delivery, a third-party inspection can be carried out to confirm that the Crops meet the agreed-upon specifications. If the Crops do not pass the inspection, the Buyer has the right to reject the delivery or demand compensation.
    
            9. DOCUMENTATION
            - Certification of Quality: The Farmer shall provide a certificate of quality from a recognized agricultural body or laboratory confirming that the Crops meet the agreed-upon quality standards.
            - Weight and Quantity Verification: The Farmer must provide a weighbridge receipt or other certified documentation to verify the quantity of the Crops delivered.
            - Transportation Documentation: The Farmer shall provide transportation receipts, bills of lading, or other relevant documents to verify the proper handling and transport of the Crops.
    
            10. ENTIRE AGREEMENT
            This Contract constitutes the entire agreement between the parties and supersedes any prior agreements or understandings, whether written or oral.
    
            IN WITNESS WHEREOF, the parties have executed this Contract as of the date first above written.
    
            Farmer's Signature: _______________________
            Name: ${content.farmerName}
            Date: ${content.farmerSignatureDate}
    
            Buyer's Signature: _______________________
            Name: ${content.buyerName}
            Date: ${content.buyerSignatureDate}`;
    
        doc.text(contract);
    
        doc.end();
    
        res.setHeader('Content-Disposition', 'attachment; filename="document.pdf"');
        res.setHeader('Content-Type', 'application/pdf');
        stream.pipe(res);
    });