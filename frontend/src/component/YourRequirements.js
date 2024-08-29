import React from 'react';
import useYourRequirement from '../hooks/useYourRequirements';
import { useSelector } from 'react-redux';

const YourRequirements = () => {

  useYourRequirement();

  const requirement=useSelector(store=>store.buyer.yourRequirements);

  const allRequirements=requirement?.requirements;
  console.log(allRequirements);

  return (
    <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">All Requirements</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {allRequirements?.length > 0 ? (
                allRequirements.map((requirement, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-4 w-[50%]">
                        <h3 className="text-lg font-bold mb-2">{requirement.cropType}</h3>
                        <p className="text-gray-700"><strong>Quantity:</strong> {requirement.quantity}</p>
                        <p className="text-gray-700"><strong>Timeframe:</strong> {requirement.timeframe}</p>
                        <p className="text-gray-700"><strong>Expected Price Range:</strong> {requirement.expectedPriceRange}</p>
                        <p className="text-gray-700"><strong>Location:</strong> {requirement.location}</p>
                        <p className="text-gray-700"><strong>Description:</strong> {requirement.description}</p>
                        <p className="text-gray-600 text-sm"><strong>Posted on:</strong> {new Date(requirement.createdAt).toLocaleDateString()}</p>
                    </div>
                ))
            ) : (
                <p>No requirements found.</p>
            )}
        </div>
    </div>
  )
}

export default YourRequirements;