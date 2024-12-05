import React, { useState, useEffect } from 'react';
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
        } else {
          console.error('Failed to fetch cars:', response.status);
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center flex-wrap md:flex-row text-xl md:text-2xl lg:text-4xl pt-12 md:pt-24 lg:pt-32 font-serif">
        <div>
          <h1>Welcome to Cruise Connect</h1>
          <p className="">Rent a car for your next adventure!</p>
          <hr className='border-t-2 border-gray-500' />
          <p>Explore our premium selection of cars at affordable prices.</p>
          <br />
          <br />
          <a href="/cars" className="bg-blue-500 hover:bg-blue-700 text-white font-sana  px-4 rounded">Browse Cars</a>
        </div>
          <img className='w-auto h-auto' src="https://imgd-ct.aeplcdn.com/370x231/n/cw/ec/48034/2-series-gran-coupe-exterior-right-front-three-quarter.jpeg?q=80" alt="car image" />

      </div>

      {/* Responsive Car Display */}
      {/* <div className="row">
        {cars.map((car) => (
          <div className="col-md-4 col-sm-6" key={car._id}>
            <div className="card mb-4">
              <img src={car.image} className="card-img-top" style={{ height: "280px", width: "auto" }} alt={car.model} />
              <div className="card-body">
                <h5 className="card-title">{car.make} {car.model}</h5>
                <p className="card-text">Year: {car.year}</p>
                <p className="card-text">Price: {car.price}</p>
                <p className="card-text">{car.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Home;
