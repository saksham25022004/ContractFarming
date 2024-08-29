import React, { useState } from 'react';

const CropDetails = ({ crop, onSubmitFeedback }) => {
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmitFeedback(crop.farmer._id, rating, comment);
        setRating('');
        setComment('');
    };

    return (
        <div className="p-6 rounded-lg  bg-white">
            
            <div className="flex flex-col lg:flex-row mb-6">
                
                <div className="lg:w-2/3 p-4">
                    <h2 className="text-3xl font-bold mt-4 mb-4">{crop.cropType}</h2>
                    <p className="text-lg mb-2"><strong>Land Area:</strong> {crop.landArea} acres</p>
                    <p className="text-lg mb-2"><strong>Price:</strong> ₹{crop.price}</p>
                    <p className="text-lg mb-2"><strong>Location:</strong> {crop.location}</p>
                    <p className="text-lg mb-2"><strong>Description:</strong> {crop.description}</p>
                    <p className="text-lg mb-4"><strong>Posted on:</strong> {new Date(crop.postDate).toLocaleDateString()}</p>
                </div>
 
                <div className="lg:w-1/3 p-4">
                    <h3 className="text-2xl font-semibold mb-4">Farmer Details</h3>
                    <p className="text-lg mb-2"><strong>Name:</strong> {crop.farmer.name}</p>
                    <p className="text-lg mb-2"><strong>Phone Number:</strong> {crop.farmer.phoneNumber}</p>
                    <p className="text-lg mb-2"><strong>Rating:</strong> 4/5</p>

                    <h3 className="text-2xl font-semibold mb-4 mt-8">Leave Feedback</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-lg font-medium mb-2">Rating:</label>
                            <input 
                                type="number"
                                min="1"
                                max="5"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-lg font-medium mb-2">Comment:</label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg"
                                rows="4"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        >
                            Submit Feedback
                        </button>
                    </form>
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-2xl font-semibold mb-4">Images</h3>
                <div className="flex space-x-2 mb-4">
                    {crop.images && crop.images.map((image, index) => (
                        <img 
                            key={index}
                            src={image}
                            alt={crop.cropType}
                            className="rounded-md h-40 w-40 object-cover shadow-md"
                        />
                    ))}
                </div>

                <div className="mt-8">
                    <h3 className="text-2xl font-semibold mb-4">Payment Options</h3>
                    <p className="text-lg mb-4">
                        Please contact the farmer directly to arrange payment. Ensure that all transactions are secured and confirmed by both parties.
                    </p>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
                        Proceed to Payment
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CropDetails;
