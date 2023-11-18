import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from 'react-router-dom';

const Cars = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:4000/app/getcars");

      if (response.status === 200) {
        const jsonData = await response.json();
        setData(jsonData);
      } else {
        alert("No cars available");
      }
    } catch (error) {
      console.log("Error fetching cars:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCardClick = (car) => {
    // Navigate to Rent component and pass car data as state
    navigate("/Rent", { state: { car } });
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2>Cars</h2>
        <div className="row">
          {data.map((car) => (
            <div key={car._id} className="col-md-4 mb-4" onClick={() => handleCardClick(car)}>
              <div className="card car-card">
                <img
                  src={car.image}
                  className="card-img-top cars-img"
                  alt={`${car.make} ${car.model}`}
                  style={{ height: "280px", width: "auto" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{`${car.make} ${car.model}`}</h5>
                  <p className="card-text">{`Year: ${car.year}`}</p>
                  <p className="card-text">{`Price: ${car.price}`}</p>
                  <p className="card-text">{`Description: ${car.description}`}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cars;
