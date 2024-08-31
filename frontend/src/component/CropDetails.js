import React, { useState } from 'react';
const CropDetails = ({ crop, onSubmitFeedback }) => {
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        //onSubmitFeedback(crop.farmer._id, rating, comment);
        alert("Feedback Submitted")
        setRating('');
        setComment('');
    };
    const [payment, setPayment] = useState(false);
    function sPayment(){
        setPayment(true);
    }

    const handler = async () => {
        const data = {
            "farmerName": crop.farmerName,
            "farmerAddress": crop.location,
            "farmerContact": crop.phoneNumber, 
            "date": new Date(Date.now()).toLocaleDateString(),
            "cropType": crop.cropType,
            "quality": "Good",
            "price": crop.price,
            "deliveryDate": new Date(Date.now()).toLocaleDateString(),
            "farmerSignature": crop.farmerName,
            "buyerSignature": "I am Buyer",
            "buyerName": "I am Buyer",
            "buyerAddress": "Buyer Address",
            "buyerContact": "Buyer Contact"
        };

        try {
            const response = await fetch('http://localhost:8080/generate-pdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'document.pdf');
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
                window.URL.revokeObjectURL(url);
            } else {
                console.error('Error generating PDF:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

  
    return (
        <div className="p-6 bg-green-50 rounded-lg shadow-lg">
            <div className="flex flex-col lg:flex-row mb-6">
                <div className="lg:w-2/3 p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold text-green-800 mt-4 mb-4">{crop.cropType}</h2>
                    <p className="text-lg mb-2"><strong className="text-green-700">Land Area:</strong> {crop.landArea} acres</p>
                    <p className="text-lg mb-2"><strong className="text-green-700">Price:</strong> ₹{crop.price}</p>
                    <p className="text-lg mb-2"><strong className="text-green-700">Location:</strong> {crop.location}</p>
                    <p className="text-lg mb-2"><strong className="text-green-700">Description:</strong> {crop.description}</p>
                    <p className="text-lg mb-4"><strong className="text-green-700">Posted on:</strong> {new Date(crop.postDate).toLocaleDateString()}</p>
                </div>

                <div className="lg:w-1/3 p-4 bg-white rounded-lg shadow-md">
                    <h3 className="text-2xl font-semibold text-green-800 mb-4">Farmer Details</h3>
                    <p className="text-lg mb-2"><strong className="text-green-700">Name:</strong> {crop.farmer.name}</p>
                    <p className="text-lg mb-2"><strong className="text-green-700">Phone Number:</strong> {crop.farmer.phoneNumber}</p>
                    <p className="text-lg mb-2"><strong className="text-green-700">Rating:</strong> 4/5</p>

                    <h3 className="text-2xl font-semibold text-green-800 mb-4 mt-8">Leave Feedback</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-lg font-medium text-green-700 mb-2">Rating:</label>
                            <input 
                                type="number"
                                min="1"
                                max="5"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                className="w-full px-3 py-2 border border-green-300 rounded-lg"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-lg font-medium text-green-700 mb-2">Comment:</label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full px-3 py-2 border border-green-300 rounded-lg"
                                rows="4"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Submit Feedback
                        </button>
                    </form>
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-2xl font-semibold text-green-800 mb-4">Images</h3>
                <div className="flex space-x-2 mb-4">
                    {crop.images && crop.images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={crop.cropType}
                            className="rounded-md h-40 w-40 object-cover shadow-md border border-green-200"
                        />
                    ))}
                </div>

                <div className="mt-8">
                    <h3 className="text-2xl font-semibold text-green-800 mb-4">Payment Options</h3>
                    <p className="text-lg mb-4 text-green-700">
                        Please contact the farmer directly to arrange payment. Ensure that all transactions are secured and confirmed by both parties.
                    </p>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors" onClick={sPayment}>
                        Proceed to Payment
                    </button>
                    {
                        payment?<button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors ml-7" onClick={handler}>Download Contract</button>:<></>
                    }
                </div>
            </div>
        </div>
    );
}

export default CropDetails;