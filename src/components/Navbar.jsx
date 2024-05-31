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
    <nav className="bg-blue-200 p-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <NavLink className="flex items-center" to="/">
          <img className="cruise_connect_logo" src={logo} alt="logo" />
        </NavLink>

        <ul className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-0 sm:text-sm">
          <li className="nav-item"><NavLink className="nav-link p-2" to="/">Home</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link p-2" to="/cars">Cars</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link p-2" to="/about-us">About Us</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link p-2" to="/contact-us">Contact Us</NavLink></li>
        </ul>

        <div className="flex items-center mt-4 sm:mt-0">
          {userToken || adminToken ? (
            <button className="btn btn-danger ml-0 sm:ml-4" onClick={handleLogout}>Logout</button>
          ) : (
            <div className="flex flex-col sm:flex-row">
              <button className="btn btn-primary mb-2 sm:mb-0 sm:mr-4" onClick={() => navigate("/login")}>Login</button>
              <button className="btn btn-primary" onClick={() => navigate("/signup")}>Sign Up</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
