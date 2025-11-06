import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from './auth/LoginForm';
import RegisterForm from './auth/RegisterForm';
import './NavBar.css';

const NavBar: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeModal, setActiveModal] = useState<'login' | 'register' | 'loginRequired' | null>(null);

  const handleAddListingClick = () => {
    // Tymczasowo: każdy może dodać ogłoszenie
    window.location.href = '/dodaj-ogloszenie';
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>
          <Link to="/" aria-label="Przejdź do strony głównej">AutoTablica</Link>
        </h1>
      </div>
      
      <div className="navbar-menu">
        <div className="nav-buttons">
          <button className="btn-highlight" onClick={handleAddListingClick}>
            + Dodaj ogłoszenie
          </button>
          {!user ? (
            <>
              <button className="btn-primary" onClick={() => setActiveModal('login')}>
                Logowanie
              </button>
              <button className="btn-secondary" onClick={() => setActiveModal('register')}>
                Rejestracja
              </button>
            </>
          ) : (
            <button className="btn-secondary" onClick={logout}>
              Wyloguj się
            </button>
          )}
        </div>
      </div>

      {activeModal === 'login' && (
        <div className="modal">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setActiveModal(null)}>×</button>
            <LoginForm onSuccess={() => setActiveModal(null)} />
          </div>
        </div>
      )}

      {activeModal === 'register' && (
        <div className="modal">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setActiveModal(null)}>×</button>
            <RegisterForm onSuccess={() => setActiveModal(null)} />
          </div>
        </div>
      )}

      {activeModal === 'loginRequired' && null}
    </nav>
  );
};

export default NavBar;