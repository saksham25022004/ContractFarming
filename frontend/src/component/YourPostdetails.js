import React from 'react';

const YourPostdetails = ({ crop, onDelete }) => {

  const handleDelete = () => {
    onDelete(crop._id);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-green-100">
      <h3 className="text-2xl font-semibold mb-4 text-green-800">{crop.cropType}</h3>
      <p className="text-gray-800 mb-2"><strong>Land Area:</strong> {crop.landArea} acres</p>
      <p className="text-gray-800 mb-2"><strong>Price:</strong> ₹{crop.price}</p>
      <p className="text-gray-800 mb-2"><strong>Location:</strong> {crop.location}</p>
      <p className="text-gray-800 mb-2"><strong>Description:</strong> {crop.description}</p>
      <p className="text-gray-600 mb-4"><strong>Posted on:</strong> {new Date(crop.createdAt).toLocaleDateString()}</p>
      
      {crop.images && (
        <div className="flex space-x-2 mb-6">
          {crop.images.map((image, index) => (
            <img 
              key={index}
              src={image}
              alt={crop.cropType}
              className="rounded-md h-36 w-36 object-cover border border-green-200 shadow-sm"
            />
          ))}
        </div>
      )}

      <button 
        onClick={handleDelete} 
        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300"
      >
        Delete Post
      </button>
    </div>
  );
};

export default YourPostdetails;
