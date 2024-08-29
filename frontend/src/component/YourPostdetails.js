import React from 'react';

const YourPostdetails = ({ crop, onDelete }) => {

  const handleDelete = () => {
    onDelete(crop._id);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-2">{crop.cropType}</h3>
      <p><strong>Land Area:</strong> {crop.landArea} acres</p>
      <p><strong>Price:</strong> ₹{crop.price}</p>
      <p><strong>Location:</strong> {crop.location}</p>
      <p><strong>Description:</strong> {crop.description}</p>
      <p><strong>Posted on:</strong> {new Date(crop.createdAt).toLocaleDateString()}</p>
      
      {crop.images && (
        <div className="flex space-x-2 mb-4">
          {crop.images.map((image, index) => (
            <img 
              key={index}
              src={image}
              alt={crop.cropType}
              className="rounded-md h-32 w-32 object-cover"
            />
          ))}
        </div>
      )}

      <button 
        onClick={handleDelete} 
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
      >
        Delete Post
      </button>
    </div>
  );
};

export default YourPostdetails;
