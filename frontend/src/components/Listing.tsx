import React from 'react';
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
  rok_produkcji?: number | string | null;
  przebieg?: number | string | null;
  rodzaj_paliwa?: string | null;
  moc_silnika?: number | string | null;
  pojemnosc_silnika?: number | string | null;
  skrzynia_biegow?: string | null;
  zdjecia?: Zdjecie[];
}

type Props = {
  items: Ogloszenie[];
  loading?: boolean;
  error?: string | null;
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

const Listing: React.FC<Props> = ({ items, loading, error }) => {

  if (loading) return <p>Ładowanie ogłoszeń...</p>;
  if (error) return <p className="feedback error">{error}</p>;
  if (!items || items.length === 0) return <p className="empty">Brak ogłoszeń do wyświetlenia.</p>;

  return (
    <>
    <ul className="ogloszenia-list">
      {items.map((item) => {
        const firstPhoto = Array.isArray(item.zdjecia) && item.zdjecia.length > 0 ? (item.zdjecia[0]?.url ?? null) : null;
        const fallbackTitle = titleFromBrandModel(item.marka, item.model, cleanTitle(item.tytul));
        const listingTitle = cleanTitle(item.tytul) || fallbackTitle;
        const price = typeof item.cena === 'string' ? Number(item.cena) : (item.cena as number | null);
        return (
          <li key={item.id} className="ogloszenie-item">
            <FavoriteButton
              listingId={item.id}
              className="listing-favorite-button"
            />
            <Link to={`/ogloszenie/${item.id}`} className="thumb-wrapper" aria-label={listingTitle}>
              {firstPhoto ? (
                <img className="thumb" src={firstPhoto} alt={listingTitle} loading="lazy" decoding="async" />
              ) : (
                <div className="thumb placeholder">Brak zdjęcia</div>
              )}
            </Link>

            <div className="card-body">
              <h3 className="card-title">
                <Link to={`/ogloszenie/${item.id}`}>{listingTitle}</Link>
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
