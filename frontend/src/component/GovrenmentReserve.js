import React from 'react'
import useGovenmentReserve, {} from '../hooks/useGovenmentReserve';
import { useSelector } from 'react-redux';

const GovrenmentReserve = () => {

  useGovenmentReserve();

  const reserve=useSelector(store=>store.farmer.govenmentReserve);

  const allReserves=reserve?.reserves;
  console.log(allReserves);

  const handleApply = async (reserveId) => {
    try {
        const response = await fetch(`http://localhost:8080/reserve/applyForReserve/:{reserveId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });

        const result = await response.json();
        console.log('Applied for government reserve:', result);

    } catch (error) {
        console.error('Error applying for government reserve:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Government Reserves</h2>
      
      {allReserves && allReserves.length > 0 ? (
          <div>
              {allReserves.map(reserve => (
                  <div key={reserve._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                      <h3 className="text-lg font-bold mb-2">{reserve.type}</h3>
                      <p className="text-gray-700"><strong>Description:</strong> {reserve.description}</p>
                      <p className="text-gray-700"><strong>Eligibility Criteria:</strong> {reserve.eligibilityCriteria}</p>
                      <p className="text-gray-700"><strong>Resources Available:</strong> {reserve.resourcesAvailable}</p>
                      <p className="text-gray-700"><strong>Distributed Resources:</strong> {reserve.distributedResources}</p>
                      <p className="text-gray-700"><strong>Start Date:</strong> {new Date(reserve.startDate).toLocaleDateString()}</p>
                      <p className="text-gray-700"><strong>End Date:</strong> {new Date(reserve.endDate).toLocaleDateString()}</p>
                      <button
                          onClick={() => handleApply(reserve._id)}
                          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
                      >
                          Apply
                      </button>
                  </div>
              ))}
          </div>
      ) : (
          <p>No government reserves available.</p>
      )}
    </div>
  )
}

export default GovrenmentReserve;