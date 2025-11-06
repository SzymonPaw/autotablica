import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../api/client';
import { useAuth } from '../contexts/AuthContext';
import LoadingScreen from '../components/common/LoadingScreen';
import './MyListings.css';

interface Listing {
  id: number;
  tytul: string;
  opis: string;
  cena: number;
  status: 'aktywne' | 'nieaktywne' | 'sprzedane';
  created_at: string;
  updated_at: string;
  zdjecia: Array<{ id: number; url: string }>;
}

const MyListings: React.FC = () => {
  const { user, token } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data } = await apiRequest<{ data: Listing[] }>('/ogloszenia/moje', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setListings(data.data);
      } catch (err) {
        setError('Nie udało się pobrać ogłoszeń');
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, [token]);

  const handleStatusChange = async (id: number, status: Listing['status']) => {
    try {
      await apiRequest(`/ogloszenia/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      
      setListings(prevListings =>
        prevListings.map(listing =>
          listing.id === id ? { ...listing, status } : listing
        )
      );
    } catch (err) {
      setError('Nie udało się zaktualizować statusu ogłoszenia');
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="my-listings-page">
      <div className="page-header">
        <h1>Moje ogłoszenia</h1>
        <Link to="/ogloszenia/dodaj" className="btn-primary">
          Dodaj nowe ogłoszenie
        </Link>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="listings-filters">
        <button className="filter-btn active">Wszystkie ({listings.length})</button>
        <button className="filter-btn">
          Aktywne ({listings.filter(l => l.status === 'aktywne').length})
        </button>
        <button className="filter-btn">
          Nieaktywne ({listings.filter(l => l.status === 'nieaktywne').length})
        </button>
        <button className="filter-btn">
          Sprzedane ({listings.filter(l => l.status === 'sprzedane').length})
        </button>
      </div>

      {listings.length === 0 ? (
        <div className="empty-state">
          <p>Nie masz jeszcze żadnych ogłoszeń</p>
          <Link to="/ogloszenia/dodaj" className="btn-primary">
            Dodaj pierwsze ogłoszenie
          </Link>
        </div>
      ) : (
        <div className="listings-grid">
          {listings.map(listing => (
            <div key={listing.id} className="listing-card">
              <div className="listing-image">
                {listing.zdjecia[0] ? (
                  <img src={listing.zdjecia[0].url} alt={listing.tytul} />
                ) : (
                  <div className="no-image">Brak zdjęcia</div>
                )}
                <div className={`status-badge ${listing.status}`}>
                  {listing.status}
                </div>
              </div>
              
              <div className="listing-content">
                <h3>{listing.tytul}</h3>
                <p className="price">{listing.cena.toLocaleString('pl-PL')} zł</p>
                <p className="date">
                  Dodano: {new Date(listing.created_at).toLocaleDateString('pl-PL')}
                </p>
              </div>

              <div className="listing-actions">
                <Link to={`/ogloszenie/${listing.id}`} className="btn-secondary">
                  Podgląd
                </Link>
                <Link to={`/ogloszenia/${listing.id}/edytuj`} className="btn-secondary">
                  Edytuj
                </Link>
                <select
                  value={listing.status}
                  onChange={(e) => handleStatusChange(listing.id, e.target.value as Listing['status'])}
                  className="status-select"
                >
                  <option value="aktywne">Aktywne</option>
                  <option value="nieaktywne">Nieaktywne</option>
                  <option value="sprzedane">Sprzedane</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListings;