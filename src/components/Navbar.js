import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === '/login') return null;

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <nav style={{
      background: '#0D47A1', color: 'white', padding: '0 30px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px'
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '18px', cursor: 'pointer' }}
        onClick={() => navigate('/')}>
        SRMS
      </div>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <span onClick={() => navigate('/')}
          style={{ cursor: 'pointer', color: location.pathname === '/' ? '#90CAF9' : 'white' }}>
          Students
        </span>
        <span onClick={() => navigate('/marks')}
          style={{ cursor: 'pointer', color: location.pathname === '/marks' ? '#90CAF9' : 'white' }}>
          Marks
        </span>
        <button onClick={logout}
          style={{ padding: '6px 14px', background: '#dc3545', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;