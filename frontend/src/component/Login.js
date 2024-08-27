import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('farmer');
    const navigate=useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(userType === 'farmer' ? '/farmer-dashboard' : '/buyer-dashboard');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">I am a:</label>
                        <select
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                            <option value="farmer">Farmer</option>
                            <option value="buyer">Buyer</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                        >
                            Login In
                        </button>
                    </div>
                </form>
                <p className="mt-4 text-center">
                    Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
