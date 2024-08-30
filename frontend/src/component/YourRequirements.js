import React from 'react';
import useYourRequirement from '../hooks/useYourRequirements';
import { useSelector } from 'react-redux';

const YourRequirements = () => {

  useYourRequirement();

  const requirement = useSelector(store => store.buyer.yourRequirements);
  const allRequirements = requirement?.requirements;
  console.log(allRequirements);

  return (
    <div className="p-6 bg-green-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-green-800">Your Requirements</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {allRequirements?.length > 0 ? (
          allRequirements.map((requirement, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-green-200 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-3 text-green-700">{requirement.cropType}</h3>
              <p className="text-gray-800 mb-2"><strong>Quantity:</strong> {requirement.quantity} kg</p>
              <p className="text-gray-800 mb-2"><strong>Timeframe:</strong> {requirement.timeframe}</p>
              <p className="text-gray-800 mb-2"><strong>Expected Price Range:</strong> ₹{requirement.expectedPriceRange}</p>
              <p className="text-gray-800 mb-2"><strong>Location:</strong> {requirement.location}</p>
              <p className="text-gray-800 mb-4"><strong>Description:</strong> {requirement.description}</p>
              <p className="text-gray-600 text-sm"><strong>Posted on:</strong> {new Date(requirement.createdAt).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No requirements found.</p>
        )}
      </div>
    </div>
  );
}

export default YourRequirements;
