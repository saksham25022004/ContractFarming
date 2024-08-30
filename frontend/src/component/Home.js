import React from 'react';

const Home = () => {
    return (
        <div className="min-h-screen bg-green-50 flex flex-col" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFybWluZyUyMHR5cGUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            {/* Navigation Bar */}
            <header className="bg-green-800 text-white py-4">
                <nav className="container mx-auto flex justify-between items-center px-6">
                    <div className="text-2xl font-bold">
                        <a href="/" className="hover:text-green-300 transition duration-300 ease-in-out">
                            KrishiMitr
                        </a>
                    </div>
                    <div className="space-x-4">
                        <a 
                            href="/login" 
                            className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-green-700 transition duration-300 ease-in-out"
                        >
                            Login
                        </a>
                        <a 
                            href="/signup" 
                            className="bg-brown-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-brown-700 transition duration-300 ease-in-out"
                        >
                            Sign Up
                        </a>
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex flex-col justify-center items-center p-6">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                    <h1 className="text-4xl font-bold text-green-800 mb-4">Welcome to the Assured Contract Farming System</h1>
                    <p className="text-lg text-gray-700 mb-8">Connecting Farmers and Buyers for Stable Market Access</p>
                </div>
            </main>

            {/* Contact Us Section */}
            <section className="bg-green-100 py-12">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold text-green-800 mb-4">Contact Us</h2>
                    <p className="text-lg text-gray-700 mb-8">
                        Have any questions or need support? Reach out to us!
                    </p>
                    <a 
                        href="mailto:prakhilkumar2745@gmail.com" 
                        className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-green-700 transition duration-300 ease-in-out"
                    >
                        Email Us
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Home;
