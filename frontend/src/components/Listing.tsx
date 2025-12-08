import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Listing.css';
import { cleanTitle, titleFromBrandModel } from '../utils/title';
import { formatPrice } from '../utils/format';
import FavoriteButton from './FavoriteButton';

interface Zdjecie { id: number; url?: string | null }
interface Ogloszenie {
  id: number;
  tytul: string;
  opis?: string;
  cena?: number | string | null;
  marka_id?: number;
  model_id?: number;
  marka?: { id: number; nazwa: string } | null;
  model?: { id: number; nazwa: string } | null;
  rok_produkcji?: number | null;
  zdjecia?: Zdjecie[];
}

type Props = {
  items: Ogloszenie[];
  loading?: boolean;
  error?: string | null;
};

const Listing: React.FC<Props> = ({ items, loading, error }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = useCallback((images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);
  const showPrev = useCallback(() => setLightboxIndex(i => (i - 1 + lightboxImages.length) % lightboxImages.length), [lightboxImages.length]);
  const showNext = useCallback(() => setLightboxIndex(i => (i + 1) % lightboxImages.length), [lightboxImages.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxOpen, closeLightbox, showPrev, showNext]);

  if (loading) return <p>Ładowanie ogłoszeń...</p>;
  if (error) return <p className="feedback error">{error}</p>;
  if (!items || items.length === 0) return <p className="empty">Brak ogłoszeń do wyświetlenia.</p>;

  return (
    <>
    <ul className="ogloszenia-list">
      {items.map((item) => {
        const firstPhoto = Array.isArray(item.zdjecia) && item.zdjecia.length > 0 ? (item.zdjecia[0]?.url ?? null) : null;
        const title = titleFromBrandModel(item.marka, item.model, cleanTitle(item.tytul));
        const price = typeof item.cena === 'string' ? Number(item.cena) : (item.cena as number | null);
        const images = Array.isArray(item.zdjecia) ? item.zdjecia.map(z => z?.url).filter(Boolean) as string[] : [];
        return (
          <li key={item.id} className="ogloszenie-item">
            <FavoriteButton
              listingId={item.id}
              className="listing-favorite-button"
            />
            <button type="button" className="thumb-wrapper" aria-label={title} onClick={() => images.length && openLightbox(images, 0)}>
              {firstPhoto ? (
                <img className="thumb" src={firstPhoto} alt={title} loading="lazy" decoding="async" />
              ) : (
                <div className="thumb placeholder">Brak zdjęcia</div>
              )}
            </button>

            <div className="card-body">
              <h3 className="card-title">
                <Link to={`/ogloszenie/${item.id}`}>{title}</Link>
              </h3>
              <div className="card-row">
                <span className="card-price">{formatPrice(price ?? null)}</span>
                <span className="card-year">{item.rok_produkcji ?? '—'}</span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
    {lightboxOpen && lightboxImages.length > 0 && (
      <div className="lightbox-overlay" onClick={closeLightbox}>
        <div className="lightbox-inner" onClick={e => e.stopPropagation()}>
          <button type="button" className="lightbox-close" onClick={closeLightbox} aria-label="Zamknij">×</button>
          {lightboxImages.length > 1 && (<button type="button" className="lightbox-prev" onClick={showPrev} aria-label="Poprzednie">‹</button>)}
          {lightboxImages.length > 1 && (<button type="button" className="lightbox-next" onClick={showNext} aria-label="Następne">›</button>)}
          <img src={lightboxImages[lightboxIndex]} alt={`Podgląd ${lightboxIndex + 1}`} className="lightbox-image" />
          {lightboxImages.length > 1 && (<div className="lightbox-counter">{lightboxIndex + 1} / {lightboxImages.length}</div>)}
        </div>
      </div>
    )}
    </>
  );
};

export default Listing;
