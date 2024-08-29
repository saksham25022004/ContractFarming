import React, { useState } from 'react';
import useAllCrops from '../hooks/useAllCrops';
import { useSelector } from 'react-redux';
import CropDetails from './CropDetails';

const AllCrops = () => {

  useAllCrops();

  const Crops=useSelector(store=>store.buyer.allCrops);
  const allCrops=Crops?.posts;

  const [selectedCrop, setSelectedCrop] = useState(null);

  const handleCropClick = (crop) => {
      setSelectedCrop(crop);
  };
  return (
    <div className="p-4">
        {selectedCrop ? (
            <div>
                <button 
                    onClick={() => setSelectedCrop(null)} 
                    className="text-blue-500 hover:text-blue-800 mb-4"
                >
                    Back to All Crops
                </button>
                <CropDetails crop={selectedCrop}/>
            </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">All Crops</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {allCrops && allCrops.length > 0 ? (
                allCrops.map((crop, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-md cursor-pointer" onClick={() => handleCropClick(crop)}>
                    <div className="mt-2">
                      {crop.images && <img key={crop._id} src={crop.images[0]} alt={crop.cropType} className="w-full h-32 object-cover rounded-md mb-2" />}
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
        )
        }
    </div>
  )
}

export default AllCrops;