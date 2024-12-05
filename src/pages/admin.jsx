import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AdminLogin = () => {
  const initialFormValue = {
    email: '',
    password: '',
  };
  const [form, setFormValue] = useState(initialFormValue);
  const navigate = useNavigate();

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
      const response = await fetch('https://api.cruiseconnect.in/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      // alert(response.status)
      if (response.status === 200) {
        const { token } = await response.json();
        localStorage.setItem('adminToken', token);
        navigate("/createcar")
        alert('Logged in successfully');
        setFormValue(initialFormValue);
      } else if (response.status === 404|| response.status ===401) {
        alert('Invalid email/password');
        setFormValue(initialFormValue);
      } else {
        alert('An unexpected error occurred');
        // alert(response.status)
        setFormValue(initialFormValue);
      }
    } catch (error) {
      alert('An error occurred');
      console.error('Error:', error);
      setFormValue(initialFormValue);
    }
  };

  return (
    <div>
      <Navbar />
      <section>
        <div className="container mt-5 pt-5">
          <div className="row">
            <div className="col-12 col-sm-7 col-md-6 m-auto">
              <div className="card border-0 shadow">
                <div className="card-body">
                  <h2 className="card-title"> ADMIN LOGIN</h2>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="email"
                      className="form-control my-4 py-2"
                      placeholder="Email"
                      onChange={handleInputChange}
                      value={form.email}
                    />
                    <input
                      type="password"
                      name="password"
                      className="form-control my-4 py-2"
                      placeholder="Password"
                      onChange={handleInputChange}
                      value={form.password}
                    />
                    <div className="text-center mt-3">
                      <button type="submit" className="btn btn-primary">
                        Login
                      </button>
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

export default AdminLogin;
