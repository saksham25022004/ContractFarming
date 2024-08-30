import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [district, setDistrict] = useState('');
    const [state, setState] = useState('');
    const [userType, setUserType] = useState('farmer');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        const userData = {
            phoneNumber,
            password,
            name,
            address,
            district,
            state
        };

        const url = userType === 'farmer' ? 'http://localhost:8080/auth/signup-Farmer' : 'http://localhost:8080/auth/signup-Buyer';
        
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                navigate('/');
            } else {
                const errorData = await response.json();
                console.error('Signup failed:', errorData.message);
                alert('Signup failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during signup:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-green-200">
                <h2 className="text-3xl font-semibold mb-6 text-center text-green-800">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-green-700 mb-2">I am a:</label>
                        <select
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                            className="w-full px-3 py-2 border border-green-300 rounded-lg bg-green-50 text-green-700"
                        >
                            <option value="farmer">Farmer</option>
                            <option value="buyer">User</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-green-700 mb-2" htmlFor="phoneNumber">Phone Number</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-green-300 rounded-lg bg-green-50 text-green-700 focus:outline-none focus:border-green-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-green-700 mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-green-300 rounded-lg bg-green-50 text-green-700 focus:outline-none focus:border-green-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-green-700 mb-2" htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-green-300 rounded-lg bg-green-50 text-green-700 focus:outline-none focus:border-green-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-green-700 mb-2" htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-green-300 rounded-lg bg-green-50 text-green-700 focus:outline-none focus:border-green-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-green-700 mb-2" htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-green-300 rounded-lg bg-green-50 text-green-700 focus:outline-none focus:border-green-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-green-700 mb-2" htmlFor="district">District</label>
                        <input
                            type="text"
                            id="district"
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-green-300 rounded-lg bg-green-50 text-green-700 focus:outline-none focus:border-green-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-green-700 mb-2" htmlFor="state">State</label>
                        <input
                            type="text"
                            id="state"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-green-300 rounded-lg bg-green-50 text-green-700 focus:outline-none focus:border-green-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors duration-300"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Already have an account? <a href="/login" className="text-green-600 hover:underline">Log In</a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
