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
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-purple-900/70 to-blue-800/80"></div>
        <div className="container mx-auto px-4 text-white text-center relative">
          <div className="relative z-10 animate-fade-in-up">
            <h2 className="text-5xl font-bold mb-4 text-shadow gradient-text">About Us</h2>
            <p className="text-xl mb-6 max-w-2xl mx-auto leading-relaxed opacity-90">
              Welcome to Cruise Connect, your premier destination for quality car rentals. Our mission is to provide
              customers with a seamless and enjoyable experience while offering a diverse fleet of vehicles to meet your
              transportation needs.
            </p>
            <a
              href="/cars"
              className="btn-primary hover-lift"
            >
              Explore Our Fleet
            </a>
          </div>
        </div>
      </div>

      {/* Our Services Section */}
      <div className="container mx-auto px-4 py-16">
        <h3 className="text-4xl font-semibold text-center mb-4 gradient-text">Why Choose Us</h3>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Discover what makes us the preferred choice for car rentals
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-animation">
          <div className="glass-card p-8 text-center hover-lift">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-3 gradient-text">Wide Selection</h4>
            <p className="text-gray-600 leading-relaxed">
              Choose from a vast array of vehicles to suit your travel needs and preferences.
            </p>
          </div>
          <div className="glass-card p-8 text-center hover-lift">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-3 gradient-text">Affordable Prices</h4>
            <p className="text-gray-600 leading-relaxed">
              Enjoy competitive pricing and great deals on all our car rentals.
            </p>
          </div>
          <div className="glass-card p-8 text-center hover-lift">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-3 gradient-text">Excellent Support</h4>
            <p className="text-gray-600 leading-relaxed">
              Our customer support team is here to assist you 24/7 with any inquiries.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-semibold text-center mb-4 gradient-text">Meet Our Team</h3>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            The passionate individuals behind your exceptional car rental experience
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-animation">
            <div className="glass-card p-8 flex flex-col items-center hover-lift">
              <div className="w-32 h-32 rounded-full mb-6 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">DN</span>
              </div>
              <h4 className="text-xl font-semibold gradient-text mb-2">N DIGVIJAY</h4>
              <p className="text-gray-600 text-center">Co-Founder & CEO</p>
            </div>
            <div className="glass-card p-8 flex flex-col items-center hover-lift">
              <div className="w-32 h-32 rounded-full mb-6 bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">NT</span>
              </div>
              <h4 className="text-xl font-semibold gradient-text mb-2">NIHAL TM</h4>
              <p className="text-gray-600 text-center">Co-Founder & CTO</p>
            </div>
            <div className="glass-card p-8 flex flex-col items-center hover-lift">
              <div className="w-32 h-32 rounded-full mb-6 bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">ND</span>
              </div>
              <h4 className="text-xl font-semibold gradient-text mb-2">NISHANTH D'MELLO</h4>
              <p className="text-gray-600 text-center">Co-Founder & COO</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the components remain unchanged */}
    </div>
  );
};

export default AboutUs;