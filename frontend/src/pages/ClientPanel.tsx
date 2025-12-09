import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingScreen from '../components/common/LoadingScreen';
import MyListings from './MyListings';
import './ClientPanel.css';

type ClientPanelTab = 'listings' | 'profile' | 'account';

const ClientPanel: React.FC = () => {
  const { user, isLoading, deleteAccount } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<ClientPanelTab>('listings');
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Odczytaj parametr tab z URL przy montowaniu
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['listings', 'profile', 'account'].includes(tabParam)) {
      setActiveTab(tabParam as ClientPanelTab);
    }
  }, [searchParams]);

  const profileFields = useMemo(() => {
    if (!user) {
      return [];
    }

    return [
      { label: 'Imię i nazwisko', value: user.name },
      { label: 'Adres e-mail', value: user.email },
      { label: 'ID konta', value: `#${user.id}` },
      {
        label: 'Data rejestracji',
        value: user.created_at ? new Date(user.created_at).toLocaleDateString('pl-PL') : 'Brak danych',
      },
    ];
  }, [user]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return null;
  }

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
            <p className="client-panel__helper">Poniższe informacje pochodzą z Twojego profilu.</p>
            <dl className="client-panel__details">
              {profileFields.map((field) => (
                <div key={field.label} className="client-panel__details-row">
                  <dt>{field.label}</dt>
                  <dd>{field.value}</dd>
                </div>
              ))}
            </dl>
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
