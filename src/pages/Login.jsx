import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Login = () => {
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
      const response = await fetch('http://localhost:4000/app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
  
      if (response.status === 200) {
        const data = await response.json();
        const userToken = data.token;
  
        localStorage.setItem('userToken', userToken);
  
        alert('Logged in successfully');
        setFormValue(initialFormValue);
        navigate("/cars");
      } else if (response.status === 401 || response.status === 404) {
        alert('Invalid email/password');
        setFormValue(initialFormValue);
      } else {
        alert('An unexpected error occurred');
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
                  <h2 className="card-title">LOGIN</h2>
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
                      <a href="/signup" className="nav-link">
                        Don't have an account?
                      </a>
                      <a href="/admin" className="nav-link">
                        want to login as admin?
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

export default Login;
