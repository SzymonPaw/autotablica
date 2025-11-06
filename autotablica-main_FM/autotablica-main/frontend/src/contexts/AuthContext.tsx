import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiRequest } from '../api/client';

const TOKEN_STORAGE_KEY = 'autotablica_token';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  created_at?: string | null;
  updated_at?: string | null;
  [key: string]: unknown;
}

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
      fetchUser();
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      setUser(null);
      setIsLoading(false);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      console.log('Fetching user profile with token:', token);
      const { data } = await apiRequest<{ data: UserProfile }>('/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('User profile received:', data);
      setUser(data.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // Token wygasł lub jest nieprawidłowy
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      console.log('Wysyłanie żądania logowania...', { email });
      const resp = await apiRequest<any>('/auth/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
          token_name: 'frontend',
          abilities: ['*'],
        }),
      });

      console.log('Odpowiedź z serwera:', resp);

      // Unified handling for different backend response shapes:
      // - { data: { token, data: User } }
      // - { token, data: User }
      // - { data: User } with token attached to the user object
      const payload = resp.data;
      const tokenFromResp: string | null = (payload && (payload.token ?? payload.data?.token)) ?? null;
      const userFromResp: UserProfile | null = (payload && (payload.data ?? payload)) ?? null;

      console.log('Przetworzono odpowiedź:', { 
        hasToken: !!tokenFromResp, 
        hasUser: !!userFromResp,
        userFields: userFromResp ? Object.keys(userFromResp) : []
      });

      if (!tokenFromResp || !userFromResp) {
        throw new Error('Nieprawidłowa odpowiedź z serwera: brak tokenu lub danych użytkownika');
      }

      setToken(tokenFromResp);
      setUser(userFromResp);
      
      console.log('Logowanie zakończone sukcesem');
    } catch (error) {
      console.error('Błąd podczas logowania:', error);
      throw error instanceof Error ? error : new Error('Wystąpił nieoczekiwany błąd podczas logowania');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      console.log('Wysyłam żądanie rejestracji do:', '/auth/register');
      
      const response = await apiRequest<any>('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
          token_name: 'frontend',
          abilities: ['*'],
        }),
      });

      console.log('Otrzymana odpowiedź:', response);

      const payload = response.data;
      const tokenFromResp: string | null = (payload && (payload.token ?? payload.data?.token)) ?? null;
      const userFromResp: UserProfile | null = (payload && (payload.data ?? payload)) ?? null;

      if (!tokenFromResp) {
        throw new Error('Otrzymano nieprawidłową odpowiedź z serwera');
      }

      setToken(tokenFromResp);
      setUser(userFromResp);
    } catch (error) {
      console.error('Błąd podczas rejestracji:', error);
      throw error;
    }
  };

  const logout = async () => {
    if (token) {
      try {
        await apiRequest('/auth/logout', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } finally {
        setToken(null);
        setUser(null);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};