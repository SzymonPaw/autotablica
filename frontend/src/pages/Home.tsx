import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Listing from '../components/Listing';
import { fetchListings, fetchBrands, fetchModels, MarkaDto, ModelDto } from '../api/client';

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

            <Listing items={promoted} loading={loading} error={error} />

            <div className="load-more">
              <Link to="/ogloszenia" className="btn-secondary">Pokaż wszystkie ogłoszenia</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
