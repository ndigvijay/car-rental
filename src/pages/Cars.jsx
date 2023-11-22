import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Cars = () => {
  const filters = {
      minPrice: 0,
    maxPrice: 0,
  };
  const intial_setmake=[]
  const intial_setdata=[]
  const [make, setMake] = useState(intial_setmake);
  const [data, setData] = useState(intial_setdata);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState(filters);
  const [filtermake,setFiltermake]=useState('');

  const handleFilter = async () => {
    try {
      const response = await fetch(`http://localhost:4000/app/filtercars?make=${filtermake}&model=${searchTerm}&minPrice=${filter.minPrice}&maxPrice=${filter.maxPrice}`);
      if(response.status===200){
        const jsonData = await response.json();
          setData(jsonData)
      }
      else{
        alert("no cars yo")
      }
    }
    catch(error) {
      console.log("ERROR: ", error);
    }
  }

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:4000/app/searchcars?name=${searchTerm}`);

      if (response.status === 200) {
        const jsonData = await response.json();
        setData(jsonData);

        const brands = [...new Set(jsonData.map(car => car.make))];
        setMake(brands);

      } else {
        alert("No cars matching the search term");
      }
    } catch (error) {
      alert("Something went wrong! ERROR:", error);
    }
  }

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:4000/app/getcars");

      if (response.status === 200) {
        const jsonData = await response.json();
        setData(jsonData);

        const brands = [...new Set(jsonData.map(car => car.make))];
        setMake(brands);
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

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2>Cars</h2>
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search by car name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleSearch}>
                Search
              </button>
            </div>

            <form>
              <div className="mb-3">
                <label htmlFor="brand" className="form-label">Filter by Brand:</label>
                <select
                  className="form-select"
                  id="brand"
                  value={filter.make}
                  onChange={(e) => setFilter({ ...filter, make: e.target.value })}
                >
                  <option value="">All Brands</option>
                  {make.map((brand, index) => (
                    <option key={index} value={brand} onChange={(e)=>setFiltermake(e.target.value)}>{brand}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="minPrice" className="form-label">Min Price:</label>
                <input
                  type="number"
                  className="form-control"
                  id="minPrice"
                  value={filter.minPrice}
                  onChange={(e) => setFilter({ ...filter, minPrice: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="maxPrice" className="form-label">Max Price:</label>
                <input
                  type="number"
                  className="form-control"
                  id="maxPrice"
                  value={filter.maxPrice}
                  onChange={(e) => setFilter({ ...filter, maxPrice: e.target.value })}
                />
              </div>

              <button type="button" className="btn btn-primary" onClick={handleFilter}>
                Apply Filters
              </button>
            </form>
          </div>
        </div>

        <div className="row">
          {data.map((car) => (
            <div key={car._id} className="col-md-4 mb-4">
              <Link to={`/cars/${car._id}`} style={{ textDecoration: 'none' }}>
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
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cars;
