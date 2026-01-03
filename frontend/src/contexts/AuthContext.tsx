import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  changePassword as changePasswordRequest,
  deleteAccount as deleteAccountRequest,
  fetchProfile as fetchProfileRequest,
  login as loginRequest,
  logout as logoutRequest,
  register as registerRequest,
  updateProfile as updateProfileRequest,
  UserProfile,
  UpdateProfilePayload,
} from '../api/auth';

const TOKEN_STORAGE_KEY = 'autotablica_token';

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone: string) => Promise<void>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  updateProfile: (payload: UpdateProfilePayload) => Promise<UserProfile>;
  changePassword: (currentPassword: string, password: string, confirmation: string) => Promise<void>;
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
  const [token, setTokenState] = useState<string | null>(() => {
    try {
      return localStorage.getItem(TOKEN_STORAGE_KEY);
    } catch (error) {
      console.warn('Nie udało się odczytać tokenu z localStorage.', error);
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  const persistToken = useCallback((value: string | null) => {
    try {
      if (value) {
        localStorage.setItem(TOKEN_STORAGE_KEY, value);
      } else {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
      }
    } catch (error) {
      console.warn('Nie udało się zaktualizować localStorage.', error);
    }

    setTokenState(value);
  }, []);

  const fetchUser = useCallback(async () => {
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const profile = await fetchProfileRequest(token);
      setUser(profile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      persistToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [token, persistToken]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (email: string, password: string) => {
    try {
      const normalizedEmail = email.trim().toLowerCase();
      const response = await loginRequest({
        email: normalizedEmail,
        password,
        token_name: 'frontend',
        abilities: ['*'],
      });

      if (!response?.token || !response?.data) {
        throw new Error('Nieprawidłowa odpowiedź z serwera: brak tokenu lub danych użytkownika');
      }

      persistToken(response.token);
      setUser(response.data);
    } catch (error) {
      console.error('Błąd podczas logowania:', error);
      throw error instanceof Error ? error : new Error('Wystąpił nieoczekiwany błąd podczas logowania');
    }
  };

  const register = async (name: string, email: string, password: string, phone: string) => {
    try {
      const normalizedEmail = email.trim().toLowerCase();
      const response = await registerRequest({
        name: name.trim(),
        email: normalizedEmail,
        password,
        phone: phone.trim(),
        token_name: 'frontend',
        abilities: ['*'],
      });

      if (response?.token && response?.data) {
        persistToken(response.token);
        setUser(response.data);
        return;
      }

      const fallback = await loginRequest({
        email: normalizedEmail,
        password,
        token_name: 'frontend',
        abilities: ['*'],
      });

      if (!fallback?.token || !fallback?.data) {
        throw new Error('Nie udało się pozyskać tokenu po rejestracji.');
      }

      persistToken(fallback.token);
      setUser(fallback.data);
    } catch (error) {
      console.error('Błąd podczas rejestracji:', error);
      throw error;
    }
  };

  const logout = async () => {
    if (!token) {
      persistToken(null);
      setUser(null);
      return;
    }

    try {
      await logoutRequest(token);
    } catch (error) {
      console.error('Błąd podczas wylogowania:', error);
    } finally {
      persistToken(null);
      setUser(null);
    }
  };

  const deleteAccount = async () => {
    if (!token) {
      throw new Error('Brak aktywnej sesji.');
    }

    await deleteAccountRequest(token);

    persistToken(null);
    setUser(null);
  };

  const updateProfile = async (payload: UpdateProfilePayload) => {
    if (!token) {
      throw new Error('Brak aktywnej sesji.');
    }

    const updated = await updateProfileRequest(token, payload);
    setUser(updated);
    return updated;
  };

  const changePassword = async (currentPassword: string, password: string, confirmation: string) => {
    if (!token) {
      throw new Error('Brak aktywnej sesji.');
    }

    await changePasswordRequest(token, {
      current_password: currentPassword,
      password,
      password_confirmation: confirmation,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        logout,
        deleteAccount,
        updateProfile,
        changePassword,
        setToken: persistToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};