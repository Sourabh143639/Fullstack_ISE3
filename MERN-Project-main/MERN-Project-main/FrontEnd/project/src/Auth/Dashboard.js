
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Dashboard = () => {
  const { token, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/auth/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data.user);
        } else {
          setError('Failed to fetch profile');
          logout();
          navigate('/login');
        }
      } catch (err) {
        setError(err.message);
        logout();
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, navigate, logout]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return <div className="auth-container"><div className="auth-card">Loading...</div></div>;
  }

  if (error) {
    return <div className="auth-container"><div className="auth-card error-message">{error}</div></div>;
  }

  return (
    <div className="auth-container">
      <div className="auth-card dashboard">
        <h2>Welcome to Dashboard</h2>
        {profile && (
          <div className="profile-info">
            <div className="profile-field">
              <label>Name:</label>
              <p>{profile.firstName} {profile.lastName}</p>
            </div>
            <div className="profile-field">
              <label>Email:</label>
              <p>{profile.email}</p>
            </div>
            <div className="profile-field">
              <label>Member Since:</label>
              <p>{new Date(profile.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        )}
        <button onClick={handleLogout} className="btn-logout">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
