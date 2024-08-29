import { useState } from 'react';
import useYourBids from '../hooks/useYourBids';
import { useSelector } from 'react-redux';
import YourBidDetails from './YourBidDetails';

const YourBids = () => {
    useYourBids();

    const [selectedCrop, setSelectedCrop] = useState(null);

    const bids=useSelector(store=>store.farmer.yourBids);
    const allBids=bids?.bids;

    const handleCropClick = (crop) => {
        setSelectedCrop(crop);
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
                    <YourBidDetails crop={selectedCrop}/>
                </div>
            ) : (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Your Bids</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {allBids && allBids.length > 0 ? (
                            allBids.map((crop, index) => (
                                <div key={index} className="bg-white p-4 rounded-lg shadow-md cursor-pointer" onClick={() => handleCropClick(crop)}>
                                    {crop.biddingStatus==='open'?(
                                            <span className='text-lg text-white bg-emerald-600 font-bold border border-emerald-700 rounded-lg p-1'>{crop.biddingStatus}</span>
                                        ):(
                                            <span className='text-lg text-white bg-red-600 font-bold border border-red-700 rounded-lg p-1'>{crop.biddingStatus}</span>
                                        )
                                    }   
                                    <div className="mt-2">
                                        {crop.images && <img key={crop._id} src={crop.images[0]} alt={crop.cropType} className="w-full h-32 object-cover rounded-md mb-2" />}
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
            )
            }
        </div>
    )
}

export default YourBids;