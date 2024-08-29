import React, { useEffect, useState } from 'react';
import CropPostsComponent from './YourCrops';
import AddCropComponent from './AddCrop';
import BidsComponent from './YourBids';
import AddBidComponent from './AddBid';
import RequirementsComponent from './AllRequirements';
import GovrenmentComponent from './GovrenmentReserve';
import ProfileComponent from './Profile';
import { useNavigate } from 'react-router-dom';

const FarmerDashboard = () => {
    const [activeComponent, setActiveComponent] = useState('home');
    const navigate = useNavigate();

    const isAuthenticated = () => {
        const token = localStorage.getItem('token');
        return !!token;
    };
      
    useEffect(() => {
        if (!isAuthenticated) {
          navigate('/login', { replace: true });
        }
      }, [navigate]);

    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/', {replace:true});
    };

    const renderComponent = () => {
        switch (activeComponent) {
            case 'cropPosts':
                return <CropPostsComponent />;
            case 'addCrop':
                return <AddCropComponent />;    
            case 'bids':
                return <BidsComponent />;
            case 'addBid':
                return <AddBidComponent />;
            case 'requirements':
                return <RequirementsComponent />;
            case 'govenment':
                return <GovrenmentComponent />
            case 'profile':
                return <ProfileComponent />
            default:
                return <CropPostsComponent />;
        }
    };

    return (
        <div>
            <header className="flex items-center justify-between p-4 bg-gray-800 text-white sticky top-0 z-10">
                <div className="text-xl font-bold">Farmer</div>
                <nav className="space-x-4">
                    <button onClick={() => setActiveComponent('cropPosts')} className="hover:text-gray-400">Your Crops</button>
                    <button onClick={() => setActiveComponent('addCrop')} className="hover:text-gray-400">Add Crops</button>
                    <button onClick={() => setActiveComponent('bids')} className="hover:text-gray-400">Bidding</button>
                    <button onClick={() => setActiveComponent('addBid')} className="hover:text-gray-400">Add Bid</button>
                    <button onClick={() => setActiveComponent('requirements')} className="hover:text-gray-400">Requirements</button>
                    <button onClick={() => setActiveComponent('govenment')} className="hover:text-gray-400">Govenment Reserve</button>
                </nav>
                <div className="flex items-center space-x-2">
                <button className="w-8 h-8 rounded-full bg-gray-500" onClick={() => setActiveComponent('profile')}></button>
                <button 
                    onClick={handleLogout} 
                    className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                >
                    Logout
                </button>
                </div>
            </header>
            <main className="p-4">
                {renderComponent()}
            </main>
        </div>
    );
};

export default FarmerDashboard;
