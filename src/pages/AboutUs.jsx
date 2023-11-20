import React from 'react';
import Navbar from '../components/Navbar';
const AboutUs = () => {
  return (
    <div className='about_us_outer_div'>
      <Navbar />
      <div className='about_us_div'>
        <div className="container mt-5 about_us_text">
          <h2><b>About Us</b></h2>
          <br /><br />
          <p>Welcome to Cruise Connect, your go-to destination for quality car rentals. Our mission is to provide
            customers with a seamless and enjoyable experience while offering a diverse fleet of vehicles to meet
            your transportation needs.</p>
          <br />
          <p>At Cruise Connect, we prioritize customer satisfaction and safety. Our team is dedicated to delivering
            top-notch service and ensuring that your journey with us is memorable and stress-free.</p>
        </div>
        <img className="about_us_image" src="https://www.revv.co.in/blogs/wp-content/uploads/2020/09/Car-Rentals-in-India.jpg" alt="about us image" />
      </div>
    </div>
  );
};

export default AboutUs;
