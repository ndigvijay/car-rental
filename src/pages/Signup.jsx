import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const initialFormValue = {
        email: '',
        password: '',
        confirm_password: '',
    };
    const [form, setFormValue] = useState(initialFormValue);
    const navigate = useNavigate();


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValue({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirm_password) {
            alert("Password and Confirm Password do not match");
        } else {
            try {
                const response = await fetch('http://localhost:4000/app/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form),
                });

                if (response.status === 200) {
                    alert("Signup successful");
                    setFormValue(initialFormValue);
                    const data = await response.json();
                    console.log(data);
                    navigate("/login")
                } else if (response.status === 404) {
                    alert("User already exists");
                    setFormValue(initialFormValue);
                    navigate("/login")
                } else {
                    alert("An unexpected error occurred");
                    setFormValue(initialFormValue);
                   
                }
            } catch (error) {
                alert("An error occurred");
                console.error("Error:", error);
                setFormValue(initialFormValue);
            
            }
        }
    };

    return (
        <div>
            <Navbar />
            <section>
                <div className="container mt-5 pt-5">
                    <div className="row">
                        <div className="col-12 col-sm-7 col-md-6 m-auto">
                            <div className="card border-0 shadow">
                                <div className="card-body">
                                    <h2 className="card-title">SIGNUP</h2>
                                    <form onSubmit={handleSubmit}>
                                        <input
                                            type="text"
                                            name="email"
                                            className="form-control my-4 py-2"
                                            placeholder="Email"
                                            onChange={handleInputChange}
                                            value={form.email}
                                        />
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control my-4 py-2"
                                            placeholder="Password"
                                            onChange={handleInputChange}
                                            value={form.password}
                                        />
                                        <input
                                            type="password"
                                            name="confirm_password"
                                            className="form-control my-4 py-2"
                                            placeholder="Confirm Password"
                                            onChange={handleInputChange}
                                            value={form.confirm_password}
                                        />
                                        <div className="text-center mt-3">
                                            <button type="submit" className="btn btn-primary">SIGNUP</button>
                                            <a href="/login" className="nav-link">Already have an account?</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Signup;
