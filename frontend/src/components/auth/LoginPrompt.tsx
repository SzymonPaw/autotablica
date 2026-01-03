import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { OPEN_REGISTER_EVENT } from '../../constants/events';
import LoginForm from './LoginForm';
import './auth.css';
import './LoginPrompt.css';

interface LoginPromptProps {
  title?: string;
  message?: string;
}

const LoginPrompt: React.FC<LoginPromptProps> = ({
  title = 'Wymagane logowanie',
  message = 'Ta sekcja jest dostępna wyłącznie dla zalogowanych użytkowników.',
}) => {
  const location = useLocation();
  const openRegister = () => {
    window.dispatchEvent(new Event(OPEN_REGISTER_EVENT));
  };

  return (
    <section className="login-required">
      <div className="login-required__card">
        <div className="login-required__copy">
          <p className="login-required__eyebrow">Strefa chroniona</p>
          <h1>{title}</h1>
          <p className="login-required__message">{message}</p>
          <p className="login-required__hint">
            Nie masz konta?{' '}
            <button type="button" className="login-required__hint-button" onClick={openRegister}>
              Załóż je
            </button>{' '}
            bezpośrednio na stronie głównej.
          </p>
          <Link to="/" className="login-required__link">
            ← Wróć na stronę główną
          </Link>
        </div>
        <div className="login-required__form">
          <LoginForm onSuccess={() => {
            // Po zalogowaniu zostaniemy automatycznie przeniesieni do żądanej sekcji,
            // bo ProtectedRoute ponownie wyrenderuje dzieci, gdy user pojawi się w AuthContext.
            console.info('Użytkownik zalogowany, wracam do docelowej strony', location.pathname);
          }} />
        </div>
      </div>
    </section>
  );
};

export default LoginPrompt;
