// Import necessary dependencies and components
import React, { useState,useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';


const DeleteCar = () => {
  const [deleteID, setDeleteID] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate("/admin");
        return; 
      }

      const response = await fetch(`https://car-rental-sfqr.onrender.com/app/deletecar/${deleteID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
      });

      if (response.ok) {
        alert('Car deleted successfully');
      } else {
        alert('Failed to delete car');
      }
    } catch (error) {
      console.error('Error deleting car:', error);
      alert('Internal server error');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-center pb-4">Delete Car</h1>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="deleteID" className="form-label">
                Car ID:
              </label>
              <input
                type="text"
                className="form-control"
                id="deleteID"
                value={deleteID}
                onChange={(e) => setDeleteID(e.target.value)}
              />
            </div>
            <button className="btn btn-danger mb-3" onClick={handleDelete}>
              Delete
            </button>
            <p className={message.includes('success') ? 'text-success' : 'text-danger'}>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCar;
