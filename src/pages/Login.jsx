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
      const response = await fetch('https://cruise-connect-backend.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
  
      if (response.status === 200) {
        const data = await response.json();
        // console.log(data)
        localStorage.setItem('userToken', data.token);
        navigate('/');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.log('Error during login:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div
        className="flex-grow bg-cover bg-center relative"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-purple-900/80"></div>
        <div className="flex items-center justify-center min-h-full p-4 relative">
          <form
            onSubmit={handleSubmit}
            className="glass-card p-8 w-full max-w-md animate-fade-in-up"
          >
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 gradient-text">
                Welcome Back
              </h2>
              <p className="text-gray-600 mt-2">Login to your account</p>
            </div>
            
            <div className="mb-4">
              <label className="form-label">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="form-label">Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your password"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full btn-primary text-center"
            >
              Login
            </button>
            
            <p className="mt-6 text-center text-gray-600">
              Don't have an account?{' '}
              <a href="/signup" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-300">
                Register here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;