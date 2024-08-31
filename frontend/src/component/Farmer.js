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
    const [activeComponent, setActiveComponent] = useState('cropPosts');
    const navigate = useNavigate();

    const isAuthenticated = () => {
        const token = localStorage.getItem('token');
        return !!token;
    };

    useEffect(() => {
        if (!isAuthenticated()) {
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
                return <GovrenmentComponent />;
            case 'profile':
                return <ProfileComponent />;
            default:
                return <CropPostsComponent />;
        }
    };

    return (
        <div className="bg-green-50 min-h-screen">
            <header className="flex items-center justify-between p-4 bg-green-700 text-white sticky top-0 z-10">
                <div className='flex'>
                    <img src='https://res.cloudinary.com/dkwurpttz/image/upload/v1725056080/images/eeuudgyjnamy4kkhuox1.jpg' alt='logo' className='w-7' />
                    <div className="text-xl font-bold ml-2">KrishiMitr</div>
                </div>
                <nav className="flex space-x-12">
                    <button 
                        onClick={() => setActiveComponent('cropPosts')} 
                        className={`transition-colors ${activeComponent === 'cropPosts' ? 'border-b-2 border-white' : ''} hover:text-green-300`}
                    >
                        Your Crops
                    </button>
                    <button 
                        onClick={() => setActiveComponent('addCrop')} 
                        className={`transition-colors ${activeComponent === 'addCrop' ? 'border-b-2 border-white' : ''} hover:text-green-300`}
                    >
                        Add Crops
                    </button>
                    <button 
                        onClick={() => setActiveComponent('bids')} 
                        className={`transition-colors ${activeComponent === 'bids' ? 'border-b-2 border-white' : ''} hover:text-green-300`}
                    >
                        Bidding
                    </button>
                    <button 
                        onClick={() => setActiveComponent('addBid')} 
                        className={`transition-colors ${activeComponent === 'addBid' ? 'border-b-2 border-white' : ''} hover:text-green-300`}
                    >
                        Add Bid
                    </button>
                    <button 
                        onClick={() => setActiveComponent('requirements')} 
                        className={`transition-colors ${activeComponent === 'requirements' ? 'border-b-2 border-white' : ''} hover:text-green-300`}
                    >
                        Requirements
                    </button>
                    <button 
                        onClick={() => setActiveComponent('govenment')} 
                        className={`transition-colors ${activeComponent === 'govenment' ? 'border-b-2 border-white' : ''} hover:text-green-300`}
                    >
                        Government Reserve
                    </button>
                </nav>
                <div className="flex items-center space-x-2">
                    <button 
                        className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-400 transition-colors" 
                        onClick={() => setActiveComponent('profile')}
                    >
                        <span className="text-xs">P</span>
                    </button>
                    <button 
                        onClick={handleLogout} 
                        className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition-colors"
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
