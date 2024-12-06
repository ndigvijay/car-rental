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
      const response = await fetch('https://api.cruiseconnect.in/api/login', {
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
    <div className="h-[100vh] flex flex-col">
      <Navbar />
      <div
        className="flex-grow bg-cover bg-center"
        style={{ backgroundImage: 'url(/path-to-your-car-image.jpg)' }}
      >
        <div className="flex items-center justify-center h-full bg-gray-900 bg-opacity-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transform transition duration-500 hover:scale-105"
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Login to Your Account
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
            >
              Login
            </button>
            <p className="mt-4 text-center text-gray-600">
              Don't have an account?{' '}
              <a href="/register" className="text-blue-600 hover:underline">
                Register
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;