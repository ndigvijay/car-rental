// Import necessary dependencies and components
import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const DeleteCar = () => {
  const [deleteID, setDeleteID] = useState('');
  const [message, setMessage] = useState('');

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/app/deletecar/${deleteID}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('Car deleted successfully');
      } else {
        setMessage('Failed to delete car');
      }
    } catch (error) {
      console.error('Error deleting car:', error);
      setMessage('Internal server error');
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
