import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Cars = () => {
  const filters = { minPrice: 0, maxPrice: 0 };
  const [make, setMake] = useState([]);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState(filters);
  const [filtermake, setFiltermake] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Keep existing handleFilter, handleSearch, and fetchData functions
  // Add these functions inside the Cars component, before the return statement

const handleSearch = async () => {
  try {
    setIsLoading(true);
    const response = await fetch(`https://api.cruiseconnect.in/api/searchcars?name=${searchTerm}`);

    if (response.status === 200) {
      const jsonData = await response.json();
      setData(jsonData);
      // Update makes/brands list
      const brands = [...new Set(jsonData.map(car => car.make))];
      setMake(brands);
    } else {
      alert("No cars matching the search term");
    }
  } catch (error) {
    console.error("Error searching cars:", error);
    alert("Something went wrong!");
  } finally {
    setIsLoading(false);
  }
};

const handleFilter = async () => {
  try {
    setIsLoading(true);
    const response = await fetch(
      `https://api.cruiseconnect.in/api/filtercars?make=${filtermake}&model=${searchTerm}&minPrice=${filter.minPrice}&maxPrice=${filter.maxPrice}`
    );
    
    if (response.status === 200) {
      const jsonData = await response.json();
      setData(jsonData);
    } else {
      alert("No cars found matching the filters");
    }
  } catch (error) {
    console.error("Error filtering cars:", error);
    alert("Something went wrong!");
  } finally {
    setIsLoading(false);
  }
};

// Also update the fetchData function to include loading state:

const fetchData = async () => {
  try {
    setIsLoading(true);
    const response = await fetch("https://api.cruiseconnect.in/api/getcars");

    if (response.status === 200) {
      const jsonData = await response.json();
      setData(jsonData);
      const brands = [...new Set(jsonData.map(car => car.make))];
      setMake(brands);
    } else {
      alert("No cars available");
    }
  } catch (error) {
    console.error("Error fetching cars:", error);
  } finally {
    setIsLoading(false);
  }
};
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center h-64"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Available Cars</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16 relative z-10">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="relative">
              <input
                type="text"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Search by car name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="w-6 h-6 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
              onClick={handleSearch}
            >
              Search Cars
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filtermake}
                onChange={(e) => setFiltermake(e.target.value)}
              >
                <option value="">All Brands</option>
                {make.map((brand, index) => (
                  <option key={index} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
              <input
                type="number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filter.minPrice}
                onChange={(e) => setFilter({ ...filter, minPrice: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
              <input
                type="number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filter.maxPrice}
                onChange={(e) => setFilter({ ...filter, maxPrice: e.target.value })}
              />
            </div>
          </div>
          <button
            type="button"
            className="mt-6 w-full md:w-auto bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
            onClick={handleFilter}
          >
            Apply Filters
          </button>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((car) => (
            <div 
              key={car._id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <Link to={`/cars/${car._id}`}>
                <div className="relative">
                  <img
                    src={car.image}
                    className="w-full h-56 object-cover transform transition-transform duration-300 hover:scale-105"
                    alt={`${car.make} ${car.model}`}
                  />
                  <div className="absolute top-0 right-0 m-4 bg-blue-600 text-white px-3 py-1 rounded-full">
                    ${car.price}/day
                  </div>
                </div>
                <div className="p-6">
                  <h5 className="text-xl font-semibold mb-2">{`${car.make} ${car.model}`}</h5>
                  <div className="flex items-center mb-4">
                    <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600">{car.year}</span>
                  </div>
                  <p className="text-gray-600 line-clamp-2 mb-4">{car.description}</p>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
                    View Details
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* No Results */}
        {!isLoading && data.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No cars found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cars;