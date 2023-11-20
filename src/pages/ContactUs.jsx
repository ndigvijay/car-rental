import React from 'react';
import Navbar from '../components/Navbar';
const ContactUs = () => {
  return (
    <div>
      <Navbar />
      <div className="container mt-5 contact_us_div">
        <div className="contact_us_text">
          <h2><b>Contact Us</b></h2>
          <br /><br />
          <p>If you have any questions, feedback, or inquiries, feel free to reach out to us. Our customer support team is available to assist you.</p>
          <br />
          <p>
            <b>Email : </b>info@xyzcarrentals.com
            <br />
            <b>Phone : </b>+1 (555) 123-4567
            <br /><br />
            <b>Cruise Connect Address :</b>
            <br />
            123 Main Street, Cityville, State, 12345
          </p>
        </div>
        <img className="about_us_image" src="https://cdn.pixabay.com/photo/2017/12/02/14/38/contact-us-2993000_640.jpg" alt="contact us image" />
      </div>
    </div>
  );
};

export default ContactUs;

