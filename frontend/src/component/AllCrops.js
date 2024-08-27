import React from 'react';
import useAllCrops from '../hooks/useAllCrops';
import { useSelector } from 'react-redux';

const AllCrops = () => {

  useAllCrops();

  const Crops=useSelector(store=>store.buyer.allCrops);

  const allCrops=Crops?.posts;
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Crops</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allCrops && allCrops.length > 0 ? (
          allCrops.map((crop, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{crop.cropType}</h3>
              <p><strong>Price:</strong> {crop.price}</p>
              <p><strong>Location:</strong> {crop.location}</p>
              <p><strong>Land Area:</strong> {crop.landArea} acres</p>
              <p><strong>Description:</strong> {crop.description}</p>
              <div className="mt-2">
                {crop.images && crop.images.map((image, idx) => (
                  <img key={idx} src={image} alt={crop.cropType} className="w-full h-32 object-cover rounded-md mb-2" />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No crops available at the moment.</p>
        )}
      </div>
    </div>
  )
}

export default AllCrops;