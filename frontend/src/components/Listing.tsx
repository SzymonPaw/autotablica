import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Listing.css';
import { cleanTitle, titleFromBrandModel } from '../utils/title';
import { formatPrice } from '../utils/format';
import FavoriteButton from './FavoriteButton';
import VerifiedBadge from './VerifiedBadge';
import { HistoriaPojazduSummary, isHistoryVerified, verifiedHistoryTitle } from '../utils/history';
import LoadingScreen from './common/LoadingScreen';

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
  rok_produkcji?: number | string | null;
  przebieg?: number | string | null;
  rodzaj_paliwa?: string | null;
  moc_silnika?: number | string | null;
  pojemnosc_silnika?: number | string | null;
  skrzynia_biegow?: string | null;
  zdjecia?: Zdjecie[];
  historia_pojazdu?: HistoriaPojazduSummary | null;
}

type Props = {
  items: Ogloszenie[];
  loading?: boolean;
  error?: string | null;
  showGalleryControls?: boolean;
};

const numberFormatter = new Intl.NumberFormat('pl-PL');
const MISSING_VALUE = 'Brak informacji';

const hasMeaningfulValue = (value?: number | string | null) => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'number') {
    return value !== 0;
  }
  const trimmed = value.trim();
  if (!trimmed) return false;
  const numeric = Number(trimmed);
  if (!Number.isNaN(numeric) && numeric === 0) {
    return false;
  }
  return true;
};

const parseNumeric = (value?: number | string | null) => {
  if (typeof value === 'number') {
    if (!Number.isFinite(value) || value === 0) return null;
    return value;
  }
  if (typeof value === 'string') {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed === 0) return null;
    return parsed;
  }
  return null;
};

const formatMileage = (value?: number | string | null) => {
  const numeric = parseNumeric(value);
  if (numeric === null) return MISSING_VALUE;
  return `${numberFormatter.format(Math.round(numeric))} km`;
};

const formatHorsepower = (value?: number | string | null) => {
  const numeric = parseNumeric(value);
  if (numeric === null) return MISSING_VALUE;
  return `${Math.round(numeric)} KM`;
};

const formatCapacity = (value?: number | string | null) => {
  const numeric = parseNumeric(value);
  if (numeric === null) return MISSING_VALUE;
  return `${numeric.toFixed(2)} l`;
};

const formatGeneric = (value?: number | string | null) => {
  if (!hasMeaningfulValue(value)) return MISSING_VALUE;
  if (typeof value === 'string') return value.trim();
  return String(value);
};

const Listing: React.FC<Props> = ({ items, loading, error, showGalleryControls = false }) => {
  const [photoIndexes, setPhotoIndexes] = useState<Record<number, number>>({});

  const updatePhotoIndex = (listingId: number, direction: 1 | -1, totalPhotos: number) => {
    if (totalPhotos <= 1) return;
    setPhotoIndexes((prev) => {
      const current = prev[listingId] ?? 0;
      const next = (current + direction + totalPhotos) % totalPhotos;
      if (next === current) return prev;
      return { ...prev, [listingId]: next };
    });
  };

  if (loading) return <LoadingScreen />;
  if (error) return <p className="feedback error">{error}</p>;
  if (!items || items.length === 0) return <p className="empty">Brak ogłoszeń do wyświetlenia.</p>;

  const listClasses = ['ogloszenia-list'];
  if (items.length === 1) {
    listClasses.push('single-card');
  }

  return (
    <>
    <ul className={listClasses.join(' ')}>
      {items.map((item) => {
        const photos = Array.isArray(item.zdjecia)
          ? item.zdjecia.filter((photo) => Boolean(photo?.url))
          : [];
        const totalPhotos = photos.length;
        const safeIndex = totalPhotos > 0 ? (photoIndexes[item.id] ?? 0) % totalPhotos : 0;
        const currentPhoto = totalPhotos > 0 ? (photos[safeIndex]?.url ?? null) : null;
        const firstPhoto = currentPhoto;
        const galleryEnabled = showGalleryControls && totalPhotos > 1;
        const fallbackTitle = titleFromBrandModel(item.marka, item.model, cleanTitle(item.tytul));
        const listingTitle = cleanTitle(item.tytul) || fallbackTitle;
        const price = typeof item.cena === 'string' ? Number(item.cena) : (item.cena as number | null);
        const verified = isHistoryVerified(item.historia_pojazdu);
        return (
          <li key={item.id} className="ogloszenie-item">
            <FavoriteButton
              listingId={item.id}
              className="listing-favorite-button"
            />
            <div className="thumb-wrapper">
              <Link to={`/ogloszenie/${item.id}`} className="thumb-link" aria-label={listingTitle}>
                {firstPhoto ? (
                  <img className="thumb" src={firstPhoto} alt={listingTitle} loading="lazy" decoding="async" />
                ) : (
                  <div className="thumb placeholder">Brak zdjęcia</div>
                )}
              </Link>
              {galleryEnabled && (
                <>
                  <button
                    type="button"
                    className="thumb-arrow prev"
                    aria-label="Poprzednie zdjęcie"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      updatePhotoIndex(item.id, -1, totalPhotos);
                    }}
                  >
                    <span aria-hidden="true">‹</span>
                  </button>
                  <button
                    type="button"
                    className="thumb-arrow next"
                    aria-label="Następne zdjęcie"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      updatePhotoIndex(item.id, 1, totalPhotos);
                    }}
                  >
                    <span aria-hidden="true">›</span>
                  </button>
                  <div className="thumb-counter" aria-live="polite">
                    {safeIndex + 1}/{totalPhotos}
                  </div>
                </>
              )}
            </div>

            <div className="card-body">
              <h3 className="card-title">
                <Link to={`/ogloszenie/${item.id}`}>{listingTitle}</Link>
                {verified && <VerifiedBadge title={verifiedHistoryTitle} />}
              </h3>
              <dl className="card-specs">
                <div className="spec-item">
                  <dt>Rok produkcji</dt>
                  <dd>{formatGeneric(item.rok_produkcji)}</dd>
                </div>
                <div className="spec-item">
                  <dt>Przebieg</dt>
                  <dd>{formatMileage(item.przebieg)}</dd>
                </div>
                <div className="spec-item">
                  <dt>Rodzaj paliwa</dt>
                  <dd>{formatGeneric(item.rodzaj_paliwa)}</dd>
                </div>
                <div className="spec-item">
                  <dt>Konie mechaniczne</dt>
                  <dd>{formatHorsepower(item.moc_silnika)}</dd>
                </div>
                <div className="spec-item">
                  <dt>Pojemność silnika</dt>
                  <dd>{formatCapacity(item.pojemnosc_silnika)}</dd>
                </div>
                <div className="spec-item">
                  <dt>Skrzynia biegów</dt>
                  <dd>{formatGeneric(item.skrzynia_biegow)}</dd>
                </div>
              </dl>
              <div className="card-price-row">
                <span className="card-price">{formatPrice(price ?? null)}</span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
    </>
  );
};

export default Listing;
