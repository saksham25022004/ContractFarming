import React from 'react';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Assured Contract Farming System</h1>
                <p className="text-lg text-gray-600 mb-8">Connecting Farmers and Buyers for Stable Market Access</p>
                <div className="space-x-4">
                    <a href="/login" className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow hover:bg-blue-600">
                        Login
                    </a>
                    <a href="/signup" className="bg-green-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow hover:bg-green-600">
                        Sign Up
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Home;
