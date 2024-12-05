import React, { useState,useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const CreateCars = () => {
  const initialFormValue = {
    make:'',
    model:'',
    year:'',
    price:0,
    description:'',
    image:'',
  };
  const [form, setFormValue] = useState(initialFormValue);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('adminToken');
      if(!token){
        navigate("/admin");
        return;
      }
      const response = await fetch('http://64.227.147.171:4000/api/createcar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify(form),
      });

      if (response.status === 200) {
        alert('car added succesfully');
        setFormValue(initialFormValue);
      } else if ( response.status === 404) {
        alert(' else if An error occured');
        setFormValue(initialFormValue);
      } else {
        // Display error message on the UI
        alert('An unexpected error occurred');
        setFormValue(initialFormValue);
      }
    } catch (error) {
      // Display error message on the UI
      alert('catch An error occurred');
      console.error('Error:', error);
      setFormValue(initialFormValue);
    }
  };

  return (
    <div>
      <Navbar />
      <section>
        <div className="container mt-4 pt-4">
          <div className="row">
            <div className="col-12 col-sm-7 col-md-6 m-auto">
              <div className="card border-0 shadow">
                <div className="card-body">
                  <h2 className="card-title">ADD CARS</h2>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="make"
                      className="form-control my-4 py-2"
                      placeholder="make"
                      onChange={handleInputChange}
                      value={form.make}
                    />
                    <input
                      type="text"
                      name="model"
                      className="form-control my-4 py-2"
                      placeholder="model"
                      onChange={handleInputChange}
                      value={form.model}
                    />
                    <input
                      type="text"
                      name="year"
                      className="form-control my-4 py-2"
                      placeholder="year"
                      onChange={handleInputChange}
                      value={form.year}
                    />
                    <input
                      type="text"
                      name="price"
                      className="form-control my-4 py-2"
                      placeholder="price"
                      onChange={handleInputChange}
                      value={form.price}
                    />
                    <input
                      type="text"
                      name="description"
                      className="form-control my-4 py-2"
                      placeholder="description"
                      onChange={handleInputChange}
                      value={form.description}
                    />
                    <input
                      type="text"
                      name="image"
                      className="form-control my-4 py-2"
                      placeholder="Enter Image Url"
                      onChange={handleInputChange}
                      value={form.image}
                    />
                    <div className="text-center mt-3">
                      <button type="submit" className="btn btn-danger">
                        Add car
                      </button>
                      <a href="/updatecar" className="nav-link">
                        Update A Car!
                      </a>
                      <a href="/deletecar" className="nav-link">
                        delete A Car!
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateCars;
