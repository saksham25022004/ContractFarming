import React, { useState } from 'react';

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

      // Clear form fields
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
    <form onSubmit={handleSubmit} className="bg-green-100 p-8 max-w-lg mx-auto rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-green-800">Add New Requirement</h2>
      <div className="mb-6">
        <label className="block text-lg font-semibold text-green-700 mb-2">Crop Type</label>
        <input
          type="text"
          value={cropType}
          onChange={(e) => setCropType(e.target.value)}
          className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-lg font-semibold text-green-700 mb-2">Quantity (in kg)</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-lg font-semibold text-green-700 mb-2">Expected Price (in rupees)</label>
        <input
          type="number"
          value={expectedPriceRange}
          onChange={(e) => setExpectedPriceRange(e.target.value)}
          className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-lg font-semibold text-green-700 mb-2">Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-lg font-semibold text-green-700 mb-2">Timeframe</label>
        <input
          type="text"
          value={timeframe}
          onChange={(e) => setTimeFrame(e.target.value)}
          className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-lg font-semibold text-green-700 mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          rows="4"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Add Requirement
      </button>
    </form>
  );
}

export default AddRequirement;
