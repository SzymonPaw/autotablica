import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from './auth/LoginForm';
import RegisterForm from './auth/RegisterForm';
import './NavBar.css';
import { REQUIRE_AUTH_EVENT } from '../constants/events';

const NavBar: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeModal, setActiveModal] = useState<'login' | 'register' | 'loginRequired' | null>(null);

  const handleAddListingClick = () => {
    // Tymczasowo: każdy może dodać ogłoszenie
    window.location.href = '/dodaj-ogloszenie';
  };

  useEffect(() => {
    const handleRequireAuth = () => setActiveModal('login');
    window.addEventListener(REQUIRE_AUTH_EVENT, handleRequireAuth as EventListener);
    return () => {
      window.removeEventListener(REQUIRE_AUTH_EVENT, handleRequireAuth as EventListener);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <h1>
            <Link to="/" aria-label="Przejdź do strony głównej">AutoTablica</Link>
          </h1>
        </div>
        
        <div className="navbar-menu">
          <div className="nav-buttons">
            <Link
              className="btn-ghost"
              to="/ulubione"
              onClick={(event) => {
              if (!user) {
                event.preventDefault();
                setActiveModal('login');
              }
              }}
              aria-label="Ulubione"
            >
                <svg
                className="icon-heart"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
                >
                <path
                  fill="currentColor"
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6.5 3.5 5 5.5 5c1.54 0 3.04.99 3.57 2.36h1.87C12.46 5.99 13.96 5 15.5 5 17.5 5 19 6.5 19 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
                </svg>
            </Link>
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
              <>
                <Link className="btn-primary" to="/panel-klienta">
                  Panel klienta
                </Link>
                <button className="btn-secondary" onClick={logout}>
                  Wyloguj się
                </button>
              </>
            )}
          </div>
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