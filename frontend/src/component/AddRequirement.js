import React, { useState } from 'react'

const AddRequirement = () => {
  const [cropType, setCropType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expectedPriceRange, setExpectedPriceRange] = useState('');
  const [location, setLocation] = useState('');
  const [timeframe, setTimeFrame] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
      e.preventDefault();

      const data = {
        cropType,
        quantity,
        expectedPriceRange,
        location,
        timeframe,
        description
    };

      try {
          const response = await fetch('http://localhost:8080/post/postByBuyer', {
              method: 'POST',
              headers: {
                    'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
              body: JSON.stringify(data),
          });

          const result = await response.json();
          alert(result.message);

          setCropType('');
          setQuantity('');
          setExpectedPriceRange('');
          setLocation('');
          setTimeFrame('');
          setDescription('');

      } catch (error) {
          console.error('Error creating post:', error);
      }
  };

return (      
  <form onSubmit={handleSubmit} className="bg-white-300 p-1 w-full">
      <h2 className="text-2xl font-bold mb-4">Add New Requirement</h2>
      <div className="mb-4">
          <label className=" text-gray-700">Crop Type</label>
          <input 
              type="text"
              value={cropType}
              onChange={(e) => setCropType(e.target.value)}
              className="w-full p-2 border rounded"
              required
          />
      </div>
      <div className="mb-4">
          <label className=" text-gray-700">Quantity (in kg)</label>
          <input 
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full p-2 border rounded"
              required
          />
      </div>
      <div className="mb-4">
          <label className=" text-gray-700">Expected Price (in rupees)</label>
          <input 
              type="number"
              value={expectedPriceRange}
              onChange={(e) => setExpectedPriceRange(e.target.value)}
              className="w-full p-2 border rounded"
              required
          />
      </div>
      <div className="mb-4">
          <label className="block text-gray-700">Location</label>
          <input 
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border rounded"
              required
          />
      </div>
      <div className="mb-4">
          <label className="block text-gray-700">Expected Time</label>
          <input 
              type="text"
              value={timeframe}
              onChange={(e) => setTimeFrame(e.target.value)}
              className="w-full p-2 border rounded"
              required
          />
      </div>
      <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
              required
          ></textarea>
      </div>
      <button 
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
          Add Requirement
      </button>
    </form>
  )
}

export default AddRequirement;