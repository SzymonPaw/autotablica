import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface RegisterFormProps {
  onSuccess?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      console.log('Rozpoczynam rejestrację...');
      console.log('Dane:', { name, email, phone, password });
      
      await register(name, email, password, phone);
      console.log('Rejestracja udana!');
      
      setName('');
      setEmail('');
      setPhone('');
      setPassword('');
      onSuccess?.();
    } catch (err) {
      console.error('Błąd rejestracji:', err);
      let errorMessage = 'Nie udało się zarejestrować';
      
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (err && typeof err === 'object' && 'message' in err) {
        errorMessage = String(err.message);
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form register-form">
      <h2>Rejestracja</h2>
      
      <div className="form-group">
        <label htmlFor="register-name">Imię i nazwisko</label>
        <input
          id="register-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="register-email">Adres e-mail</label>
        <input
          id="register-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </div>

      <div className="form-group">
        <label htmlFor="register-phone">Numer telefonu</label>
        <input
          id="register-phone"
          type="tel"
          inputMode="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          autoComplete="tel"
          placeholder="np. +48 600 000 000"
        />
      </div>

      <div className="form-group">
        <label htmlFor="register-password">Hasło</label>
        <input
          id="register-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
      </div>

      {error && <div className="auth-error">{error}</div>}
      
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Rejestracja...' : 'Zarejestruj się'}
      </button>
    </form>
  );
};

export default RegisterForm;