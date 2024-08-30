import React, { useState } from 'react';

const BidDetails = ({ crop }) => {
    const [bidAmount, setBidAmount] = useState('');
    const [hasSubmittedBid, setHasSubmittedBid] = useState(false);
    const isBiddingClosed = crop.biddingStatus !== 'open';

    const handleBidSubmit = async (e) => {
        e.preventDefault();

        if (!bidAmount) {
            alert('Please enter your bid amount.');
            return;
        }

        const bidData = {
            postId: crop._id,
            bidAmount: bidAmount,
        };

        try {
            const response = await fetch('http://localhost:8080/bid/submitBid', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bidData),
            });

            if (response.ok) {
                alert('Bid submitted successfully!');
                setHasSubmittedBid(true);
                setBidAmount('');
            } else {
                alert('Failed to submit bid. Please try again.');
            }
        } catch (error) {
            alert('An error occurred while submitting your bid.');
        }
    };

    return (
        <div className="flex flex-col lg:flex-row bg-green-100 p-6 rounded-lg shadow-lg max-w-6xl mx-auto">
            {/* Left Column */}
            <div className="lg:w-1/2 pr-4">
                <span 
                    className={`text-lg font-bold border rounded-lg p-2 mb-4 inline-block ${
                        crop.biddingStatus === 'open'
                            ? 'text-white bg-green-700 border-green-800'
                            : 'text-white bg-red-700 border-red-800'
                    }`}
                >
                    {crop.biddingStatus}
                </span>
                <h3 className="text-3xl font-bold text-green-800 mb-4">{crop.cropType}</h3>
                <p className="text-lg mb-2 text-gray-800"><strong>Land Area:</strong> {crop.landArea} acres</p>
                <p className="text-lg mb-2 text-gray-800"><strong>Price:</strong> ₹{crop.price}</p>
                <p className="text-lg mb-2 text-gray-800"><strong>Location:</strong> {crop.location}</p>
                <p className="text-lg mb-2 text-gray-800"><strong>Farmer:</strong> {crop.farmer.name}</p>
                <p className="text-lg mb-2 text-gray-800"><strong>Farmer Phone Number:</strong> {crop.farmer.phoneNumber}</p>
                <p className="text-lg mb-4 text-gray-800"><strong>Ends on:</strong> {new Date(crop.biddingDeadline).toLocaleDateString()}</p>
                <p className="text-lg mb-2 text-gray-800"><strong>Description:</strong> {crop.description}</p>
            </div>

            {/* Right Column */}
            <div className="lg:w-1/2 pl-4">
                {crop.images && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {crop.images.map((image, index) => (
                            <img 
                                key={index}
                                src={image}
                                alt={crop.cropType}
                                className="rounded-md h-40 w-40 object-cover shadow-md"
                            />
                        ))}
                    </div>
                )}

                {!isBiddingClosed && !hasSubmittedBid ? (
                    <form onSubmit={handleBidSubmit} className="mt-4">
                        <label className="block text-lg font-medium mb-2 text-gray-700" htmlFor="bidAmount">
                            Your Bid Amount (₹):
                        </label>
                        <input 
                            type="number" 
                            id="bidAmount" 
                            value={bidAmount} 
                            onChange={(e) => setBidAmount(e.target.value)} 
                            className="block w-full p-3 border border-green-300 rounded-md mb-4 focus:border-green-500 focus:ring focus:ring-green-200"
                            placeholder="Enter your bid amount" 
                        />
                        <button 
                            type="submit" 
                            className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            Submit Bid
                        </button>
                    </form>
                ) : isBiddingClosed ? (
                    <p className="text-lg text-red-600 mt-4">Bidding is closed for this post.</p>
                ) : (
                    <p className="text-lg text-green-600 mt-4">You have already submitted a bid.</p>
                )}
            </div>
        </div>
    );
};

export default BidDetails;
