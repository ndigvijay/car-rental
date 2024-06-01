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
      const response = await fetch('https://car-rental-sfqr.onrender.com/app/login', {
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
        <div className="container mx-auto mt-5 pt-5">
          <div className="flex flex-col justify-center items-center mt-20">
            <div className="w-full max-w-sm">
              <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-center text-2xl font-bold mb-6">LOGIN</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <input
                      type="text"
                      name="email"
                      className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                      placeholder="Email"
                      onChange={handleInputChange}
                      value={form.email}
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      name="password"
                      className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                      placeholder="Password"
                      onChange={handleInputChange}
                      value={form.password}
                    />
                  </div>
                  <div className="text-center mt-4">
                    <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
                      Login
                    </button>
                    <div className="mt-4">
                      <a href="/signup" className="text-blue-500 hover:underline">
                        Don't have an account?
                      </a>
                    </div>
                    <div className="mt-2">
                      <a href="/admin" className="text-blue-500 hover:underline">
                        Want to login as admin?
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
