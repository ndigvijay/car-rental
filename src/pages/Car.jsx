import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StripeCheckout from 'react-stripe-checkout';

const Car = () => {
  const [car, setCar] = useState({});
  const { carId } = useParams();
  const API_KEY = "pk_test_51OEB84SIizVdAshZP3PTiQGR0HKc8mfpxgdJkcAulx578qiw61DqPa2BkTK8UjeROuWVHWeONYI0UZGwr1AH5Ese00uYDj1N7M";
  const navigate = useNavigate();

  const [startTime, setStartTime] = useState(null);

  const [endTime, setEndTime] = useState(null);
  const [minStartTime, setMinStartTime] = useState(new Date().toISOString().split('.')[0]);
  const [durationInDays, setDurationInDays] = useState(0);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const userToken = localStorage.getItem('userToken');
        if (!userToken) {
          navigate("/login");
        }

        const response = await fetch(`http://64.227.147.171:4000/api/getcar/${carId}`, {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': userToken,
          },
        });

        if (response.status === 404 || response.status === 400) {
          alert("no car found");
        } else if (response.status === 200) {
          const carData = await response.json();
          setCar(carData);
        } else {
          alert("login to rent cars");
          navigate("/login");
        }
      } catch (error) {
        console.log('Error fetching car details:', error);
      }
    };

    fetchCarDetails();
  }, [carId]);

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  useEffect(() => {
    // Recalculate durationInDays whenever startTime or endTime changes
    if (startTime && endTime) {
      const startDateTime = new Date(startTime);
      const endDateTime = new Date(endTime);
      const calculatedDurationInDays = Math.ceil((endDateTime - startDateTime) / (1000 * 60 * 60 * 24));
      setDurationInDays(calculatedDurationInDays);
      // alert(durationInDays);
    }
  }, [startTime, endTime]);

  const onToken = () => {
    // Use the calculated durationInDays in your onToken function
    const price = parseInt(car.price, 10);
    const totalPrice = durationInDays * price;

    console.log(`Duration: ${durationInDays} days`);
    console.log(`Total Price: $${totalPrice}`);

    alert(`Payment receipt emailed  ${startTime} - ${endTime}. Total Price: $${totalPrice}`);
    setStartTime(null);
    setEndTime(null); 
  };

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
                <p className="card-text">Start Time: <input type="datetime-local" onChange={handleStartTimeChange} min={minStartTime} /></p>
                <p className="card-text">End Time: <input type="datetime-local" onChange={handleEndTimeChange} /></p>
                <p className="card-text">
                  <StripeCheckout stripeKey={API_KEY} token={() => onToken()} />
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
