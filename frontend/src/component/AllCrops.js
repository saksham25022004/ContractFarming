import React, { useState } from 'react';
import useAllCrops from '../hooks/useAllCrops';
import { useSelector } from 'react-redux';
import CropDetails from './CropDetails';
import SearchCrops from './SearchCrops';

const AllCrops = () => {
  useAllCrops();

  const Crops = useSelector(store => store.buyer.allCrops);
  const allCrops = Crops?.posts;

  const [view, setView] = useState('ALL_CROPS');
  const [selectedCrop, setSelectedCrop] = useState(null);

  const handleCropClick = (crop) => {
    setSelectedCrop(crop);
    setView('CROP_DETAILS');
  };

  const handleSearchClick = () => {
    setView('SEARCH_CROPS');
  };

  const handleBackToAllCrops = () => {
    setView('ALL_CROPS');
    setSelectedCrop(null);
  };

  const renderView = () => {
    switch (view) {
      case 'CROP_DETAILS':
        return (
          <div>
            <button 
              onClick={handleBackToAllCrops} 
              className="text-blue-500 hover:text-blue-800 mb-4"
            >
              Back to All Crops
            </button>
            <CropDetails crop={selectedCrop} />
          </div>
        );
      case 'SEARCH_CROPS':
        return (
          <div>
            <button 
              onClick={handleBackToAllCrops} 
              className="text-blue-500 hover:text-blue-800 mb-4"
            >
              Back to All Crops
            </button>
            <SearchCrops />
          </div>
        );
      case 'ALL_CROPS':
      default:
        return (
          <div>
            <div className='flex w-[90%] justify-between'>
              <h2 className="text-2xl font-bold mb-4">All Crops</h2>
              <div className="mb-4">
                <button 
                  onClick={handleSearchClick} 
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Search Crops
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {allCrops && allCrops.length > 0 ? (
                allCrops.map((crop, index) => (
                  <div 
                    key={index} 
                    className="bg-white p-4 rounded-lg shadow-md cursor-pointer" 
                    onClick={() => handleCropClick(crop)}
                  >
                    <div className="mt-2">
                      {crop.images && (
                        <img 
                          key={crop._id} 
                          src={crop.images[0]} 
                          alt={crop.cropType} 
                          className="w-full h-32 object-cover rounded-md mb-2" 
                        />
                      )}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{crop.cropType}</h3>
                    <p><strong>Land Area:</strong> {crop.landArea} acres</p>
                    <p><strong>Price:</strong> {crop.price}</p>
                    <p><strong>Location:</strong> {crop.location}</p>
                  </div>
                ))
              ) : (
                <p>No crops available at the moment.</p>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="p-4">
      {renderView()}
    </div>
  );
};

export default AllCrops;
