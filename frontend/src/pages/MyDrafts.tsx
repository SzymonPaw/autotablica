import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchDrafts, deleteDraft } from '../api/client';
import { useAuth } from '../contexts/AuthContext';
import LoadingScreen from '../components/common/LoadingScreen';
import './MyDrafts.css';

interface Draft {
  id: number;
  tytul: string | null;
  opis: string | null;
  cena: number | null;
  marka_id: number | null;
  model_id: number | null;
  created_at: string;
  updated_at: string;
}

const MyDrafts: React.FC = () => {
  const { token } = useAuth();
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDrafts();
  }, [token]);

  const loadDrafts = async () => {
    try {
      setIsLoading(true);
      const data = await fetchDrafts();
      setDrafts(data);
      setError(null);
    } catch (err) {
      setError('Nie udało się pobrać szkiców');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Czy na pewno chcesz usunąć ten szkic?')) {
      return;
    }

    try {
      await deleteDraft(id);
      setDrafts(prevDrafts => prevDrafts.filter(draft => draft.id !== id));
    } catch (err) {
      setError('Nie udało się usunąć szkicu');
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="my-drafts-page">
      <div className="page-header">
        <h2>Moje szkice</h2>
        <Link to="/dodaj-ogloszenie" className="btn-primary">
          Dodaj nowe ogłoszenie
        </Link>
      </div>

      {error && <div className="error-message">{error}</div>}

      {drafts.length === 0 ? (
        <div className="empty-state">
          <p>Nie masz jeszcze żadnych szkiców</p>
          <Link to="/dodaj-ogloszenie" className="btn-primary">
            Utwórz pierwszy szkic
          </Link>
        </div>
      ) : (
        <div className="drafts-grid">
          {drafts.map(draft => (
            <div key={draft.id} className="draft-card">
              <div className="draft-header">
                <span className="draft-badge">Szkic</span>
                <span className="draft-date">
                  {new Date(draft.updated_at).toLocaleDateString('pl-PL')}
                </span>
              </div>
              
              <div className="draft-content">
                <h3>{draft.tytul || 'Bez tytułu'}</h3>
                <p className="draft-description">
                  {draft.opis ? 
                    (draft.opis.length > 100 ? draft.opis.substring(0, 100) + '...' : draft.opis) 
                    : 'Brak opisu'}
                </p>
                {draft.cena && (
                  <p className="draft-price">{draft.cena.toLocaleString('pl-PL')} zł</p>
                )}
              </div>

              <div className="draft-actions">
                <Link 
                  to={`/dodaj-ogloszenie?draft=${draft.id}`} 
                  className="btn-secondary"
                >
                  Kontynuuj edycję
                </Link>
                <button
                  onClick={() => handleDelete(draft.id)}
                  className="btn-danger-outline"
                >
                  Usuń
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDrafts;
