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
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <span 
                className={`text-lg font-bold border rounded-lg p-1 ${
                    crop.biddingStatus === 'open'
                        ? 'text-white bg-emerald-600 border-emerald-700'
                        : 'text-white bg-red-600 border-red-700'
                }`}
            >
                {crop.biddingStatus}
            </span>
            <h3 className="text-3xl font-bold mt-4 mb-4">{crop.cropType}</h3>
            <p className="text-lg mb-2"><strong>land Area:</strong> {crop.landArea} acres</p>
            <p className="text-lg mb-2"><strong>Price:</strong> ₹{crop.price}</p>
            <p className="text-lg mb-2"><strong>Location:</strong> {crop.location}</p>
            <p className="text-lg mb-2"><strong>Farmer:</strong> {crop.farmer.name}</p>
            <p className="text-lg mb-2"><strong>Farmer Phone Number:</strong> {crop.farmer.phoneNumber}</p>
            <p className="text-lg mb-4"><strong>End on:</strong> {new Date(crop.biddingDeadline).toLocaleDateString()}</p>
            <p className="text-lg mb-2"><strong>Description:</strong> {crop.description}</p>
            
            {crop.images && (
                <div className="flex space-x-2 mb-4">
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
                    <label className="block text-lg font-medium mb-2" htmlFor="bidAmount">
                        Your Bid Amount (₹):
                    </label>
                    <input 
                        type="number" 
                        id="bidAmount" 
                        value={bidAmount} 
                        onChange={(e) => setBidAmount(e.target.value)} 
                        className="block w-full p-2 border rounded-md mb-4" 
                        placeholder="Enter your bid amount" 
                    />
                    <button 
                        type="submit" 
                        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
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
    );
};

export default BidDetails;
