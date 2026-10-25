import API_BASE from '../config';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_BASE}/api/auth/login`, form)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('email', res.data.email);
        navigate('/');
      })
      .catch(() => setError('Invalid email or password'));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'Arial' }}>
      <div style={{ padding: '40px', border: '1px solid #ddd', borderRadius: '8px', width: '350px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '25px' }}>SRMS Login</h2>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label>Email</label><br />
            <input name="email" type="email" value={form.email} onChange={handleChange}
              style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Password</label><br />
            <input name="password" type="password" value={form.password} onChange={handleChange}
              style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }} />
          </div>
          <button type="submit"
            style={{ width: '100%', padding: '10px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;