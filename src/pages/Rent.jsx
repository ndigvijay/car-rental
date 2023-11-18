import { useState } from "react";
import Navbar from "../components/Navbar";
import { useLocation } from 'react-router-dom';

export default function Rent() {
    const init_form = {
        start_date: '',
        end_date: '',
        total_amount: 0,
    }
    const [form, setFormValue] = useState(init_form);

    const location = useLocation();
    const { state: {car} } = location;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({
            ...form,
            [name] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch('http://localhost:4000/app/rent', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
          });
    
          if (response.status === 200) {
            alert('Rented car successfully successfully');
            setFormValue(init_form);
          } else if (response.status === 401 || response.status === 404) {
            alert("Can't rent car");
            setFormValue(init_form);
          } else {
            // Display error message on the UI
            alert('An unexpected error occurred');
            setFormValue(init_form);
          }
        } catch (error) {
          // Display error message on the UI
          alert('An error occurred');
          console.error('Error:', error);
          setFormValue(init_form);
        }
    };

    return (
        <div>
            <Navbar />
            <form onSubmit={handleSubmit} style={{display: "inline-flex"}}>
            <div key={car._id} className="col-md-4 mb-4">
              <div className="card car-card">
                <img
                  src={car.image}
                  className="card-img-top cars-img"
                  alt={`${car.make} ${car.model}`}
                  style={{ height: "280px", width: "auto" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{`${car.make} ${car.model}`}</h5>
                  <p className="card-text">{`Year: ${car.year}`}</p>
                  <p className="card-text">{`Price: ${car.price}`}</p>
                  <p className="card-text">{`Description: ${car.description}`}</p>
                </div>
              </div>
            </div>
            <div style={{padding: "5rem"}}>
                <p>Enter the start date of the rental:</p>
                <input type="date" name="start_date" value={form.start_date} onChange={handleChange} />
                <p>Enter the end date of the rental:</p>
                <input type="date" name="end_date" value={form.end_date} onChange={handleChange} />
            </div>
            </form>
        </div>
    );
}
