import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import { fetchListingById } from '../api/client';
import { cleanTitle } from '../utils/title';

interface Zdjecie {
  id: number;
  url?: string | null;
}

interface OgloszenieDetail {
  id: number;
  tytul: string;
  opis?: string;
  cena?: number | string | null;
  created_at?: string;
  marka?: { id: number; nazwa: string } | null;
  model?: { id: number; nazwa: string } | null;
  vin?: string | null;
  numer_rejestracyjny?: string | null;
  data_pierwszej_rej?: string | null;
  przebieg?: number | null;
  rodzaj_paliwa?: string | null;
  skrzynia_biegow?: string | null;
  pojemnosc_silnika?: number | null;
  zdjecia?: Zdjecie[];
  [key: string]: any;
}

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<OgloszenieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  useEffect(() => {
    if (!id) return;

    let mounted = true;
    setLoading(true);
    setError(null);

    fetchListingById(id)
      .then((data) => {
        if (!mounted) return;
        setItem(data);
        setMainImageIndex(0);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err?.message || 'Nie udało się pobrać ogłoszenia.');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) return <p>Ładowanie ogłoszenia...</p>;
  if (error) return <p className="feedback error">{error}</p>;
  if (!item) return <p className="empty">Brak ogłoszenia.</p>;

  const images = Array.isArray(item.zdjecia) ? item.zdjecia.filter((z) => z && z.url) : [];
  const mainImage = images.length > 0 ? images[mainImageIndex]?.url : null;
  const hasGalleryControls = images.length > 1;

  const handleMainImageNav = (direction: 'prev' | 'next') => {
    if (!hasGalleryControls) return;
    setMainImageIndex((prev) => {
      if (direction === 'prev') {
        return prev === 0 ? images.length - 1 : prev - 1;
      }
      return prev === images.length - 1 ? 0 : prev + 1;
    });
  };

  return (
    <article className="ogloszenie-detail card">
      <div className="detail-grid">
        <div className="gallery">
          <div className="main-image-wrapper">
            {mainImage ? (
              <img className="main-image" src={mainImage} alt={cleanTitle(item.tytul)} />
            ) : (
              <div className="no-image">Brak zdjęcia</div>
            )}

            {hasGalleryControls && (
              <>
                <button
                  type="button"
                  className="gallery-arrow prev"
                  onClick={() => handleMainImageNav('prev')}
                  aria-label="Poprzednie zdjęcie"
                >
                  <span aria-hidden="true">‹</span>
                </button>
                <button
                  type="button"
                  className="gallery-arrow next"
                  onClick={() => handleMainImageNav('next')}
                  aria-label="Następne zdjęcie"
                >
                  <span aria-hidden="true">›</span>
                </button>
                <div className="gallery-counter">
                  {mainImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="thumbnails">
              {images.map((img, idx) => (
                <button
                  key={img.id || idx}
                  type="button"
                  className={`thumb ${idx === mainImageIndex ? 'active' : ''}`}
                  onClick={() => setMainImageIndex(idx)}
                >
                  <img src={img.url ?? ''} alt={`${cleanTitle(item.tytul)} ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="info">
          <h2>{cleanTitle(item.tytul)}</h2>
          <p className="price"><strong>Cena:</strong> {item.cena ?? '—'} PLN</p>

          <div className="meta">
            <p><strong>Marka:</strong> {item.marka?.nazwa ?? '—'}</p>
            <p><strong>Model:</strong> {item.model?.nazwa ?? '—'}</p>
            <p><strong>Rok rejestracji:</strong> {item.data_pierwszej_rej ?? '—'}</p>
            <p><strong>Przebieg:</strong> {item.przebieg ?? '—'}</p>
            <p><strong>Paliwo:</strong> {item.rodzaj_paliwa ?? '—'}</p>
            <p><strong>Skrzynia:</strong> {item.skrzynia_biegow ?? '—'}</p>
            <p><strong>Pojemność:</strong> {item.pojemnosc_silnika ?? '—'}</p>
          </div>

          <section className="description">
            <h3>Opis</h3>
            <p>{item.opis ?? 'Brak opisu.'}</p>
          </section>

          <p className="timestamp">Dodano: {item.created_at ? new Date(item.created_at).toLocaleString() : '—'}</p>
        </div>
      </div>

      <pre className="debug" style={{ marginTop: 12 }}>{JSON.stringify(item, null, 2)}</pre>
    </article>
  );
};

export default Detail;
