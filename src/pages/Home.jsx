import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('https://api.cruiseconnect.in/api/getcarsHome');
        if (response.ok) {
          const data = await response.json();
          setCars(data);
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };
    fetchCars();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center h-screen"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              Your Journey Begins Here
            </h1>
            <p className="text-xl mb-8">
              Experience luxury and comfort with our premium car rental service
            </p>
            <Link
              to="/cars"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105"
            >
              Browse Cars
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Cars Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Cars</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <div 
              key={car._id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <img
                src={car.image}
                alt={`${car.make} ${car.model}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{`${car.make} ${car.model}`}</h3>
                <p className="text-gray-600 mb-4">{car.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">${car.price}/day</span>
                  <Link
                    to={`/cars/${car._id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="relative bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to hit the road?</h2>
          <p className="text-xl mb-8 opacity-90">Explore our premium selection of cars at affordable prices.</p>
          <Link
            to="/cars"
            className="inline-block bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-400">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">About Us</h3>
              <p>Your trusted partner in car rentals, providing quality service since 2024.</p>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/cars" className="hover:text-white transition duration-300">Our Cars</Link></li>
                <li><Link to="/about" className="hover:text-white transition duration-300">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition duration-300">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Contact Info</h3>
              <p>Electronic City, Bangalore</p>
              <p>Karnataka, India</p>
              <p>Email: info@cruiseconnect.com</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} Cruise Connect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;