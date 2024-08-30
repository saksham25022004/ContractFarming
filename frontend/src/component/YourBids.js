import { useState } from 'react';
import useYourBids from '../hooks/useYourBids';
import { useSelector } from 'react-redux';
import YourBidDetails from './YourBidDetails';

const YourBids = () => {
    useYourBids();

    const [selectedCrop, setSelectedCrop] = useState(null);

    const bids = useSelector(store => store.farmer.yourBids);
    const allBids = bids?.bids;

    const handleCropClick = (crop) => {
        setSelectedCrop(crop);
    };

    return (
        <div className="p-6 bg-green-50 min-h-screen">
            {selectedCrop ? (
                <div>
                    <button 
                        onClick={() => setSelectedCrop(null)} 
                        className="text-green-600 hover:text-green-800 mb-6 font-medium"
                    >
                        Back to All Crops
                    </button>
                    <YourBidDetails crop={selectedCrop} />
                </div>
            ) : (
                <div>
                    <h2 className="text-3xl font-bold text-green-800 mb-6">Your Bids</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {allBids && allBids.length > 0 ? (
                            allBids.map((crop, index) => (
                                <div 
                                    key={index} 
                                    className="bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                                    onClick={() => handleCropClick(crop)}
                                >
                                    <span 
                                        className={`text-lg font-bold border rounded-lg p-1 ${
                                            crop.biddingStatus === 'open'
                                                ? 'text-white bg-emerald-600 border-emerald-700'
                                                : 'text-white bg-red-600 border-red-700'
                                        }`}
                                    >
                                        {crop.biddingStatus}
                                    </span>
                                    <div className="mt-2">
                                        {crop.images && <img 
                                            key={crop._id} 
                                            src={crop.images[0]} 
                                            alt={crop.cropType} 
                                            className="w-full h-36 object-cover rounded-md mb-3 shadow-sm" 
                                        />}
                                    </div>
                                    <h3 className="text-xl font-semibold text-green-700 mb-2">{crop.cropType}</h3>
                                    <p className="text-gray-800"><strong>Land Area:</strong> {crop.landArea} acres</p>
                                    <p className="text-gray-800"><strong>Price:</strong> ₹{crop.price}</p>
                                    <p className="text-gray-800"><strong>Location:</strong> {crop.location}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">No crops available at the moment.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default YourBids;
         