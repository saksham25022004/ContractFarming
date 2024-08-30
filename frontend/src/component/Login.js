import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('farmer');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = userType === 'farmer' ? 'http://localhost:8080/auth/login-Farmer' : 'http://localhost:8080/auth/login-Buyer';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ phoneNumber, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Save token to localStorage
                localStorage.setItem('token', data.token);

                // Navigate to the appropriate dashboard
                navigate(userType === 'farmer' ? '/farmer-dashboard' : '/buyer-dashboard', { replace: true });
            } else {
                alert('Login failed. Please check your credentials and try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-green-200">
                <h2 className="text-3xl font-semibold mb-6 text-green-800">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-green-700 mb-2">I am a:</label>
                        <select
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                            className="w-full px-3 py-2 border border-green-300 rounded-lg bg-green-50 text-green-700 focus:outline-none focus:border-green-500"
                        >
                            <option value="farmer">Farmer</option>
                            <option value="buyer">Buyer</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-green-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                            Phone Number
                        </label>
                        <input
                            id="phoneNumber"
                            type="text"
                            className="w-full px-3 py-2 text-green-700 border border-green-300 rounded-lg bg-green-50 focus:outline-none focus:border-green-500"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-green-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="w-full px-3 py-2 text-green-700 border border-green-300 rounded-lg bg-green-50 focus:outline-none focus:border-green-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                        >
                            Log In
                        </button>
                    </div>
                </form>
                <p className="mt-4 text-center">
                    Don't have an account? <a href="/signup" className="text-green-600 hover:underline">Sign Up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
