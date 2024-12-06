import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from "../logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const userToken = localStorage.getItem('userToken');
  const adminToken = localStorage.getItem('adminToken');

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('adminToken');
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <NavLink to="/" className="flex items-center">
          <img src={logo} alt="Cruise Connect" className="h-8 w-auto mr-2"/>
          <span className="text-white font-bold text-xl">Cruise Connect</span>
        </NavLink>
        <div className="hidden md:flex space-x-6">
          <NavLink
            to="/"
            className="text-gray-300 hover:text-white transition duration-200"
            activeClassName="text-white"
            exact
          >
            Home
          </NavLink>
          <NavLink
            to="/cars"
            className="text-gray-300 hover:text-white transition duration-200"
            activeClassName="text-white"
          >
            Cars
          </NavLink>
          <NavLink
            to="/about-us"
            className="text-gray-300 hover:text-white transition duration-200"
            activeClassName="text-white"
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact-us"
            className="text-gray-300 hover:text-white transition duration-200"
            activeClassName="text-white"
          >
            Contact Us
          </NavLink>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          {userToken || adminToken ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          {/* Implement mobile menu button */}
        </div>
      </div>
      {/* Mobile Menu */}
      <div className="md:hidden">
        <ul className="px-4 pt-2 pb-4 space-y-1 bg-gray-800">
          <li>
            <NavLink
              to="/"
              className="block text-gray-300 hover:text-white transition duration-200"
              activeClassName="text-white"
              exact
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cars"
              className="block text-gray-300 hover:text-white transition duration-200"
              activeClassName="text-white"
            >
              Cars
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about-us"
              className="block text-gray-300 hover:text-white transition duration-200"
              activeClassName="text-white"
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact-us"
              className="block text-gray-300 hover:text-white transition duration-200"
              activeClassName="text-white"
            >
              Contact Us
            </NavLink>
          </li>
          {userToken || adminToken ? (
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <NavLink
                  to="/login"
                  className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/signup"
                  className="block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;