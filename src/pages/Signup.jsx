import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const initialFormValue = {
    email: '',
    password: '',
    confirm_password: '',
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

    if (form.password !== form.confirm_password) {
      alert("Password and Confirm Password do not match");
    } else {
      try {
        const response = await fetch('https://api.cruiseconnect.in/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        });

        if (response.status === 201) {
          alert('Registration successful! Please login.');
          navigate('/login');
        } else if (response.status === 400) {
          alert('User already exists');
        } else {
          alert('Registration failed');
        }
      } catch (error) {
        console.log('Error during registration:', error);
      }
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
              Create an Account
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
            <div className="mb-4">
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
            <div className="mb-6">
              <label className="block text-gray-700 mb-1">Confirm Password</label>
              <input
                name="confirm_password"
                type="password"
                value={form.confirm_password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Confirm your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition duration-200"
            >
              Sign Up
            </button>
            <p className="mt-4 text-center text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;