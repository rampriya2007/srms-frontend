import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentList from './pages/StudentList';
import AddStudent from './pages/AddStudent';
import EditStudent from './pages/EditStudent';
import MarksEntry from './pages/MarksEntry';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><StudentList /></ProtectedRoute>} />
        <Route path="/add-student" element={<ProtectedRoute><AddStudent /></ProtectedRoute>} />
        <Route path="/edit-student/:id" element={<ProtectedRoute><EditStudent /></ProtectedRoute>} />
        <Route path="/marks" element={<ProtectedRoute><MarksEntry /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;