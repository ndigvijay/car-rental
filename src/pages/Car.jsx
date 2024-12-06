import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StripeCheckout from 'react-stripe-checkout';

const Car = () => {
  const [car, setCar] = useState({});
  const [isLoading, setIsLoading] = useState(true);
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
          setIsLoading(false);
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
      
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <div className="relative h-96 bg-gray-900">
            <img
              src={car.image}
              alt={`${car.make} ${car.model}`}
              className="w-full h-full object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="container mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {`${car.make} ${car.model}`}
                </h1>
                <p className="text-gray-300 text-xl">{car.year}</p>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-12">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                {/* Car Details */}
                <div className="w-full lg:w-2/3 p-8">
                  <div className="prose max-w-none">
                    <h2 className="text-3xl font-semibold mb-6">Car Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">Make & Model</h3>
                          <p className="text-gray-600">{`${car.make} ${car.model}`}</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">Year</h3>
                          <p className="text-gray-600">{car.year}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">Price per day</h3>
                          <p className="text-2xl font-bold text-blue-600">${car.price}</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">Description</h3>
                          <p className="text-gray-600">{car.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Booking Form */}
                <div className="w-full lg:w-1/3 bg-gray-50 p-8 border-l">
                  <h3 className="text-2xl font-semibold mb-6">Book Now</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                      <input
                        type="datetime-local"
                        onChange={handleStartTimeChange}
                        min={minStartTime}
                        className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                      <input
                        type="datetime-local"
                        onChange={handleEndTimeChange}
                        className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                    {durationInDays > 0 && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-600 font-medium">Duration: {durationInDays} days</p>
                        <p className="text-lg font-bold text-blue-900">
                          Total: ${durationInDays * car.price}
                        </p>
                      </div>
                    )}
                    <div className="pt-4">
                      <StripeCheckout
                        stripeKey={API_KEY}
                        token={onToken}
                        name={`${car.make} ${car.model}`}
                        amount={durationInDays * car.price * 100}
                        currency="USD"
                        className="w-full"
                        buttonClassName="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Car;