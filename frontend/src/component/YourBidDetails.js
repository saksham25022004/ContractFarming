import React, { useEffect, useState } from 'react';

const YourBidDetails = ({ crop }) => {
    const [buyerDetails, setBuyerDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const isBiddingClosed = crop.biddingStatus !== 'open';

    useEffect(() => {
        if (isBiddingClosed) {
            const fetchBuyerDetails = async () => {
                try {
                    const token =localStorage.getItem('token');
                    const response = await fetch(`http://localhost:8080/bid/viewBid/${crop._id}`,{
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                    });
                    
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await response.json();
                    
                    setBuyerDetails(data.bids || []);
                } catch (error) {
                    console.error('Error fetching buyer details:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchBuyerDetails();
        } else {
            setLoading(false);
        }
    }, [crop._id, isBiddingClosed]);

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
            <p className="text-lg mb-2"><strong>Land Area:</strong> {crop.landArea} acres</p>
            <p className="text-lg mb-2"><strong>Price:</strong> ₹{crop.price}</p>
            <p className="text-lg mb-2"><strong>Location:</strong> {crop.location}</p>
            <p className="text-lg mb-2"><strong>Description:</strong> {crop.description}</p>
            <p className="text-lg mb-4"><strong>Posted on:</strong> {new Date(crop.createdAt).toLocaleDateString()}</p>
            
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

            <h2 className='text-2xl font-bold mt-6'>Buyers Who Bid</h2>
            {loading ? (
                <div>Loading...</div>
            ) : isBiddingClosed ? (
                buyerDetails.length > 0 ? (
                    <div className="mt-4">
                        <h4 className="text-xl font-semibold mb-2">Bidders:</h4>
                        <ul className="list-disc list-inside">
                            {buyerDetails.map((bid, index) => (
                                <li key={index} className="mb-2 p-2 border rounded-md shadow-sm">
                                    <p><strong>Name:</strong> {bid.memberName}</p>
                                    <p><strong>Contact:</strong> {bid.memberContact}</p>
                                    <p><strong>Bid Amount:</strong> ₹{bid.bidAmount}</p>
                                    {/* Add more fields if needed */}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="mt-4 text-gray-600">No bids for this post.</div>
                )
            ) : (
                <div className="mt-4 text-green-600">Bidding is ongoing!</div>
            )}
        </div>
    );
};

export default YourBidDetails;
