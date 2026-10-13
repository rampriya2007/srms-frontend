import React, { useEffect, useState } from 'react';
import axios from 'axios';

const STUDENTS_API = 'http://localhost:8080/api/students';
const SUBJECTS_API = 'http://localhost:8080/api/subjects';
const MARKS_API = 'http://localhost:8080/api/marks';

function MarksEntry() {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [marks, setMarks] = useState({});
  const [savedMarks, setSavedMarks] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(STUDENTS_API).then(res => setStudents(res.data));
    axios.get(SUBJECTS_API).then(res => setSubjects(res.data));
  }, []);

  useEffect(() => {
    if (selectedStudent) {
      axios.get(`${MARKS_API}/student/${selectedStudent}`)
        .then(res => setSavedMarks(res.data));
    }
  }, [selectedStudent]);

  const handleMarksChange = (subjectId, value) => {
    setMarks({ ...marks, [subjectId]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      for (const subjectId of Object.keys(marks)) {
        await axios.post(MARKS_API, {
          student: { id: selectedStudent },
          subject: { id: subjectId },
          marksObtained: parseInt(marks[subjectId])
        });
      }
      setMessage('Marks saved successfully');
      axios.get(`${MARKS_API}/student/${selectedStudent}`)
        .then(res => setSavedMarks(res.data));
    } catch {
      setMessage('Failed to save marks');
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h2>Marks Entry</h2>

      <div style={{ marginBottom: '20px' }}>
        <label>Select Student: </label>
        <select value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)}
          style={{ padding: '8px', marginLeft: '10px' }}>
          <option value="">-- Select --</option>
          {students.map(s => (
            <option key={s.id} value={s.id}>{s.name} ({s.rollNumber})</option>
          ))}
        </select>
      </div>

      {selectedStudent && (
        <form onSubmit={handleSubmit}>
          <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', marginBottom: '15px' }}>
            <thead style={{ background: '#f0f0f0' }}>
              <tr><th>Subject</th><th>Marks (out of 100)</th></tr>
            </thead>
            <tbody>
              {subjects.map(sub => (
                <tr key={sub.id}>
                  <td>{sub.name}</td>
                  <td>
                    <input type="number" min="0" max="100"
                      value={marks[sub.id] || ''}
                      onChange={e => handleMarksChange(sub.id, e.target.value)}
                      style={{ padding: '5px', width: '80px' }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="submit"
            style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
            Save Marks
          </button>
        </form>
      )}

      {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}

      {savedMarks.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h3>Saved Results</h3>
          <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f0f0f0' }}>
              <tr><th>Subject</th><th>Marks</th><th>Grade</th><th>Result</th></tr>
            </thead>
            <tbody>
              {savedMarks.map(m => (
                <tr key={m.id}>
                  <td>{m.subject.name}</td>
                  <td>{m.marksObtained}</td>
                  <td>{m.grade}</td>
                  <td style={{ color: m.result === 'Pass' ? 'green' : 'red' }}>{m.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MarksEntry;