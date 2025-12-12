import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingScreen from '../components/common/LoadingScreen';
import MyListings from './MyListings';
import './ClientPanel.css';

type ClientPanelTab = 'listings' | 'profile' | 'account';

const ClientPanel: React.FC = () => {
  const { user, isLoading, deleteAccount, updateProfile, changePassword } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<ClientPanelTab>('listings');
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [profileForm, setProfileForm] = useState({ name: '', email: '' });
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: '', password: '', confirm: '' });
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  // Odczytaj parametr tab z URL przy montowaniu
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['listings', 'profile', 'account'].includes(tabParam)) {
      setActiveTab(tabParam as ClientPanelTab);
    }
  }, [searchParams]);

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name ?? '',
        email: user.email ?? '',
      });
    }
  }, [user]);

  useEffect(() => {
    if (!showPasswordForm) {
      setPasswordForm({ current: '', password: '', confirm: '' });
      setPasswordError(null);
      setPasswordSuccess(null);
    }
  }, [showPasswordForm]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return null;
  }

  const handleProfileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProfileError(null);
    setProfileSuccess(null);
    setProfileSaving(true);
    try {
      await updateProfile({
        name: profileForm.name.trim(),
        email: profileForm.email.trim().toLowerCase(),
      });
      setProfileSuccess('Zaktualizowano dane użytkownika.');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Nie udało się zaktualizować profilu.';
      setProfileError(message);
    } finally {
      setProfileSaving(false);
    }
  };

  const handlePasswordInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);
    if (passwordForm.password !== passwordForm.confirm) {
      setPasswordError('Nowe hasło i potwierdzenie muszą być takie same.');
      return;
    }
    setPasswordSaving(true);
    try {
      await changePassword(passwordForm.current, passwordForm.password, passwordForm.confirm);
      setPasswordSuccess('Hasło zostało zmienione.');
      setPasswordForm({ current: '', password: '', confirm: '' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Nie udało się zmienić hasła.';
      setPasswordError(message);
    } finally {
      setPasswordSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Czy na pewno chcesz trwale usunąć konto? Tej operacji nie można cofnąć.'
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);
    setDeleteError(null);

    try {
      await deleteAccount();
      navigate('/', { replace: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Nie udało się usunąć konta.';
      setDeleteError(message);
    } finally {
      setIsDeleting(false);
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'listings':
        return <MyListings />;
      case 'profile':
        return (
          <section className="client-panel__card">
            <h2>Dane użytkownika</h2>
            <p className="client-panel__helper">Zaktualizuj dane profilu, aby były zawsze aktualne.</p>
            <form className="client-panel__form" onSubmit={handleProfileSubmit}>
              <div className="client-panel__form-row">
                <div className="client-panel__form-group">
                  <label htmlFor="profile-name">Imię i nazwisko</label>
                  <input
                    id="profile-name"
                    name="name"
                    type="text"
                    value={profileForm.name}
                    onChange={handleProfileInputChange}
                    required
                  />
                </div>
                <div className="client-panel__form-group">
                  <label htmlFor="profile-email">Adres e-mail</label>
                  <input
                    id="profile-email"
                    name="email"
                    type="email"
                    value={profileForm.email}
                    onChange={handleProfileInputChange}
                    required
                  />
                </div>
              </div>
              <div className="client-panel__form-group">
                <label>Data rejestracji</label>
                <p className="client-panel__static-value">
                  {user.created_at ? new Date(user.created_at).toLocaleDateString('pl-PL') : 'Brak danych'}
                </p>
              </div>
              {profileError && <div className="client-panel__error">{profileError}</div>}
              {profileSuccess && <div className="client-panel__success">{profileSuccess}</div>}
              <div className="client-panel__actions">
                <button type="submit" className="btn-primary" disabled={profileSaving}>
                  {profileSaving ? 'Zapisywanie…' : 'Zapisz zmiany'}
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowPasswordForm((prev) => !prev)}
                >
                  {showPasswordForm ? 'Ukryj zmianę hasła' : 'Zmień hasło'}
                </button>
              </div>
            </form>
            {showPasswordForm && (
              <form className="client-panel__password-card" onSubmit={handlePasswordSubmit}>
                <h3>Zmień hasło</h3>
                <div className="client-panel__form-row">
                  <div className="client-panel__form-group">
                    <label htmlFor="password-current">Obecne hasło</label>
                    <input
                      id="password-current"
                      name="current"
                      type="password"
                      value={passwordForm.current}
                      onChange={handlePasswordInputChange}
                      required
                    />
                  </div>
                  <div className="client-panel__form-group">
                    <label htmlFor="password-new">Nowe hasło</label>
                    <input
                      id="password-new"
                      name="password"
                      type="password"
                      value={passwordForm.password}
                      onChange={handlePasswordInputChange}
                      required
                    />
                  </div>
                  <div className="client-panel__form-group">
                    <label htmlFor="password-confirm">Powtórz nowe hasło</label>
                    <input
                      id="password-confirm"
                      name="confirm"
                      type="password"
                      value={passwordForm.confirm}
                      onChange={handlePasswordInputChange}
                      required
                    />
                  </div>
                </div>
                {passwordError && <div className="client-panel__error">{passwordError}</div>}
                {passwordSuccess && <div className="client-panel__success">{passwordSuccess}</div>}
                <div className="client-panel__actions">
                  <button type="submit" className="btn-primary" disabled={passwordSaving}>
                    {passwordSaving ? 'Aktualizowanie…' : 'Zmień hasło'}
                  </button>
                </div>
              </form>
            )}
          </section>
        );
      case 'account':
        return (
          <section className="client-panel__card danger">
            <h2>Usuwanie konta</h2>
            <p>
              Usunięcie konta wyloguje Cię z aplikacji i trwale usunie wszystkie dane powiązane z Twoim profilem,
              w tym ogłoszenia oraz ulubione. Tej operacji nie można cofnąć.
            </p>
            {deleteError && <div className="client-panel__error">{deleteError}</div>}
            <button className="btn-danger" type="button" onClick={handleDeleteAccount} disabled={isDeleting}>
              {isDeleting ? 'Usuwanie konta…' : 'Usuń konto'}
            </button>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="client-panel">
      <header className="client-panel__header">
        <div>
          <p className="client-panel__eyebrow">Panel klienta</p>
          <h1>Witaj, {user.name}</h1>
          <p className="client-panel__subtitle">Zarządzaj ogłoszeniami i kontem z jednego miejsca.</p>
        </div>
      </header>

      <div className="client-panel__tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'listings'}
          className={activeTab === 'listings' ? 'active' : ''}
          onClick={() => setActiveTab('listings')}
        >
          Moje ogłoszenia
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'profile'}
          className={activeTab === 'profile' ? 'active' : ''}
          onClick={() => setActiveTab('profile')}
        >
          Dane użytkownika
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'account'}
          className={activeTab === 'account' ? 'active' : ''}
          onClick={() => setActiveTab('account')}
        >
          Usuń konto
        </button>
      </div>

      <div className="client-panel__content">{renderActiveTab()}</div>
    </div>
  );
};

export default ClientPanel;
