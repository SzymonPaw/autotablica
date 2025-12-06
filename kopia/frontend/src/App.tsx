import React, { useCallback, useEffect, useState } from 'react';
import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_URL ?? 'http://localhost:8000/api';
const TOKEN_STORAGE_KEY = 'autotablica_token';

interface Ogloszenie {
  id: number;
  uzytkownik_id: number;
  tytul: string;
  opis: string;
  cena: string;
  marka_id: number;
  model_id: number;
  vin: string;
  numer_rejestracyjny: string;
  data_pierwszej_rej: string;
  przebieg: number;
  rodzaj_paliwa: string;
  skrzynia_biegow: string;
  pojemnosc_silnika: string;
  status: string;
  created_at: string;
}

type ListingsResponse = Ogloszenie[] | { data: Ogloszenie[] };

interface UserProfile {
  id: number;
  name: string;
  email: string;
  created_at?: string | null;
  updated_at?: string | null;
  [key: string]: unknown;
}

interface AuthSuccess {
  token: string;
  token_type: string;
  data: UserProfile;
}

interface MeResponse {
  data: UserProfile;
}

interface LogoutResponse {
  message?: string;
}

type Feedback = {
  type: 'success' | 'error';
  message: string;
};

async function apiRequest<T>(path: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers as HeadersInit);

  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json');
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
  });

  let payload: unknown = null;

  if (response.status !== 204) {
    const contentType = response.headers.get('content-type');

    if (contentType?.includes('application/json')) {
      payload = await response.json();
    } else {
      const text = await response.text();
      payload = text;
    }
  }

  if (!response.ok) {
    let message = `Żądanie zakończyło się kodem ${response.status}.`;

    if (typeof payload === 'string') {
      message = payload.trim() || message;
    } else if (payload && typeof payload === 'object') {
      const body = payload as { message?: string; errors?: Record<string, string[] | string> };

      if (body.message) {
        message = body.message;
      }

      if (body.errors) {
        const flattened = Object.values(body.errors).reduce<string[]>((acc, value) => {
          if (Array.isArray(value)) {
            return acc.concat(value);
          }

          if (typeof value === 'string') {
            acc.push(value);
          }

          return acc;
        }, []);

        const firstError = flattened.find((errorMessage) => Boolean(errorMessage));

        if (firstError) {
          message = firstError;
        }
      }
    }

    throw new Error(message);
  }

  return { data: payload as T, status: response.status };
}

function formatDateTime(value?: string | null) {
  if (!value) {
    return '—';
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleString();
}

const App: React.FC = () => {
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    tokenName: 'frontend',
  });
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [token, setToken] = useState<string | null>(null);
  const [tokenInput, setTokenInput] = useState<string>('');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [registerFeedback, setRegisterFeedback] = useState<Feedback | null>(null);
  const [loginFeedback, setLoginFeedback] = useState<Feedback | null>(null);
  const [sessionFeedback, setSessionFeedback] = useState<Feedback | null>(null);
  const [ogloszenia, setOgloszenia] = useState<Ogloszenie[]>([]);
  const [ogloszeniaError, setOgloszeniaError] = useState<string | null>(null);
  const [loadingOgloszenia, setLoadingOgloszenia] = useState<boolean>(true);
  const [isFetchingProfile, setIsFetchingProfile] = useState<boolean>(false);

  const applyToken = useCallback((value: string | null) => {
    if (typeof window !== 'undefined') {
      try {
        if (value) {
          window.localStorage.setItem(TOKEN_STORAGE_KEY, value);
        } else {
          window.localStorage.removeItem(TOKEN_STORAGE_KEY);
        }
      } catch (error) {
        console.warn('Nie udało się zaktualizować localStorage.', error);
      }
    }

    setToken(value);
  }, []);

  const isAuthenticated = Boolean(token);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const stored = window.localStorage.getItem(TOKEN_STORAGE_KEY);

    if (stored) {
      setToken(stored);
      setTokenInput(stored);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    apiRequest<ListingsResponse>('/ogloszenia')
      .then(({ data }) => {
        if (!isMounted) {
          return;
        }

        if (Array.isArray(data)) {
          setOgloszenia(data);
          return;
        }

        if (data && typeof data === 'object' && 'data' in data && Array.isArray((data as { data: Ogloszenie[] }).data)) {
          setOgloszenia((data as { data: Ogloszenie[] }).data);
          return;
        }

        setOgloszenia([]);
      })
      .catch((error) => {
        if (!isMounted) {
          return;
        }

        const message = error instanceof Error ? error.message : 'Nie udało się pobrać ogłoszeń.';
        setOgloszeniaError(message);
      })
      .finally(() => {
        if (isMounted) {
          setLoadingOgloszenia(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setTokenInput(token ?? '');
  }, [token]);

  useEffect(() => {
    if (isAuthenticated) {
      setRegisterFeedback(null);
      setLoginFeedback(null);
    }
  }, [isAuthenticated]);

  // Synchronise profile information whenever the token changes.
  // Invalid tokens are cleared to force a clean re-authentication flow.
  useEffect(() => {
    if (!token) {
      setProfile(null);
      setIsFetchingProfile(false);
      return;
    }

    let cancelled = false;

    setIsFetchingProfile(true);

    apiRequest<MeResponse>('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(({ data }) => {
        if (!cancelled) {
          setProfile(data.data);
        }
      })
      .catch((error) => {
        if (cancelled) {
          return;
        }

        const message = error instanceof Error ? error.message : 'Nie udało się pobrać profilu.';
        const normalizedKey = message.trim().toLowerCase();
        const displayMessage = normalizedKey === 'unauthenticated.'
          ? 'Token wygasł lub jest nieprawidłowy. Zaloguj się ponownie.'
          : message;

        setProfile(null);
        setSessionFeedback({ type: 'error', message: displayMessage });

        if (normalizedKey === 'unauthenticated.' || normalizedKey.includes('unauthenticated')) {
          applyToken(null);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsFetchingProfile(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [token, applyToken]);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRegisterFeedback(null);
    setSessionFeedback(null);

    try {
      const payload = {
        name: registerForm.name.trim(),
        email: registerForm.email.trim().toLowerCase(),
        password: registerForm.password,
        token_name: registerForm.tokenName.trim() || 'frontend',
        abilities: ['*'],
      };

      const { data } = await apiRequest<AuthSuccess>('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      applyToken(data.token);
      setProfile(data.data);
      setRegisterForm((prev) => ({ ...prev, name: '', email: '', password: '' }));
      setRegisterFeedback({ type: 'success', message: 'Rejestracja zakończyła się sukcesem.' });
      setSessionFeedback({ type: 'success', message: 'Token zapisano w pamięci przeglądarki.' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Nie udało się zarejestrować użytkownika.';
      setRegisterFeedback({ type: 'error', message });
    }
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginFeedback(null);
    setSessionFeedback(null);

    try {
      const payload = {
        email: loginForm.email.trim().toLowerCase(),
        password: loginForm.password,
        token_name: 'frontend',
        abilities: ['*'],
      };

      const { data } = await apiRequest<AuthSuccess>('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      applyToken(data.token);
      setProfile(data.data);
      setLoginForm((prev) => ({ ...prev, password: '' }));
      setLoginFeedback({ type: 'success', message: 'Zalogowano pomyślnie.' });
      setSessionFeedback({ type: 'success', message: 'Token zapisano w pamięci przeglądarki.' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Nie udało się zalogować.';
      setLoginFeedback({ type: 'error', message });
    }
  };

  const handleLogout = async () => {
    setSessionFeedback(null);

    if (!token) {
      setSessionFeedback({ type: 'error', message: 'Brak aktywnego tokenu do unieważnienia.' });
      return;
    }

    try {
      const { data } = await apiRequest<LogoutResponse>('/auth/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      applyToken(null);
      setProfile(null);
      setSessionFeedback({ type: 'success', message: data?.message ?? 'Wylogowano i usunięto token.' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Nie udało się wylogować.';
      setSessionFeedback({ type: 'error', message });
    }
  };

  const handleApplyTokenInput = () => {
    const trimmed = tokenInput.trim();

    if (!trimmed) {
      applyToken(null);
      setProfile(null);
      setSessionFeedback({ type: 'success', message: 'Token został usunięty.' });
      return;
    }

    applyToken(trimmed);
    setSessionFeedback({ type: 'success', message: 'Token zaktualizowano ręcznie.' });
  };

  const handleCopyToken = async () => {
    setSessionFeedback(null);

    if (!token) {
      setSessionFeedback({ type: 'error', message: 'Brak tokenu do skopiowania.' });
      return;
    }

    try {
      if (!navigator.clipboard) {
        throw new Error('Schowek nie jest dostępny w tej przeglądarce.');
      }

      await navigator.clipboard.writeText(token);
      setSessionFeedback({ type: 'success', message: 'Token skopiowano do schowka.' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Nie udało się skopiować tokenu.';
      setSessionFeedback({ type: 'error', message });
    }
  };

  return (
    <div className="App">
      <h1>AutoTablica API tester</h1>
      <p className="intro">Szybkie formularze do rejestracji, logowania oraz sprawdzania profilu użytkownika.</p>
      <p className="api-url">
        Aktualny adres API: <code>{API_BASE_URL}</code>
      </p>

      {!isAuthenticated && (
        <>
          <section className="card">
            <h2>Rejestracja</h2>
            <form onSubmit={handleRegister}>
              <label htmlFor="register-name">
                Imię i nazwisko
                <input
                  id="register-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={registerForm.name}
                  onChange={(event) => setRegisterForm((prev) => ({ ...prev, name: event.target.value }))}
                />
              </label>
              <label htmlFor="register-email">
                Adres e-mail
                <input
                  id="register-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={registerForm.email}
                  onChange={(event) => setRegisterForm((prev) => ({ ...prev, email: event.target.value }))}
                />
              </label>
              <label htmlFor="register-password">
                Hasło
                <input
                  id="register-password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={registerForm.password}
                  onChange={(event) => setRegisterForm((prev) => ({ ...prev, password: event.target.value }))}
                />
              </label>
              <label htmlFor="register-token-name">
                Nazwa tokenu (opcjonalnie)
                <input
                  id="register-token-name"
                  name="token_name"
                  type="text"
                  value={registerForm.tokenName}
                  onChange={(event) => setRegisterForm((prev) => ({ ...prev, tokenName: event.target.value }))}
                />
              </label>
              <small className="hint">Po udanej rejestracji token zostanie zapisany w localStorage.</small>
              <button type="submit">Zarejestruj</button>
            </form>
            {registerFeedback && <p className={`feedback ${registerFeedback.type}`}>{registerFeedback.message}</p>}
          </section>

          <section className="card">
            <h2>Logowanie</h2>
            <form onSubmit={handleLogin}>
              <label htmlFor="login-email">
                Adres e-mail
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={loginForm.email}
                  onChange={(event) => setLoginForm((prev) => ({ ...prev, email: event.target.value }))}
                />
              </label>
              <label htmlFor="login-password">
                Hasło
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={loginForm.password}
                  onChange={(event) => setLoginForm((prev) => ({ ...prev, password: event.target.value }))}
                />
              </label>
              <button type="submit">Zaloguj</button>
            </form>
            {loginFeedback && <p className={`feedback ${loginFeedback.type}`}>{loginFeedback.message}</p>}
          </section>
        </>
      )}

      {isAuthenticated && (
        <section className="card">
          <h2>Twoje konto</h2>
          {isFetchingProfile ? (
            <p className="profile-loading">Ładowanie danych profilu...</p>
          ) : (
            <>
              {profile ? (
                <dl className="profile-summary">
                  <div>
                    <dt>Imię i nazwisko</dt>
                    <dd>{profile.name}</dd>
                  </div>
                  <div>
                    <dt>Adres e-mail</dt>
                    <dd>{profile.email}</dd>
                  </div>
                  <div>
                    <dt>Identyfikator</dt>
                    <dd>{profile.id}</dd>
                  </div>
                  <div>
                    <dt>Utworzono</dt>
                    <dd>{formatDateTime(profile.created_at)}</dd>
                  </div>
                  <div>
                    <dt>Zaktualizowano</dt>
                    <dd>{formatDateTime(profile.updated_at)}</dd>
                  </div>
                </dl>
              ) : (
                <p className="empty">Brak danych profilu. Zaloguj się ponownie, aby je odświeżyć.</p>
              )}
            </>
          )}

          <div className="token-tools">
            <label htmlFor="token-input">
              Aktualny token
              <textarea
                id="token-input"
                value={tokenInput}
                onChange={(event) => setTokenInput(event.target.value)}
                placeholder="Token zostanie wstawiony automatycznie po logowaniu lub rejestracji."
              />
            </label>
            <div className="token-actions">
              <button type="button" onClick={handleApplyTokenInput}>
                Zastosuj token
              </button>
              <button type="button" className="btn-secondary" onClick={handleCopyToken}>
                Skopiuj token
              </button>
              <button type="button" className="btn-danger" onClick={handleLogout}>
                Wyloguj
              </button>
            </div>
            <p className="token-note">Po zmianie tokenu dane profilu odświeżą się automatycznie.</p>
          </div>

          {sessionFeedback && <p className={`feedback ${sessionFeedback.type}`}>{sessionFeedback.message}</p>}
        </section>
      )}

      <section className="card">
        <h2>Ostatnie ogłoszenia</h2>
        {loadingOgloszenia && <p>Ładowanie ogłoszeń...</p>}
        {ogloszeniaError && !loadingOgloszenia && <p className="feedback error">{ogloszeniaError}</p>}
        {!loadingOgloszenia && !ogloszeniaError && ogloszenia.length === 0 && (
          <p className="empty">Brak ogłoszeń do wyświetlenia.</p>
        )}
        {!loadingOgloszenia && !ogloszeniaError && ogloszenia.length > 0 && (
          <ul className="ogloszenia-list">
            {ogloszenia.map((item) => (
              <li key={item.id} className="ogloszenie-item">
                <h3>{item.tytul}</h3>
                <div className="ogloszenie-meta">
                  <span><strong>Cena:</strong> {item.cena} PLN</span>
                  <span><strong>Marka ID:</strong> {item.marka_id}</span>
                  <span><strong>Model ID:</strong> {item.model_id}</span>
                  <span><strong>Status:</strong> {item.status}</span>
                </div>
                <p>{item.opis}</p>
                <dl className="ogloszenie-details">
                  <div>
                    <dt>VIN</dt>
                    <dd>{item.vin}</dd>
                  </div>
                  <div>
                    <dt>Rejestracja</dt>
                    <dd>{item.numer_rejestracyjny}</dd>
                  </div>
                  <div>
                    <dt>Pierwsza rejestracja</dt>
                    <dd>{item.data_pierwszej_rej}</dd>
                  </div>
                  <div>
                    <dt>Przebieg</dt>
                    <dd>{item.przebieg} km</dd>
                  </div>
                  <div>
                    <dt>Paliwo</dt>
                    <dd>{item.rodzaj_paliwa}</dd>
                  </div>
                  <div>
                    <dt>Skrzynia</dt>
                    <dd>{item.skrzynia_biegow}</dd>
                  </div>
                  <div>
                    <dt>Pojemność</dt>
                    <dd>{item.pojemnosc_silnika} L</dd>
                  </div>
                </dl>
                <p className="timestamp">Dodano: {new Date(item.created_at).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default App;
