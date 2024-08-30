import { useState } from 'react';
import useYourCrops from '../hooks/useYourCrops';
import { useSelector } from 'react-redux';
import YourPostdetails from './YourPostdetails';

const YourCrops = () => {
    useYourCrops();

    const [selectedCrop, setSelectedCrop] = useState(null);

    const crops = useSelector(store => store.farmer.yourCrops);
    const allCrops = crops?.cropPosts;

    const handleCropClick = (crop) => {
        setSelectedCrop(crop);
    };

    const handleDelete = async (cropId) => {
        const token = localStorage.getItem('token');

        await fetch(`http://localhost:8080/post/posts/${cropId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        setSelectedCrop(null);
    };

    return (
        <div className="p-6 bg-green-50 min-h-screen">
            {selectedCrop ? (
                <div>
                    <button 
                        onClick={() => setSelectedCrop(null)} 
                        className="text-green-600 hover:text-green-800 mb-4 font-semibold transition-colors"
                    >
                        Back to All Crops
                    </button>
                    <YourPostdetails crop={selectedCrop} onDelete={handleDelete} />
                </div>
            ) : (
                <div>
                    <h2 className="text-3xl font-bold mb-6 text-green-800">Your Crops</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {allCrops && allCrops.length > 0 ? (
                            allCrops.map((crop, index) => (
                                <div 
                                    key={index} 
                                    className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-2xl transition-shadow transform hover:scale-105"
                                    onClick={() => handleCropClick(crop)}
                                >
                                    <div className="mt-2">
                                        {crop.images && 
                                            <img 
                                                src={crop.images[0]} 
                                                alt={crop.cropType} 
                                                className="w-full h-40 object-cover rounded-md border-2 border-green-200 mb-4" 
                                            />
                                        }
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-green-700">{crop.cropType}</h3>
                                    <p className="text-lg"><strong className="text-green-600">Land Area:</strong> {crop.landArea} acres</p>
                                    <p className="text-lg"><strong className="text-green-600">Price:</strong> ₹{crop.price}</p>
                                    <p className="text-lg"><strong className="text-green-600">Location:</strong> {crop.location}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-green-700">No crops available at the moment.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default YourCrops;