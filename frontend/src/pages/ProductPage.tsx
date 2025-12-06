import React, { useEffect, useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../App.css';
import { fetchListingById } from '../api/client';
import { cleanTitle, titleFromBrandModel } from '../utils/title';
import { formatMileage, formatPowerKMkW, formatEngineCapacity, mapFuel, mapGearbox, mapDrive, formatDatePL, formatPrice, formatBoolean } from '../utils/format';

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
  zdjecia?: Zdjecie[];
  [key: string]: any;
}

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<OgloszenieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mainIndex, setMainIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    setLoading(true);
    setError(null);

    fetchListingById(id)
      .then((data) => {
        if (!mounted) return;
        setItem(data);
        setMainIndex(0);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err?.message || 'Nie udało się pobrać ogłoszenia.');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, [id]);

  // Ustawianie tytułu zakładki przeglądarki na "Marka Model — AutoTablica"
  useEffect(() => {
    const baseTitle = 'AutoTablica';
    if (item) {
      const title = [item.marka?.nazwa, item.model?.nazwa].filter(Boolean).join(' ');
      document.title = title ? `${title} — ${baseTitle}` : baseTitle;
    } else {
      document.title = baseTitle;
    }
    return () => { document.title = baseTitle; };
  }, [item]);

  const images = Array.isArray(item?.zdjecia) ? item!.zdjecia!.filter(z => z && z.url) : [];
  const main = images.length > 0 ? images[mainIndex]?.url ?? null : null;

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const showPrev = useCallback(() => {
    setLightboxIndex(prev => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const showNext = useCallback(() => {
    setLightboxIndex(prev => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        showPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        showNext();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, closeLightbox, showPrev, showNext]);
  const computedTitle = titleFromBrandModel(item?.marka, item?.model, cleanTitle(item?.tytul ?? '')) || 'Ogłoszenie';

  if (loading) return <p>Ładowanie ogłoszenia...</p>;
  if (error) return <p className="feedback error">{error}</p>;
  if (!item) return <p className="empty">Brak ogłoszenia.</p>;

  return (
    <>
      <div style={{marginTop: '70px', marginBottom: '0.75rem'}}>
        <Link to="/" className="back-link" style={{textDecoration: 'none', color: '#3498db'}}>
          ← Wróć na stronę główną
        </Link>
      </div>
      <article className="ogloszenie-detail card">
      <div className="detail-grid">
        <div className="gallery">
          {main ? (
            <img
              className="main-image"
              src={main}
              alt={computedTitle}
              onClick={() => openLightbox(mainIndex)}
              style={{cursor: images.length > 0 ? 'zoom-in' : 'default'}}
            />
          ) : (
            <div className="no-image">Brak zdjęcia</div>
          )}

          {images.length > 1 && (
            <div className="thumbnails">
              {images.map((img, idx) => (
                <button
                  key={img.id ?? idx}
                  type="button"
                  className={`thumb ${idx === mainIndex ? 'active' : ''}`}
                  onClick={() => { setMainIndex(idx); openLightbox(idx); }}
                >
                  <img src={img.url ?? ''} alt={`${computedTitle} ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="info">
          <h1>{computedTitle}</h1>
          <p className="price"><strong>Cena:</strong> {formatPrice(typeof item.cena === 'string' ? Number(item.cena) : item.cena as number)} </p>

          <div className="meta">
            <p><strong>Marka:</strong> {item.marka?.nazwa ?? '—'}</p>
            <p><strong>Model:</strong> {item.model?.nazwa ?? '—'}</p>
          </div>

          <section className="spec">
            <h3>Specyfikacja</h3>
            <dl className="ogloszenie-details">
              <div><dt>VIN</dt><dd>{item.vin ?? '—'}</dd></div>
              <div><dt>Nr rejestracyjny</dt><dd>{item.numer_rejestracyjny ?? '—'}</dd></div>
              <div><dt>Data I rejestracji</dt><dd>{formatDatePL(item.data_pierwszej_rej as string)}</dd></div>
              <div><dt>Rok produkcji</dt><dd>{item.rok_produkcji ?? '—'}</dd></div>
              <div><dt>Przebieg</dt><dd>{formatMileage(item.przebieg as number)}</dd></div>
              <div><dt>Rodzaj paliwa</dt><dd>{mapFuel(item.rodzaj_paliwa as string)}</dd></div>
              <div><dt>Skrzynia biegów</dt><dd>{mapGearbox(item.skrzynia_biegow as string)}</dd></div>
              <div><dt>Poj. silnika</dt><dd>{formatEngineCapacity(item.pojemnosc_silnika as number)}</dd></div>
              <div><dt>Moc</dt><dd>{formatPowerKMkW(item.moc_silnika as number)}</dd></div>
              <div><dt>Napęd</dt><dd>{mapDrive(item.naped as string)}</dd></div>
              <div><dt>Liczba drzwi</dt><dd>{item.liczba_drzwi ?? '—'}</dd></div>
              <div><dt>Liczba miejsc</dt><dd>{item.liczba_miejsc ?? '—'}</dd></div>
              <div><dt>Kolor</dt><dd>{item.kolor ?? '—'}</dd></div>
              <div><dt>Metalik</dt><dd>{formatBoolean(item.metalik as boolean)}</dd></div>
              <div><dt>Stan</dt><dd>{item.stan ?? '—'}</dd></div>
              <div><dt>Wypadkowy</dt><dd>{formatBoolean(item.wypadkowy as boolean)}</dd></div>
              <div><dt>Zarejestrowany w PL</dt><dd>{formatBoolean(item.zarejestrowany_w_polsce as boolean)}</dd></div>
              <div><dt>Pierwszy właściciel</dt><dd>{formatBoolean(item.pierwszy_wlasciciel as boolean)}</dd></div>
              <div><dt>Serwisowany w ASO</dt><dd>{formatBoolean(item.serwisowany_w_aso as boolean)}</dd></div>
              <div><dt>Bezwypadkowy</dt><dd>{formatBoolean(item.bezwypadkowy as boolean)}</dd></div>
            </dl>
          </section>

          <section className="description">
            <h3>Opis</h3>
            <p>{item.opis ?? 'Brak opisu.'}</p>
          </section>

          <section className="contact">
            <h3>Kontakt</h3>
            <p>Kontakt do sprzedawcy pojawi się tutaj (do zaimplementowania).</p>
          </section>

          <p className="timestamp">Dodano: {item.created_at ? new Date(item.created_at).toLocaleString() : '—'}</p>
        </div>
      </div>
    </article>
    {lightboxOpen && images.length > 0 && (
      <div className="lightbox-overlay" onClick={closeLightbox}>
        <div className="lightbox-inner" onClick={e => e.stopPropagation()}>
          <button type="button" className="lightbox-close" onClick={closeLightbox} aria-label="Zamknij podgląd">×</button>
          {images.length > 1 && (
            <button type="button" className="lightbox-prev" onClick={showPrev} aria-label="Poprzednie zdjęcie">‹</button>
          )}
          {images.length > 1 && (
            <button type="button" className="lightbox-next" onClick={showNext} aria-label="Następne zdjęcie">›</button>
          )}
          <img
            src={images[lightboxIndex]?.url ?? ''}
            alt={`${computedTitle} podgląd ${lightboxIndex + 1}`}
            className="lightbox-image"
          />
          {images.length > 1 && (
            <div className="lightbox-counter">{lightboxIndex + 1} / {images.length}</div>
          )}
        </div>
      </div>
    )}
    </>
  );
};

export default ProductPage;
