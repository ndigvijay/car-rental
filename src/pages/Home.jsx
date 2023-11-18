import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [cars, setCars] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchCars = async () => {
        try {
          const response = await fetch('http://localhost:4000/app/getcarsHome'); // replace with your actual backend URL
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
        <Navbar/>
        <div className="container mt-5">
            <div className="jumbotron">
            <h1 className="display-4">Welcome to Car Rentals</h1>
            <p className="lead">Rent a car for your next adventure!</p>
            <hr className="my-4" />
            <p>Explore our premium selection of cars at affordable prices.</p>
            <a href="/cars" className="btn btn-primary btn-lg">Browse Cars</a>
            </div>
    
            <div className="row">
            {cars.map((car) => (
                <div className="col-md-4" key={car._id}>
                <div className="card mb-4" onClick={() => navigate("/Rent")}>
                    <img src={car.image} className="card-img-top"style={{height:"280px",width:"auto"}} alt={car.model} />
                    <div className="card-body">
                    <h5 className="card-title">{car.make} {car.model}</h5>
                    <p className="card-text">Year: {car.year}</p>
                    <p className="card-text">Price: {car.price}</p>
                    <p className="card-text">{car.description}</p>
                    </div>
                </div>
                </div>
            ))}
            </div>
        </div>
      </div> 
    );
  };
  
  export default Home;
