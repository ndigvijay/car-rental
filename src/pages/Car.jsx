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
  const [minStartTime] = useState(new Date().toISOString().split('.')[0]);
  const [durationInDays, setDurationInDays] = useState(0);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const userToken = localStorage.getItem('userToken');
        if (!userToken) {
          navigate("/login");
        }

        const response = await fetch(`https://api.cruiseconnect.in/api/getcar/${carId}`, {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': userToken,
          },
        });

        if (response.status === 404 || response.status === 400) {
          alert("No car found");
        } else if (response.status === 200) {
          const carData = await response.json();
          setCar(carData);
        } else {
          alert("Login to rent cars");
          navigate("/login");
        }
      } catch (error) {
        console.log('Error fetching car details:', error);
      }
    };

    fetchCarDetails();
  }, [carId, navigate]);

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  useEffect(() => {
    if (startTime && endTime) {
      const startDateTime = new Date(startTime);
      const endDateTime = new Date(endTime);
      const calculatedDurationInDays = Math.ceil((endDateTime - startDateTime) / (1000 * 60 * 60 * 24));
      setDurationInDays(calculatedDurationInDays);
    }
  }, [startTime, endTime]);

  const onToken = () => {
    const price = parseInt(car.price, 10);
    const totalPrice = durationInDays * price;

    console.log(`Duration: ${durationInDays} days`);
    console.log(`Total Price: $${totalPrice}`);

    alert(`Payment receipt emailed ${startTime} - ${endTime}. Total Price: $${totalPrice}`);
    setStartTime(null);
    setEndTime(null); 
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-semibold mb-6">{`${car.make} ${car.model}`}</h2>
        <div className="flex flex-col md:flex-row md:items-start">
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <img
              src={car.image}
              alt={`${car.make} ${car.model}`}
              className="w-full h-auto rounded-lg shadow-md object-cover"
              style={{ maxHeight: '400px' }}
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-8">
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Year:</span> {car.year}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Price per day:</span> ${car.price}
            </p>
            <p className="text-gray-700 mb-4">{car.description}</p>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Start Time:</label>
              <input
                type="datetime-local"
                onChange={handleStartTimeChange}
                min={minStartTime}
                className="w-full border border-gray-300 px-3 py-2 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">End Time:</label>
              <input
                type="datetime-local"
                onChange={handleEndTimeChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md"
              />
            </div>
            <StripeCheckout
              stripeKey={API_KEY}
              token={onToken}
              name={`${car.make} ${car.model}`}
              amount={durationInDays * car.price * 100}
              currency="USD"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Car;