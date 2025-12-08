import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchFavoriteListings } from '../api/client';
import { useFavorites } from '../contexts/FavoritesContext';
import LoadingScreen from '../components/common/LoadingScreen';
import './Favorites.css';

interface Listing {
  id: number;
  tytul: string;
  opis: string;
  cena: number;
  created_at: string;
  zdjecia: Array<{ id: number; url: string }>;
  user: {
    id: number;
    name: string;
  };
}

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { removeFavorite } = useFavorites();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const payload = await fetchFavoriteListings({ per_page: 50, sort: '-created_at' });
        const items = Array.isArray(payload?.data) ? payload.data : [];
        setFavorites(items);
      } catch (err) {
        setError('Nie udało się pobrać ulubionych ogłoszeń');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFromFavorites = async (id: number) => {
    try {
      await removeFavorite(id);
      setFavorites(prevFavorites =>
        prevFavorites.filter(favorite => favorite.id !== id)
      );
    } catch (err) {
      setError('Nie udało się usunąć ogłoszenia z ulubionych');
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="favorites-page">
      <h1>Ulubione ogłoszenia</h1>

      {error && <div className="error-message">{error}</div>}

      {favorites.length === 0 ? (
        <div className="empty-state">
          <p>Nie masz jeszcze żadnych ulubionych ogłoszeń</p>
          <Link to="/" className="btn-primary">
            Przeglądaj ogłoszenia
          </Link>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map(listing => (
            <div key={listing.id} className="favorite-card">
              <Link to={`/ogloszenie/${listing.id}`} className="favorite-image">
                {listing.zdjecia[0] ? (
                  <img src={listing.zdjecia[0].url} alt={listing.tytul} />
                ) : (
                  <div className="no-image">Brak zdjęcia</div>
                )}
              </Link>
              
              <div className="favorite-content">
                <Link to={`/ogloszenie/${listing.id}`} className="favorite-title">
                  <h3>{listing.tytul}</h3>
                </Link>
                <p className="favorite-price">{listing.cena.toLocaleString('pl-PL')} zł</p>
                <p className="favorite-seller">
                  Sprzedający: {listing.user.name}
                </p>
                <p className="favorite-date">
                  Dodano: {new Date(listing.created_at).toLocaleDateString('pl-PL')}
                </p>
              </div>

              <div className="favorite-actions">
                <Link to={`/ogloszenie/${listing.id}`} className="btn-secondary">
                  Zobacz szczegóły
                </Link>
                <button 
                  onClick={() => handleRemoveFromFavorites(listing.id)}
                  className="btn-danger"
                >
                  Usuń z ulubionych
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;