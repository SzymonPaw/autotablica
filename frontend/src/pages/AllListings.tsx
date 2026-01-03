import React, { useEffect, useState } from 'react';
import { fetchBrands, fetchListings, fetchModels, MarkaDto, ModelDto } from '../api/client';
import Listing from '../components/Listing';
import SearchBar from '../components/SearchBar';
import './Home.css';

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

type ApiResponse = {
  data: Ogloszenie[];
  meta?: {
    current_page: number;
    last_page: number;
  };
};

function handlePagination(res: unknown, currentPage: number): { items: Ogloszenie[]; more: boolean } {
  let items: Ogloszenie[] = [];
  let more = false;

  if (Array.isArray(res)) {
    items = res;
    more = items.length > 0;
  } else if (res && typeof res === 'object') {
    const response = res as ApiResponse;
    if ('data' in response) {
      items = response.data;
      if (response.meta) {
        const current = response.meta.current_page ?? currentPage;
        const last = response.meta.last_page ?? null;
        more = last ? current < last : items.length > 0;
      } else {
        more = items.length > 0;
      }
    }
  }

  return { items, more };
}

const AllListings: React.FC = () => {
  const [ogloszenia, setOgloszenia] = useState<Ogloszenie[]>([]);
  const [ogloszeniaError, setOgloszeniaError] = useState<string | null>(null);
  const [loadingOgloszenia, setLoadingOgloszenia] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  // Filtry
  const [brands, setBrands] = useState<MarkaDto[]>([]);
  const [models, setModels] = useState<ModelDto[]>([]);
  const [markaId, setMarkaId] = useState<string>('');
  const [modelId, setModelId] = useState<string>('');
  const [cenaMin, setCenaMin] = useState<string>('');
  const [cenaMax, setCenaMax] = useState<string>('');
  const [rokMin, setRokMin] = useState<string>('');
  const [rokMax, setRokMax] = useState<string>('');
  const [paliwo, setPaliwo] = useState<string>('');
  const [przebiegMin, setPrzebiegMin] = useState<string>('');
  const [przebiegMax, setPrzebiegMax] = useState<string>('');
  const [mocMin, setMocMin] = useState<string>('');
  const [mocMax, setMocMax] = useState<string>('');
  const [pojemnoscMin, setPojemnoscMin] = useState<string>('');
  const [pojemnoscMax, setPojemnoscMax] = useState<string>('');
  const [skrzynia, setSkrzynia] = useState<string>('');
  const [naped, setNaped] = useState<string>('');
  const [kolor, setKolor] = useState<string>('');
  const [stan, setStan] = useState<string>('');
  const [liczbaDrzwi, setLiczbaDrzwi] = useState<string>('');
  const [liczbaMiejsc, setLiczbaMiejsc] = useState<string>('');
  const [bezwypadkowy, setBezwypadkowy] = useState<boolean>(false);
  const [pierwszyWlasciciel, setPierwszyWlasciciel] = useState<boolean>(false);
  const [serwisowanyWASO, setSerwisowanyWASO] = useState<boolean>(false);
  const [zarejestrowanyWPolsce, setZarejestrowanyWPolsce] = useState<boolean>(false);
  const [metalik, setMetalik] = useState<boolean>(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);

  const buildFilterParams = (initial: Record<string, any> = {}) => {
    const params: Record<string, any> = { ...initial };

    if (search.trim()) params.q = search.trim();
    if (markaId) params.marka_id = Number(markaId);
    if (modelId) params.model_id = Number(modelId);
    if (cenaMin) params.cena_min = Number(cenaMin);
    if (cenaMax) params.cena_max = Number(cenaMax);
    if (rokMin) params.rok_min = Number(rokMin);
    if (rokMax) params.rok_max = Number(rokMax);
    if (paliwo) params.paliwo = paliwo;
    if (przebiegMin) params.przebieg_min = Number(przebiegMin);
    if (przebiegMax) params.przebieg_max = Number(przebiegMax);
    if (mocMin) params.moc_min = Number(mocMin);
    if (mocMax) params.moc_max = Number(mocMax);
    if (pojemnoscMin) params.pojemnosc_min = Number(pojemnoscMin);
    if (pojemnoscMax) params.pojemnosc_max = Number(pojemnoscMax);
    if (skrzynia) params.skrzynia_biegow = skrzynia;
    if (naped) params.naped = naped;
    if (stan) params.stan = stan;
    if (kolor.trim()) params.kolor = kolor.trim();
    if (liczbaDrzwi) params.liczba_drzwi = Number(liczbaDrzwi);
    if (liczbaMiejsc) params.liczba_miejsc = Number(liczbaMiejsc);
    if (bezwypadkowy) params.bezwypadkowy = true;
    if (pierwszyWlasciciel) params.pierwszy_wlasciciel = true;
    if (serwisowanyWASO) params.serwisowany_w_aso = true;
    if (zarejestrowanyWPolsce) params.zarejestrowany_w_polsce = true;
    if (metalik) params.metalik = true;

    return params;
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoadingOgloszenia(true);
        setOgloszeniaError(null);
        const [brandsRes, listRes] = await Promise.all([
          fetchBrands().catch(() => []),
          fetchListings({ page: 1 }),
        ]);
        if (!mounted) return;
        setBrands(brandsRes);
        const { items, more } = handlePagination(listRes, 1);
        setOgloszenia(items);
        setPage(1);
        setHasMore(more);
      } catch (err) {
        if (!mounted) return;
        const message = err instanceof Error ? err.message : 'Nie udało się pobrać ogłoszeń.';
        setOgloszeniaError(message);
      } finally {
        if (!mounted) return;
        setLoadingOgloszenia(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    let mounted = true;
    async function loadModels() {
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
    }
    loadModels();
    return () => { mounted = false; };
  }, [markaId]);

  const applyFilters = async () => {
    try {
      setLoadingOgloszenia(true);
      setOgloszeniaError(null);

      const params = buildFilterParams({ page: 1 });

      const res = await fetchListings(params);
      const { items, more } = handlePagination(res, 1);
      setOgloszenia(items);
      setPage(1);
      setHasMore(more);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Nie udało się pobrać ogłoszeń.';
      setOgloszeniaError(message);
    } finally {
      setLoadingOgloszenia(false);
    }
  };

  const resetFilters = async () => {
    setSearch('');
    setMarkaId('');
    setModelId('');
    setModels([]);
    setCenaMin('');
    setCenaMax('');
    setRokMin('');
    setRokMax('');
    setPaliwo('');
    setPrzebiegMin('');
    setPrzebiegMax('');
    setMocMin('');
    setMocMax('');
    setPojemnoscMin('');
    setPojemnoscMax('');
    setSkrzynia('');
    setNaped('');
    setKolor('');
    setStan('');
    setLiczbaDrzwi('');
    setLiczbaMiejsc('');
    setBezwypadkowy(false);
    setPierwszyWlasciciel(false);
    setSerwisowanyWASO(false);
    setZarejestrowanyWPolsce(false);
    setMetalik(false);

    try {
      setLoadingOgloszenia(true);
      setOgloszeniaError(null);
      const res = await fetchListings({ page: 1 });
      const { items, more } = handlePagination(res, 1);
      setOgloszenia(items);
      setPage(1);
      setHasMore(more);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Nie udało się pobrać ogłoszeń.';
      setOgloszeniaError(message);
    } finally {
      setLoadingOgloszenia(false);
    }
  };

  const handleLoadMore = async () => {
    if (loadingMore) return;
    const next = page + 1;
    setLoadingMore(true);

    try {
      const params = buildFilterParams({ page: next });

      const res = await fetchListings(params);
      const { items, more } = handlePagination(res, next);
      setOgloszenia(prev => [...prev, ...items]);
      setPage(next);
      setHasMore(more);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Nie udało się pobrać kolejnej strony ogłoszeń.';
      setOgloszeniaError(message);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="App">
      <main className="main-content">
        <div className="filters-section">
          <h2>Filtry</h2>
          <div className="filter-group">
            <label>
              Marka
              <select name="marka" value={markaId} onChange={(e) => setMarkaId(e.target.value)}>
                <option value="">Wszystkie marki</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>{b.nazwa}</option>
                ))}
              </select>
            </label>
            <label>
              Model
              <select name="model" value={modelId} onChange={(e) => setModelId(e.target.value)} disabled={!markaId}>
                <option value="">Wszystkie modele</option>
                {models.map((m) => (
                  <option key={m.id} value={m.id}>{m.nazwa}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="filter-group">
            <label>
              Cena od
              <input type="number" min="0" step="1000" value={cenaMin} onChange={(e) => setCenaMin(e.target.value)} />
            </label>
            <label>
              Cena do
              <input type="number" min="0" step="1000" value={cenaMax} onChange={(e) => setCenaMax(e.target.value)} />
            </label>
          </div>

          <div className="filter-group">
            <label>
              Rok produkcji od
              <input type="number" min="1900" max={new Date().getFullYear()} value={rokMin} onChange={(e) => setRokMin(e.target.value)} />
            </label>
            <label>
              Rok produkcji do
              <input type="number" min="1900" max={new Date().getFullYear()} value={rokMax} onChange={(e) => setRokMax(e.target.value)} />
            </label>
          </div>

          <div className="filter-group">
            <label>
              Rodzaj paliwa
              <select value={paliwo} onChange={(e) => setPaliwo(e.target.value)}>
                <option value="">Wszystkie</option>
                <option value="benzyna">Benzyna</option>
                <option value="diesel">Diesel</option>
                <option value="lpg">LPG</option>
                <option value="elektryczny">Elektryczny</option>
                <option value="hybryda">Hybryda</option>
              </select>
            </label>
          </div>

          <button
            type="button"
            className={`advanced-toggle ${showAdvancedFilters ? 'is-open' : ''}`}
            onClick={() => setShowAdvancedFilters((prev) => !prev)}
          >
            {showAdvancedFilters ? 'Ukryj zaawansowane filtry' : 'Pokaż zaawansowane filtry'}
          </button>

          {showAdvancedFilters && (
            <div className="advanced-filters">
              <div className="filter-grid">
                <label>
                  Przebieg od
                  <input type="number" min="0" value={przebiegMin} onChange={(e) => setPrzebiegMin(e.target.value)} />
                </label>
                <label>
                  Przebieg do
                  <input type="number" min="0" value={przebiegMax} onChange={(e) => setPrzebiegMax(e.target.value)} />
                </label>
                <label>
                  Moc silnika od (KM)
                  <input type="number" min="0" value={mocMin} onChange={(e) => setMocMin(e.target.value)} />
                </label>
                <label>
                  Moc silnika do (KM)
                  <input type="number" min="0" value={mocMax} onChange={(e) => setMocMax(e.target.value)} />
                </label>
                <label>
                  Pojemność od (cm³)
                  <input type="number" min="0" value={pojemnoscMin} onChange={(e) => setPojemnoscMin(e.target.value)} />
                </label>
                <label>
                  Pojemność do (cm³)
                  <input type="number" min="0" value={pojemnoscMax} onChange={(e) => setPojemnoscMax(e.target.value)} />
                </label>
                <label>
                  Skrzynia biegów
                  <select value={skrzynia} onChange={(e) => setSkrzynia(e.target.value)}>
                    <option value="">Dowolna</option>
                    <option value="manualna">Manualna</option>
                    <option value="automatyczna">Automatyczna</option>
                    <option value="polautomatyczna">Półautomatyczna</option>
                  </select>
                </label>
                <label>
                  Napęd
                  <select value={naped} onChange={(e) => setNaped(e.target.value)}>
                    <option value="">Dowolny</option>
                    <option value="przedni">Przedni</option>
                    <option value="tylny">Tylny</option>
                    <option value="4x4">4x4</option>
                  </select>
                </label>
                <label>
                  Stan
                  <select value={stan} onChange={(e) => setStan(e.target.value)}>
                    <option value="">Dowolny</option>
                    <option value="nowy">Nowy</option>
                    <option value="uzywany">Używany</option>
                    <option value="uszkodzony">Uszkodzony</option>
                  </select>
                </label>
                <label>
                  Kolor
                  <input type="text" value={kolor} onChange={(e) => setKolor(e.target.value)} placeholder="np. Czarny" />
                </label>
                <label>
                  Liczba drzwi
                  <select value={liczbaDrzwi} onChange={(e) => setLiczbaDrzwi(e.target.value)}>
                    <option value="">Dowolna</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </label>
                <label>
                  Liczba miejsc
                  <select value={liczbaMiejsc} onChange={(e) => setLiczbaMiejsc(e.target.value)}>
                    <option value="">Dowolna</option>
                    <option value="2">2</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="7">7</option>
                  </select>
                </label>
              </div>

              <div className="advanced-checkboxes">
                <label>
                  <input
                    type="checkbox"
                    checked={bezwypadkowy}
                    onChange={(e) => setBezwypadkowy(e.target.checked)}
                  />
                  Bezwypadkowy
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={pierwszyWlasciciel}
                    onChange={(e) => setPierwszyWlasciciel(e.target.checked)}
                  />
                  Pierwszy właściciel
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={serwisowanyWASO}
                    onChange={(e) => setSerwisowanyWASO(e.target.checked)}
                  />
                  Serwisowany w ASO
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={zarejestrowanyWPolsce}
                    onChange={(e) => setZarejestrowanyWPolsce(e.target.checked)}
                  />
                  Zarejestrowany w Polsce
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={metalik}
                    onChange={(e) => setMetalik(e.target.checked)}
                  />
                  Lakier metalik
                </label>
              </div>
            </div>
          )}

          <div className="filter-actions">
            <button className="btn-primary" onClick={applyFilters}>Filtruj</button>
            <button className="btn-secondary" onClick={resetFilters}>Wyczyść</button>
          </div>
        </div>

        <section className="listings all-listings">
          <div className="listings-header">
            <h2>Wszystkie ogłoszenia</h2>
            <SearchBar value={search} onChange={setSearch} onEnter={applyFilters} />
          </div>

          <Listing items={ogloszenia} loading={loadingOgloszenia} error={ogloszeniaError} />

          {hasMore && (
            <div className="load-more">
              <button type="button" onClick={handleLoadMore} disabled={loadingMore}>
                {loadingMore ? 'Ładowanie...' : 'Pokaż więcej'}
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AllListings;