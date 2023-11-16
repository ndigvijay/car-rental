import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const UpdateCar = () => {
  const initialFormData = {
    id: '',
    make: '',
    model: '',
    year: '',
    price: '',
    description: '',
    image: '',
  };

  const [searchID, setSearchID] = useState('');
  const [cars, setCars] = useState([]);
  const [formData, setFormData] = useState(initialFormData);

  const handleSearch = async () => {
    const response = await fetch(`http://localhost:4000/app/getcar/${searchID}`);

    if (response.ok) {
      const data = await response.json();
      if (data) {
        setCars([data]);
        setFormData({
          ...data,
          id: searchID,
        });
      } else {
        setCars([]);
        setFormData(initialFormData);
        alert('No car with ID ' + searchID + ' found');
      }
    } else {
      setCars([]);
      setFormData(initialFormData);
      alert('Error searching for car');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:4000/app/updatecar/${searchID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Car information updated successfully');
    } else {
      alert('Failed to update car information');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-center pb-4">Search and Edit Car Details</h1>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="id" className="form-label">
                Car ID:
              </label>
              <input
                type="text"
                className="form-control"
                id="id"
                value={searchID}
                onChange={(e) => setSearchID(e.target.value)}
              />
            </div>
            <button className="btn btn-primary mb-3" onClick={handleSearch}>
              Search
            </button>

            {cars.map((car) => (
              <div key={car._id}>
                <h1 className="text-center pt-2 font-weight-bold">Car Update</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div className="mb-3">
                    <label htmlFor="make" className="form-label">
                      Make:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="make"
                      name="make"
                      value={formData.make}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="model" className="form-label">
                      Model:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="model"
                      name="model"
                      value={formData.model}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="year" className="form-label">
                      Year:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="year"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                      Price:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description:
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                      Image URL:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-success">
                    Save Changes
                  </button>
                </form>
                {/* {formData} */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCar;
