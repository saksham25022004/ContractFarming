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
        const token =localStorage.getItem('token');

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
        <div className="p-4">
            {selectedCrop ? (
                <div>
                    <button 
                        onClick={() => setSelectedCrop(null)} 
                        className="text-blue-500 hover:text-blue-800 mb-4"
                    >
                        Back to All Crops
                    </button>
                    <YourPostdetails crop={selectedCrop} onDelete={handleDelete}/>
                </div>
            ) : (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Your Crops</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {allCrops && allCrops.length > 0 ? (
                            allCrops.map((crop, index) => (
                                <div 
                                    key={index} 
                                    className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
                                    onClick={() => handleCropClick(crop)}
                                >
                                    <div className="mt-2">
                                        {crop.images && 
                                            <img 
                                                src={crop.images[0]} 
                                                alt={crop.cropType} 
                                                className="w-full h-32 object-cover rounded-md mb-2" 
                                            />
                                        }
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{crop.cropType}</h3>
                                    <p><strong>Land Area:</strong> {crop.landArea} acres</p>
                                    <p><strong>Price:</strong> ₹{crop.price}</p>
                                    <p><strong>Location:</strong> {crop.location}</p>
                                </div>
                            ))
                        ) : (
                            <p>No crops available at the moment.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default YourCrops;