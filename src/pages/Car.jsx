import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StripeCheckout from 'react-stripe-checkout';

const Car = () => {
  const [car, setCar] = useState({});
  const { carId } = useParams();
  const API_KEY="pk_test_51OEB84SIizVdAshZP3PTiQGR0HKc8mfpxgdJkcAulx578qiw61DqPa2BkTK8UjeROuWVHWeONYI0UZGwr1AH5Ese00uYDj1N7M"

  const onToken=(token)=>{
    console.log(token)
    alert("Payment receipt emailed to " + JSON.stringify(token.email));
  }
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
                <p className="card-text">
                  <StripeCheckout stripeKey={API_KEY} token={onToken}/>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Car;
