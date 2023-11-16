import React from 'react';
import Navbar from '../components/Navbar';
const ContactUs = () => {
  return (
    <div>
        <Navbar/>
        <div className="container mt-5">
        <h2>Contact Us</h2>
        <p>
            If you have any questions, feedback, or inquiries, feel free to reach out to us. Our customer support
            team is available to assist you.
        </p>
        <p>
            Contact Information:
            <br />
            Email: info@xyzcarrentals.com
            <br />
            Phone: +1 (555) 123-4567
        </p>
        <p>
            Visit us at our main office:
            <br />
            XYZ Car Rentals
            <br />
            123 Main Street, Cityville, State, 12345
        </p>
        </div>
    </div>
  );
};

export default ContactUs;
