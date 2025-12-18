import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Listing from '../components/Listing';
import {
  fetchListings,
  fetchBrands,
  fetchModels,
  fetchPopularStats,
  MarkaDto,
  ModelDto,
  PopularStatsResponse,
} from '../api/client';
import { toSlug } from '../utils/slug';

interface Ogloszenie {
  id: number;
  uzytkownik_id: number;
  tytul: string;
  opis: string;
  cena: string;
  marka_id: number;
  model_id: number;
  vin: string;
  numer_rejestracyjny: string;
  data_pierwszej_rej: string;
  przebieg: number;
  rodzaj_paliwa: string;
  skrzynia_biegow: string;
  pojemnosc_silnika: string;
  status: string;
  created_at: string;
}

const Home: React.FC = () => {
  const [promoted, setPromoted] = useState<Ogloszenie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // Basic filters
  const [brands, setBrands] = useState<MarkaDto[]>([]);
  const [models, setModels] = useState<ModelDto[]>([]);
  const [markaId, setMarkaId] = useState<string>('');
  const [modelId, setModelId] = useState<string>('');
  const [cenaMin, setCenaMin] = useState<string>('');
  const [cenaMax, setCenaMax] = useState<string>('');
  const [rokMin, setRokMin] = useState<string>('');
  const [rokMax, setRokMax] = useState<string>('');
  const [popularStats, setPopularStats] = useState<PopularStatsResponse | null>(null);

  // Pobierz 12 najnowszych ogłoszeń do sekcji promowane
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const [brandsRes, res]: any = await Promise.all([
          fetchBrands().catch(() => []),
          fetchListings({ per_page: 12, sort: '-created_at' }),
        ]);
        const items = Array.isArray(res) ? res : (res?.data ?? []);
        if (!mounted) return;
        setBrands(brandsRes);
        setPromoted(items);
      } catch (err) {
        if (!mounted) return;
        const message = err instanceof Error ? err.message : 'Nie udało się pobrać promowanych ogłoszeń.';
        setError(message);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // Load models when brand changes
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        if (!markaId) {
          setModels([]);
          setModelId('');
          return;
        }
        const ms = await fetchModels(Number(markaId));
        if (!mounted) return;
        setModels(ms);
        setModelId(prev => {
          if (!prev) {
            return prev;
          }
          return ms.some(m => String(m.id) === prev) ? prev : '';
        });
      } catch {
        if (!mounted) return;
        setModels([]);
      }
    })();
    return () => { mounted = false; };
  }, [markaId]);

  useEffect(() => {
    let mounted = true;
    fetchPopularStats()
      .then((data) => {
        if (!mounted) return;
        setPopularStats(data);
      })
      .catch(() => {
        if (!mounted) return;
        setPopularStats({ brands: [], models: [] });
      });
    return () => { mounted = false; };
  }, []);

  const brandColumns = useMemo(() => {
    if (!popularStats) return [];
    return Array.from({ length: 2 }, (_, idx) =>
      popularStats.brands.slice(idx * 5, idx * 5 + 5)
    );
  }, [popularStats]);

  const modelColumns = useMemo(() => {
    if (!popularStats) return [];
    return Array.from({ length: 2 }, (_, idx) =>
      popularStats.models.slice(idx * 5, idx * 5 + 5)
    );
  }, [popularStats]);

  const hasPopularData = useMemo(() => {
    if (!popularStats) return false;
    return (popularStats.brands?.length ?? 0) > 0 || (popularStats.models?.length ?? 0) > 0;
  }, [popularStats]);

  const applyBasicFilters = async () => {
    try {
      setLoading(true);
      setError(null);
      const params: Record<string, any> = { per_page: 12, sort: '-created_at' };
      if (markaId) params.marka_id = Number(markaId);
      if (modelId) params.model_id = Number(modelId);
      if (cenaMin) params.cena_min = Number(cenaMin);
      if (cenaMax) params.cena_max = Number(cenaMax);
      if (rokMin) params.rok_min = Number(rokMin);
      if (rokMax) params.rok_max = Number(rokMax);
      const res: any = await fetchListings(params);
      const items = Array.isArray(res) ? res : (res?.data ?? []);
      setPromoted(items);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Nie udało się zastosować filtrów.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App home-page">
      <main className="main-content">
        <section className="listings promoted full-width">
          <div className="promoted-inner">
            <div className="listings-header">
              <h2>Najnowsze ogłoszenia</h2>
            </div>

            <div className="basic-filters">
              <label>
                Marka
                <select name="marka" value={markaId} onChange={(e) => setMarkaId(e.target.value)}>
                  <option value="">Wszystkie</option>
                  {brands.map(b => (
                    <option key={b.id} value={b.id}>{b.nazwa}</option>
                  ))}
                </select>
              </label>
              <label>
                Model
                <select name="model" value={modelId} onChange={(e) => setModelId(e.target.value)} disabled={!markaId}>
                  <option value="">Wszystkie</option>
                  {models.map(m => (
                    <option key={m.id} value={m.id}>{m.nazwa}</option>
                  ))}
                </select>
              </label>
              <label>
                Cena od
                <input type="number" min="0" step="1000" value={cenaMin} onChange={(e) => setCenaMin(e.target.value)} />
              </label>
              <label>
                Cena do
                <input type="number" min="0" step="1000" value={cenaMax} onChange={(e) => setCenaMax(e.target.value)} />
              </label>
              <label>
                Rok od
                <input type="number" min="1900" max={new Date().getFullYear()} value={rokMin} onChange={(e) => setRokMin(e.target.value)} />
              </label>
              <label>
                Rok do
                <input type="number" min="1900" max={new Date().getFullYear()} value={rokMax} onChange={(e) => setRokMax(e.target.value)} />
              </label>
              <div className="actions">
                <button className="btn-primary" type="button" onClick={applyBasicFilters}>Filtruj</button>
                <Link to="/ogloszenia" className="btn-secondary">Pokaż wszystkie filtry</Link>
              </div>
            </div>

            <Listing
              items={promoted}
              loading={loading}
              error={error}
              showGalleryControls
            />

            <div className="load-more">
              <Link to="/ogloszenia" className="btn-secondary">Pokaż wszystkie ogłoszenia</Link>
            </div>
          </div>
        </section>

        {popularStats && (
          <section className="popular-section">
            <div className="popular-inner">
              <div className="popular-header">
                <h3>Najpopularniejsze marki i modele</h3>
                <p>Zobacz, które ogłoszenia cieszą się obecnie największym zainteresowaniem.</p>
              </div>
              {hasPopularData ? (
                <div className="popular-grid">
                  {brandColumns.map((column, idx) => (
                    <div key={`brand-col-${idx}`} className="popular-column">
                      <p className="column-label">Marki</p>
                      <ul>
                        {column.map((item) => {
                          const slug = toSlug(item.nazwa);
                          return (
                            <li key={item.id}>
                              <Link to={`/marka/${slug}`}>{item.nazwa}</Link>
                              <span className="popular-count">({item.listings_count})</span>
                            </li>
                          );
                        })}
                        {!column.length && <li className="placeholder">Brak danych</li>}
                      </ul>
                    </div>
                  ))}
                  {modelColumns.map((column, idx) => (
                    <div key={`model-col-${idx}`} className="popular-column">
                      <p className="column-label">Modele</p>
                      <ul>
                        {column.map((item) => {
                          const brandSlug = toSlug(item.marka_nazwa);
                          const modelSlug = toSlug(item.nazwa);
                          return (
                            <li key={item.id}>
                              <Link to={`/marka/${brandSlug}/${modelSlug}`}>
                                {item.marka_nazwa} {item.nazwa}
                              </Link>
                              <span className="popular-count">({item.listings_count})</span>
                            </li>
                          );
                        })}
                        {!column.length && <li className="placeholder">Brak danych</li>}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="popular-empty">Brak aktualnych danych o popularności.</p>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Home;
