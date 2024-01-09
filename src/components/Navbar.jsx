import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from "../logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const userToken = localStorage.getItem('userToken');
  const adminToken = localStorage.getItem('adminToken');
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('adminToken');
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: 'lightblue' }}>
      <div className="container">
        <NavLink className="navbar-brand" to="/"><img className='cruise_connect_logo' src={logo} alt="logo" /></NavLink>

        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/cars">Cars</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/about-us">About Us</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contact-us">Contact Us</NavLink></li>
          </ul>

          <div className="navbar-nav" style={{ marginLeft: 'auto' }}>
            {userToken || adminToken ? (
              <button className="btn btn-danger" style={{ marginLeft: '20px' }} onClick={handleLogout}>Logout</button>
            ) : (
              <div className="row">
                <div className="col-md-6 col-12">
                  <button className="btn btn-primary" style={{ marginRight: '20px' }} onClick={() => navigate("/login")}>Login</button>
                </div>
                <div className="col-md-6 col-12">
                  <button className="btn btn-primary" onClick={() => navigate("/signup")}>Sign Up</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
