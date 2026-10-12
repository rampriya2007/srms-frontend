import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:8080/api/students';

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get(API).then(res => setStudents(res.data));
  }, []);

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h2>Student Records</h2>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ background: '#f0f0f0' }}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Roll Number</th>
            <th>Department</th>
            <th>Year</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;