import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentList from './pages/StudentList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentList />} />
      </Routes>
    </Router>
  );
}

export default App;