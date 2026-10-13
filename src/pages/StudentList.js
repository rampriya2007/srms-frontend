import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = 'http://localhost:8080/api/students';

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
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h2>Student Records</h2>
      <button onClick={() => { localStorage.removeItem('token'); window.location.href='/login'; }}
        style={{ float: 'right', padding: '8px 16px', background: '#dc3545', color: 'white', border: 'none', cursor: 'pointer' }}>
        Logout
      </button>
      <button onClick={() => navigate('/add-student')}
        style={{ marginBottom: '15px', padding: '8px 16px', background: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>
        + Add Student
      </button>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ background: '#f0f0f0' }}>
          <tr>
            <th>ID</th><th>Name</th><th>Roll Number</th>
            <th>Department</th><th>Year</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.rollNumber}</td>
              <td>{s.department}</td>
              <td>{s.year}</td>
              <td>
                <button onClick={() => navigate('/marks')}
                  style={{ marginBottom: '15px', marginLeft: '10px', padding: '8px 16px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
                  Enter Marks
                </button>
                <button onClick={() => navigate(`/edit-student/${s.id}`)}
                  style={{ marginRight: '8px', padding: '5px 10px', background: '#ffc107', border: 'none', cursor: 'pointer' }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(s.id)}
                  style={{ padding: '5px 10px', background: '#dc3545', color: 'white', border: 'none', cursor: 'pointer' }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;