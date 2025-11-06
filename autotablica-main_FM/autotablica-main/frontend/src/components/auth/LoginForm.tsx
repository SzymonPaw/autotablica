import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      console.log('Próba logowania...');
      await login(email, password);
      console.log('Logowanie udane!');
      setPassword('');
      setSuccess('Zalogowano pomyślnie!');
      // Pokaż alert sukcesu przez 2 sekundy przed zamknięciem modalu
      setTimeout(() => {
        setSuccess(null);
        onSuccess?.();
      }, 2000);
    } catch (err) {
      console.error('Błąd logowania:', err);
      const errorMessage = err instanceof Error ? err.message : 'Nie udało się zalogować';
      setError(errorMessage);
      // Pokaż alert błędu
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form login-form">
      <h2>Logowanie</h2>
      
      <div className="form-group">
        <label htmlFor="login-email">Adres e-mail</label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </div>

      <div className="form-group">
        <label htmlFor="login-password">Hasło</label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
      </div>

      {error && <div className="auth-error">{error}</div>}
      {success && <div className="auth-success">{success}</div>}
      
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logowanie...' : 'Zaloguj się'}
      </button>
    </form>
  );
};

export default LoginForm;