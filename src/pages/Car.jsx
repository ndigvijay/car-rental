import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Car = () => {
  const [car, setCar] = useState({});
  const { carId } = useParams();

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/app/getcar/${carId}`);

        if (response.status === 200) {
          const carData = await response.json();
          setCar(carData);
        } else {
          alert('Car not found');
        }
      } catch (error) {
        console.log('Error fetching car details:', error);
      }
    };

    fetchCarDetails();
  }, [carId]);

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2>{`${car.make} ${car.model}`}</h2>
        <div className="row">
          <div className="col-md-5">
            <div className="card car-card">
              <img
                src={car.image}
                className="card-img-top cars-img"
                alt={`${car.make} ${car.model}`}
                style={{ height: '280px', width: 'auto' }}
              />
              <div className="card-body">
                <p className="card-text">{`Year: ${car.year}`}</p>
                <p className="card-text">{`Price: ${car.price}`}</p>
                <p className="card-text">{`Description: ${car.description}`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Car;
