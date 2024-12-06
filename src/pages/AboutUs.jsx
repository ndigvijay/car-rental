import React from 'react';
import Navbar from '../components/Navbar';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center py-20"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")'
        }}
      >
        <div className="container mx-auto px-4 text-white text-center relative">
          <div className="absolute inset-0 bg-black bg-opacity-60 -mx-4"></div>
          <div className="relative z-10">
            <h2 className="text-5xl font-bold mb-4">About Us</h2>
            <p className="text-xl mb-6 max-w-2xl mx-auto">
              Welcome to Cruise Connect, your premier destination for quality car rentals. Our mission is to provide
              customers with a seamless and enjoyable experience while offering a diverse fleet of vehicles to meet your
              transportation needs.
            </p>
            <a
              href="/cars"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded transition duration-300"
            >
              Explore Our Fleet
            </a>
          </div>
        </div>
      </div>

      {/* Our Services Section */}
      <div className="container mx-auto px-4 py-12">
        <h3 className="text-3xl font-semibold text-center mb-8">Why Choose Us</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/2947/2947008.png" 
              alt="Wide Selection" 
              className="w-16 h-16 mx-auto mb-4" 
            />
            <h4 className="text-xl font-medium mb-2">Wide Selection</h4>
            <p className="text-gray-600">
              Choose from a vast array of vehicles to suit your travel needs and preferences.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/2534/2534204.png" 
              alt="Affordable Prices" 
              className="w-16 h-16 mx-auto mb-4" 
            />
            <h4 className="text-xl font-medium mb-2">Affordable Prices</h4>
            <p className="text-gray-600">
              Enjoy competitive pricing and great deals on all our car rentals.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/1067/1067566.png" 
              alt="Excellent Support" 
              className="w-16 h-16 mx-auto mb-4" 
            />
            <h4 className="text-xl font-medium mb-2">Excellent Support</h4>
            <p className="text-gray-600">
              Our customer support team is here to assist you 24/7 with any inquiries.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-semibold text-center mb-8">Meet Our Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
              <img
                // src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="Team Member 1"
                className="w-32 h-32 rounded-full mb-4 object-cover"
              />
              <h4 className="text-xl font-medium">N DIGVIJAY</h4>
              <p className="text-gray-600"></p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
              <img
                // src="https://randomuser.me/api/portraits/women/1.jpg"
                alt="Team Member 2"
                className="w-32 h-32 rounded-full mb-4 object-cover"
              />
              <h4 className="text-xl font-medium">NIHAL TM</h4>
              <p className="text-gray-600"></p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
              <img
                // src="https://randomuser.me/api/portraits/men/2.jpg"
                alt="Team Member 3"
                className="w-32 h-32 rounded-full mb-4 object-cover"
              />
              <h4 className="text-xl font-medium">NISHANTH D'MELLO</h4>
              <p className="text-gray-600"></p>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the components remain unchanged */}
    </div>
  );
};

export default AboutUs;