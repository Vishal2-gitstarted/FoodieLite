import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Sending form data to the backend
            const res = await axios.post(`http://localhost:8000/vip/add`, form);

            // Display success message from the backend
            toast.success(res?.data?.message || "Registration Successful!", {
                autoClose: 2000,
                position: "top-right",
            });

            // Reset the form data
            setForm({
                name: "",
                email: "",
                address: "",
                password: "",
            });

        } catch (error) {
            // Handle error response from the backend
            toast.error(error?.response?.data?.message || "Registration Failed!", {
                autoClose: 2000,
                position: "top-right",
            });
        }
    };

    return (
        <div className='register'>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input 
                        type="text" 
                        className="form-control form-control-lg" 
                        placeholder='Name'
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <input 
                        type="email" 
                        className="form-control form-control-lg" 
                        placeholder='Email'
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <input 
                        type="text" 
                        className="form-control form-control-lg" 
                        placeholder='Address'
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <input 
                        type="password" 
                        className="form-control form-control-lg" 
                        placeholder='Password'
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-lg">Submit</button>
            </form>
        </div>
    );
}
