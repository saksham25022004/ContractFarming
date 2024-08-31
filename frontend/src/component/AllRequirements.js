import React from 'react';
import useAllRequirements from '../hooks/useAllRequirements';
import { useSelector } from 'react-redux';

const AllRequirements = () => {
  useAllRequirements();

  const requirements = useSelector(store => store.farmer.allRequirements);
  const allRequirements = requirements?.requirements;

  return (
    <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">All Requirements</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {allRequirements?.length > 0 ? (
                allRequirements.map((requirement, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-4 w-full">
                        <h3 className="text-lg font-bold mb-2">{requirement.cropType}</h3>
                        <p className="text-gray-700"><strong>Quantity:</strong> {requirement.quantity}</p>
                        <p className="text-gray-700"><strong>Expected Time:</strong> {requirement.timeframe}</p>
                        <p className="text-gray-700"><strong>Expected Price Range:</strong> {requirement.expectedPriceRange}</p>
                        <p className="text-gray-700"><strong>Buyer:</strong> {requirement.Buyer}</p>
                        <p className="text-gray-700"><strong>Location:</strong> {requirement.location}</p>
                        <p className="text-gray-700"><strong>Phone Number:</strong> {requirement.phoneNumber}</p>
                        <p className="text-gray-700"><strong>Description:</strong> {requirement.description}</p>
                        <p className="text-gray-600 text-sm"><strong>Posted on:</strong> {new Date(requirement.createdAt).toLocaleDateString()}</p>
                        <button
                            className="bg-green-500 text-white mt-4 py-2 px-4 rounded hover:bg-green-700"
                            onClick={() => console.log('Accepted requirement:', requirement)}
                        >
                            Accept
                        </button>
                    </div>
                ))
            ) : (
                <p>No requirements found.</p>
            )}
        </div>
    </div>
  );
}

export default AllRequirements;
