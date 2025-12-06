import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoadingScreen from '../components/common/LoadingScreen';
import './Profile.css';

const Profile: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementacja aktualizacji profilu
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <h1>Mój Profil</h1>
      
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="profile-info">
            <h2>{user.name}</h2>
            <p className="profile-email">{user.email}</p>
            <p className="profile-member-since">
              Dołączył(a): {new Date(user.created_at || '').toLocaleDateString('pl-PL')}
            </p>
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label htmlFor="name">Imię i nazwisko</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="profile-actions">
              <button type="button" className="btn-secondary" onClick={() => setIsEditing(false)}>
                Anuluj
              </button>
              <button type="submit" className="btn-primary">
                Zapisz zmiany
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-actions">
            <button className="btn-primary" onClick={() => setIsEditing(true)}>
              Edytuj profil
            </button>
          </div>
        )}
      </div>
      
      <div className="profile-stats">
        <div className="stat-card">
          <h3>Aktywne ogłoszenia</h3>
          <p className="stat-value">0</p>
        </div>
        <div className="stat-card">
          <h3>Ulubione</h3>
          <p className="stat-value">0</p>
        </div>
        <div className="stat-card">
          <h3>Wyświetlenia</h3>
          <p className="stat-value">0</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;