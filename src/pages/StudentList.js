import API_BASE from '../config';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = `${API_BASE}/api/students`;

function StudentList() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const fetchStudents = () => {
    axios.get(API).then(res => setStudents(res.data));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Delete this student?')) {
      axios.delete(`${API}/${id}`).then(() => fetchStudents());
    }
  };

  return (
  <div className='page-container'>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
      <h2>Student Records</h2>
      <button onClick={() => navigate('/add-student')}
        style={{ padding: '8px 16px', background: '#2196F3', color: 'white', border: 'none', cursor: 'pointer' }}>
        + Add Student
      </button>
    </div>
    {students.length === 0 ? (
      <p style={{ color: '#888' }}>No students found. Add one to get started.</p>
    ) : (
      <table border="1" cellPadding="12" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Roll Number</th>
            <th>Department</th><th>Year</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id} style={{ background: 'white' }}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.rollNumber}</td>
              <td>{s.department}</td>
              <td>{s.year}</td>
              <td>
                <button onClick={() => navigate(`/edit-student/${s.id}`)}
                  style={{ marginRight: '8px', padding: '5px 10px', background: '#90CAF9',color:'white', border: 'none', cursor: 'pointer' }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(s.id)}
                  style={{ padding: '5px 10px', background: '#2196F3', color: 'white', border: 'none', cursor: 'pointer' }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);
}

export default StudentList;