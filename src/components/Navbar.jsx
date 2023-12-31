import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const userToken = localStorage.getItem('userToken');
  const adminToken = localStorage.getItem('adminToken');

  const handleLogout = () => {
    // Remove userToken/adminToken from local storage
    localStorage.removeItem('userToken');
    localStorage.removeItem('adminToken');

    // Navigate to the login page or any other desired page after logout
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: 'lightblue' }}>
      <div className="container">
        <a className="navbar-brand" href="/"><img className='cruise_connect_logo' src={logo} alt="logo" /></a>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="/cars">Cars</a></li>
            <li className="nav-item"><a className="nav-link" href="/about-us">About Us</a></li>
            <li className="nav-item"><a className="nav-link" href="/contact-us">Contact Us</a></li>
          </ul>

          <div className="navbar-nav" style={{ marginLeft: 'auto' }}>
            {userToken || adminToken ? (
              <button className="btn btn-danger" style={{ marginLeft: '20px' }} onClick={handleLogout}>Logout</button>
            ) : (
              <>
                <button className="btn btn-primary" style={{ marginRight: '20px' }} onClick={() => navigate("/login")}>Login</button>
                <button className="btn btn-primary" onClick={() => navigate("/signup")}>Sign Up</button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
