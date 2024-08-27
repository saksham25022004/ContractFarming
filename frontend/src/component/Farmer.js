import React, { useState } from 'react';
import CropPostsComponent from './YourCrops';
import BidsComponent from './YourBids';
import RequirementsComponent from './AllRequirements';
import FeedbackComponent from './Feedback';
import GovrenmentComponent from './GovrenmentReserve';
import { useNavigate } from 'react-router-dom';

const FarmerDashboard = () => {
    const [activeComponent, setActiveComponent] = useState('home');
    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/signin');
  };

    const renderComponent = () => {
        switch (activeComponent) {
            case 'cropPosts':
                return <CropPostsComponent />;
            case 'bids':
                return <BidsComponent />;
            case 'requirements':
                return <RequirementsComponent />;
            case 'feedback':
                return <FeedbackComponent />;
            case 'govenment':
                return <GovrenmentComponent />
            default:
                return <CropPostsComponent />;
        }
    };

    return (
        <div>
            <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
                <div className="text-xl font-bold">Farmer</div>
                <nav className="space-x-4">
                    <button onClick={() => setActiveComponent('cropPosts')} className="hover:text-gray-400">Your Crops</button>
                    <button onClick={() => setActiveComponent('bids')} className="hover:text-gray-400">Bidding</button>
                    <button onClick={() => setActiveComponent('requirements')} className="hover:text-gray-400">Requirements</button>
                    <button onClick={() => setActiveComponent('feedback')} className="hover:text-gray-400">Feedback</button>
                    <button onClick={() => setActiveComponent('govenment')} className="hover:text-gray-400">Govenment Reserve</button>
                </nav>
                <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-500"></div> {/* Dummy photo */}
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
