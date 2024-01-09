import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const Home = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('https://car-rental-sfqr.onrender.com/app/getcarsHome');
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
      <div className="home_page_div">
        <div>
          <h1>Welcome to Cruise Connect</h1>
          <p className="lead">Rent a car for your next adventure!</p>
          <hr />
          <p>Explore our premium selection of cars at affordable prices.</p>
          <br />
          <br />
          <a href="/cars" className="btn btn-primary btn-lg">Browse Cars</a>
        </div>

        <div>
          <img className='home_img' src="https://pngimg.com/d/bmw_PNG1710.png" alt="car image" />
          <div className="home_page_inner_div"></div>
        </div>
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
