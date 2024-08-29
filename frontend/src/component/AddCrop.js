import React, { useState } from 'react'

const AddCrop = () => {

    const [cropType, setCropType] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [landArea, setLandArea] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState(null);

    const handleFileChange = (e) => {
        setImages(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('cropType', cropType);
        formData.append('price', price);
        formData.append('location', location);
        formData.append('landArea', landArea);
        formData.append('description', description);

        if (images) {
            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i]);
            }
        }

        try {
            const response = await fetch('http://localhost:8080/post/postByFarmer', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData,
            });

            const result = await response.json();
            alert(result.message);

            setCropType('');
            setPrice('');
            setLocation('');
            setLandArea('');
            setDescription('');
            setImages(null);

        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

  return (
         
    <form onSubmit={handleSubmit} className="bg-white-300 p-1 w-full">
        <h2 className="text-2xl font-bold mb-4">Add New Crop</h2>
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
            <label className=" text-gray-700">Price (in rupees)</label>
            <input 
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
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
            <label className="block text-gray-700">Land Area (in acres)</label>
            <input 
                type="number"
                value={landArea}
                onChange={(e) => setLandArea(e.target.value)}
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
        <div className="mb-4">
            <label className="block text-gray-700">Images</label>
            <input 
                type="file"
                onChange={handleFileChange}
                className="w-full p-2 border rounded"
                multiple
            />
        </div>
        <button 
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
            Add Crop
        </button>
    </form>
    
  )
}

export default AddCrop