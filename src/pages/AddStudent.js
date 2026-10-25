import API_BASE from '../config';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import API_BASE from '../config';
const API = `${API_BASE}/api/students`;


function AddStudent() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', rollNumber: '', department: '', year: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.rollNumber || !form.department || !form.year) {
      setError('All fields are required');
      return;
    }
    axios.post(API, form)
      .then(() => navigate('/'))
      .catch(() => setError('Failed to add student'));
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial', maxWidth: '500px' }}>
      <h2>Add Student</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Name</label><br />
          <input name="name" value={form.name} onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Roll Number</label><br />
          <input name="rollNumber" value={form.rollNumber} onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Department</label><br />
          <input name="department" value={form.department} onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Year</label><br />
          <input name="year" type="number" value={form.year} onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        </div>
        <button type="submit"
          style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
          Add Student
        </button>
      </form>
    </div>
  );
}

export default AddStudent;