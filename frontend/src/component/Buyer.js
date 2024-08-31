import React, { useEffect, useState } from 'react';
import CropPostsComponent from './AllCrops';
import BidsComponent from './AllBids';
import RequirementsComponent from './YourRequirements';
import AddRequirementsComponent from './AddRequirement';
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
        navigate('/', { replace: true });
    };

    const renderComponent = () => {
        switch (activeComponent) {
            case 'cropPosts':
                return <CropPostsComponent />;
            case 'bids':
                return <BidsComponent />;
            case 'requirements':
                return <RequirementsComponent />;
            case 'addRequirement':
                return <AddRequirementsComponent />;
            case 'profile':
                return <ProfileComponent />;
            default:
                return <CropPostsComponent />;
        }
    };

    return (
        <div className="bg-green-100 min-h-screen flex flex-col">
            <header className="flex items-center justify-between p-4 bg-green-800 text-white sticky top-0 z-10 shadow-md">
                <div className='flex'>
                    <img src='https://res.cloudinary.com/dkwurpttz/image/upload/v1725056080/images/eeuudgyjnamy4kkhuox1.jpg' alt='logo' className='w-7' />
                    <div className="text-xl font-bold ml-2">KrishiMitr</div>
                </div>
                <nav className="flex space-x-12">
                    <button
                        onClick={() => setActiveComponent('cropPosts')}
                        className={`hover:text-green-200 transition-colors ${activeComponent === 'cropPosts' ? 'border-b-2 border-white' : ''}`}
                    >
                        All Crops
                    </button>
                    <button
                        onClick={() => setActiveComponent('bids')}
                        className={`hover:text-green-200 transition-colors ${activeComponent === 'bids' ? 'border-b-2 border-white' : ''}`}
                    >
                        Bidding
                    </button>
                    <button
                        onClick={() => setActiveComponent('requirements')}
                        className={`hover:text-green-200 transition-colors ${activeComponent === 'requirements' ? 'border-b-2 border-white' : ''}`}
                    >
                        Your Requirements
                    </button>
                    <button
                        onClick={() => setActiveComponent('addRequirement')}
                        className={`hover:text-green-200 transition-colors ${activeComponent === 'addRequirement' ? 'border-b-2 border-white' : ''}`}
                    >
                        Add Requirements
                    </button>
                </nav>
                <div className="flex items-center space-x-2">
                    <button 
                        className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white hover:bg-green-500"
                        onClick={() => setActiveComponent('profile')}
                    >
                        {/* Profile icon */}
                        P
                    </button>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </header>
            <main className="flex-1 p-4 bg-green-50">
                {renderComponent()}
            </main>
        </div>
    );
};

export default FarmerDashboard;
