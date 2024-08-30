import React, { useState } from 'react';
import useAllCrops from '../hooks/useAllCrops';
import { useSelector } from 'react-redux';
import CropDetails from './CropDetails';

const AllCrops = () => {
  useAllCrops();

  const Crops = useSelector((store) => store.buyer.allCrops);
  const allCrops = Crops?.posts;

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
            className="text-green-600 hover:text-green-800 mb-4 font-semibold transition-colors"
          >
            Back to All Crops
          </button>
          <CropDetails crop={selectedCrop} />
        </div>
      ) : (
        <div>
          <h2 className="text-3xl font-bold mb-6 text-green-800">All Crops</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCrops && allCrops.length > 0 ? (
              allCrops.map((crop, index) => (
                <div 
                  key={index} 
                  className="bg-white p-5 rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl"
                  onClick={() => handleCropClick(crop)}
                >
                  <div className="mt-2">
                    {crop.images && <img key={crop._id} src={crop.images[0]} alt={crop.cropType} className="w-full h-32 object-cover rounded-md mb-3 border-2 border-green-200" />}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-green-700">{crop.cropType}</h3>
                  <p><strong className="text-green-600">Land Area:</strong> {crop.landArea} acres</p>
                  <p><strong className="text-green-600">Price:</strong> {crop.price}</p>
                  <p><strong className="text-green-600">Location:</strong> {crop.location}</p>
                </div>
              ))
            ) : (
              <p className="text-green-700">No crops available at the moment.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AllCrops;
