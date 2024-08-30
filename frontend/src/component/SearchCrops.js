import React, { useState, useEffect } from 'react';

const SearchCrops = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCrops = async () => {
            if (searchTerm.trim() === '') {
                setSearchResults([]);
                return;
            }

            setLoading(true);
            try {
                const response = await fetch(`http://localhost:8080/post/searchByCrop/${searchTerm}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                setSearchResults(data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCrops();
    }, [searchTerm]);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Search Crops</h2>
            <input 
                type="text" 
                placeholder="Search for crops..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="border p-2 rounded mb-4 w-full"
            />
            {loading && <p>Loading...</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {searchResults.length > 0 ? (
                    searchResults.map((crop, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-md">
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
                    <p>No results found.</p>
                )}
            </div>
        </div>
    );
};

export default SearchCrops;