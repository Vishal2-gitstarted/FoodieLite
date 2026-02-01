import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8000/vip/login`, {
        email,
        password,
      });

      // Save token or user data in localStorage
      localStorage.setItem('user', email.email); 
      localStorage.setItem('token', JSON.token); 

      toast.success(res.data.message, {
        autoClose: 2000,
        position: 'top-right',
      });

      // Redirect to home after login
      navigate('/');

    } catch (error) {
      toast.error(error?.response?.data?.message || "Login Failed!", {
        autoClose: 2000,
        position: "top-right",
      });
    }
  };

  return (
    <div className='login'>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="email"
            className="form-control form-control-lg"
            placeholder='Email'
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div id="emailHelp" className="form-text" style={{ color: 'white' }}>
            We’ll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-4">
          <input
            type="password"
            className="form-control form-control-lg"
            placeholder='Password'
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-lg">Login</button>
      </form>
    </div>
  );
}

export default Login;
