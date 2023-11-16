import React from 'react';
import Navbar from '../components/Navbar';
const AboutUs = () => {
  return (
    <div>
        <Navbar/>
        <div className="container mt-5">
        <h2>About Us</h2>
        <p>
            Welcome to XYZ Car Rentals, your go-to destination for quality car rentals. Our mission is to provide
            customers with a seamless and enjoyable experience while offering a diverse fleet of vehicles to meet
            your transportation needs.
        </p>
        <p>
            At XYZ Car Rentals, we prioritize customer satisfaction and safety. Our team is dedicated to delivering
            top-notch service and ensuring that your journey with us is memorable and stress-free.
        </p>
        </div>
    </div>
  );
};

export default AboutUs;
