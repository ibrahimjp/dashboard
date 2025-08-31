import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import dashboardApiService from '../../services/dashboardApiService';
import './UserProfile.css';

const UserProfile = () => {
  const { user, logout, updateUser } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      const response = await dashboardApiService.updateProfile(formData);
      if (response.success) {
        updateUser(response.data.user);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'DOCTOR':
        return '👨‍⚕️';
      case 'ADMIN':
        return '👨‍💼';
      default:
        return '👤';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'DOCTOR':
        return '#10B981'; // Green
      case 'ADMIN':
        return '#F59E0B'; // Yellow
      default:
        return '#3B82F6'; // Blue
    }
  };

  if (!user) return null;

  return (
    <div className="user-profile">
      <div 
        className="user-avatar" 
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        style={{ backgroundColor: getRoleColor(user.role) }}
      >
        <span className="role-icon">{getRoleIcon(user.role)}</span>
        <span className="user-name">{user.name}</span>
        <span className="dropdown-arrow">▼</span>
      </div>

      {isDropdownOpen && (
        <div className="user-dropdown">
          <div className="user-info">
            <div className="user-header">
              <div 
                className="profile-avatar"
                style={{ backgroundColor: getRoleColor(user.role) }}
              >
                {getRoleIcon(user.role)}
              </div>
              <div className="user-details">
                <h3>{user.name}</h3>
                <p className="user-role">{user.role}</p>
                <p className="user-email">{user.email}</p>
                {user.doctor && (
                  <div className="doctor-info">
                    <p className="specialty">
                      {user.doctor.specialties?.map(s => s.specialty.name).join(', ')}
                    </p>
                    <p className="price">
                      ₹{user.doctor.priceCents / 100}/consultation
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="dropdown-actions">
            <button 
              className="action-btn"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
            
            <button 
              className="action-btn"
              onClick={() => window.location.href = 'http://localhost:5173'}
            >
              Patient Portal
            </button>
            
            <button 
              className="action-btn logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

          {isEditing && (
            <div className="edit-form">
              <h4>Edit Profile</h4>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <button className="save-btn" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
