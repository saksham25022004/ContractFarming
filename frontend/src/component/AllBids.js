import React, { useState } from 'react';
import useAllBids from '../hooks/useAllBids';
import { useSelector } from 'react-redux';
import BidDetails from './BidDetails';

const AllBids = () => {
  useAllBids();

  const Bids = useSelector(store => store.buyer.allBids);
  const allBids = Bids?.posts;

  const [selectedCrop, setSelectedCrop] = useState(null);

  const handleCropClick = (crop) => {
    setSelectedCrop(crop);
  };

  return (
    <div className="p-6 bg-green-50 min-h-screen">
      {selectedCrop ? (
        <div>
          <button 
            onClick={() => setSelectedCrop(null)} 
            className="text-green-600 hover:text-green-800 mb-4"
          >
            Back to All Bids
          </button>
          <BidDetails crop={selectedCrop} />
        </div>
      ) : (
        <div>
          <h2 className="text-3xl font-bold text-green-700 mb-6">All Bids</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allBids && allBids.length > 0 ? (
              allBids.map((crop, index) => (
                <div 
                  key={index} 
                  className="bg-white p-5 rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105"
                  onClick={() => handleCropClick(crop)}
                >
                  <div className={`mb-2 px-3 py-1 text-lg font-bold rounded-full ${crop.biddingStatus === 'open' ? 'bg-green-600 text-white border-green-700' : 'bg-red-600 text-white border-red-700'}`}>
                    {crop.biddingStatus}
                  </div>
                  {crop.images && (
                    <div className="mb-4">
                      <img 
                        src={crop.images[0]} 
                        alt={crop.cropType} 
                        className="w-full h-36 object-cover rounded-lg shadow-md"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-green-800 mb-2">{crop.cropType}</h3>
                  <p className="text-gray-700"><strong>Land Area:</strong> {crop.landArea} acres</p>
                  <p className="text-gray-700"><strong>Price:</strong> ₹{crop.price}</p>
                  <p className="text-gray-700"><strong>Location:</strong> {crop.location}</p>
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

export default AllBids;
