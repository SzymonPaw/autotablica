import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [selectedModels, setSelectedModels] = useState<number[]>([]);
  const [cenaMin, setCenaMin] = useState<string>('');
  const [cenaMax, setCenaMax] = useState<string>('');
  const [rokMin, setRokMin] = useState<string>('');
  const [rokMax, setRokMax] = useState<string>('');
  const [popularStats, setPopularStats] = useState<PopularStatsResponse | null>(null);
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const [brandSearch, setBrandSearch] = useState('');
  const [modelSearch, setModelSearch] = useState('');
  const brandDropdownRef = useRef<HTMLDivElement | null>(null);
  const modelDropdownRef = useRef<HTMLDivElement | null>(null);
  const filtersInitializedRef = useRef(false);
  const dropdownOverlayActive = brandDropdownOpen || modelDropdownOpen;

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

  // Load models when a single brand is selected
  useEffect(() => {
    let mounted = true;

    if (selectedBrands.length !== 1) {
      setModels([]);
      setSelectedModels([]);
      return () => { mounted = false; };
    }

    const brandId = selectedBrands[0];

    (async () => {
      try {
        const ms = await fetchModels(brandId);
        if (!mounted) return;
        setModels(ms);
        setSelectedModels(prev => prev.filter((id) => ms.some((model) => model.id === id)));
      } catch {
        if (!mounted) return;
        setModels([]);
        setSelectedModels([]);
      }
    })();

    return () => { mounted = false; };
  }, [selectedBrands]);

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

  const modelsDisabled = selectedBrands.length !== 1;

  const filteredBrands = useMemo(() => {
    const query = brandSearch.trim().toLowerCase();
    if (!query) return brands;
    return brands.filter((brand) => brand.nazwa.toLowerCase().includes(query));
  }, [brandSearch, brands]);

  const filteredModels = useMemo(() => {
    if (!models.length) return [];
    const query = modelSearch.trim().toLowerCase();
    if (!query) return models;
    return models.filter((model) => model.nazwa.toLowerCase().includes(query));
  }, [modelSearch, models]);

  const toggleBrand = (brandId: number) => {
    setSelectedBrands(prev =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
  };

  const toggleModel = (modelId: number) => {
    setSelectedModels(prev =>
      prev.includes(modelId)
        ? prev.filter((id) => id !== modelId)
        : [...prev, modelId]
    );
  };

  const formatSummary = (
    selectedIds: number[],
    dictionary: { id: number; nazwa: string }[],
    emptyLabel: string,
    fallbackLabel: (count: number) => string
  ): string => {
    if (!selectedIds.length) {
      return emptyLabel;
    }

    const names = selectedIds
      .map((id) => dictionary.find((item) => item.id === id)?.nazwa)
      .filter((name): name is string => Boolean(name));

    if (names.length === 1) {
      return names[0];
    }

    if (names.length >= 2) {
      const [first, second] = names;
      if (names.length === 2) {
        return `${first}, ${second}`;
      }
      return `${first}, ${second} +${names.length - 2}`;
    }

    return fallbackLabel(selectedIds.length);
  };

  const brandSummary = useMemo(() => (
    formatSummary(selectedBrands, brands, 'Wszystkie marki', (count) => `${count} marki`)
  ), [selectedBrands, brands]);

  const modelSummary = useMemo(() => {
    if (modelsDisabled) {
      return 'Wybierz jedną markę';
    }
    return formatSummary(selectedModels, models, 'Wszystkie modele', (count) => `${count} modeli`);
  }, [selectedModels, models, modelsDisabled]);

  useEffect(() => {
    if (!brandDropdownOpen) return undefined;

    const handleClickOutside = (event: MouseEvent) => {
      if (!brandDropdownRef.current) return;
      if (!brandDropdownRef.current.contains(event.target as Node)) {
        setBrandDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [brandDropdownOpen]);

  useEffect(() => {
    if (!modelDropdownOpen) return undefined;

    const handleClickOutside = (event: MouseEvent) => {
      if (!modelDropdownRef.current) return;
      if (!modelDropdownRef.current.contains(event.target as Node)) {
        setModelDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [modelDropdownOpen]);

  useEffect(() => {
    if (modelsDisabled) {
      setModelDropdownOpen(false);
      setModelSearch('');
    }
  }, [modelsDisabled]);

  useEffect(() => {
    if (!brandDropdownOpen) {
      setBrandSearch('');
    }
  }, [brandDropdownOpen]);

  useEffect(() => {
    if (!modelDropdownOpen) {
      setModelSearch('');
    }
  }, [modelDropdownOpen]);

  const applyBasicFilters = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params: Record<string, any> = { per_page: 12, sort: '-created_at' };
      if (selectedBrands.length === 1) {
        params.marka_id = selectedBrands[0];
      } else if (selectedBrands.length > 1) {
        params.marka_ids = selectedBrands;
      }
      if (selectedModels.length === 1) {
        params.model_id = selectedModels[0];
      } else if (selectedModels.length > 1) {
        params.model_ids = selectedModels;
      }
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
  }, [selectedBrands, selectedModels, cenaMin, cenaMax, rokMin, rokMax]);

  useEffect(() => {
    if (!filtersInitializedRef.current) {
      filtersInitializedRef.current = true;
      return;
    }

    const timeoutId = window.setTimeout(() => {
      applyBasicFilters();
    }, 450);

    return () => window.clearTimeout(timeoutId);
  }, [applyBasicFilters]);

  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedModels([]);
    setCenaMin('');
    setCenaMax('');
    setRokMin('');
    setRokMax('');
    setBrandSearch('');
    setModelSearch('');
    setBrandDropdownOpen(false);
    setModelDropdownOpen(false);
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
              {dropdownOverlayActive && (
                <div
                  className="dropdown-overlay"
                  onClick={() => {
                    setBrandDropdownOpen(false);
                    setModelDropdownOpen(false);
                  }}
                />
              )}
              <div className="filter-field multi-select-field" ref={brandDropdownRef}>
                <span className="filter-label">Marki</span>
                <div className={`multi-select ${brandDropdownOpen ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="multi-select-trigger"
                    onClick={() => setBrandDropdownOpen((prev) => !prev)}
                    aria-haspopup="listbox"
                    aria-expanded={brandDropdownOpen}
                    aria-controls="brand-multi-select"
                  >
                    <span className="multi-select-summary">{brandSummary}</span>
                    {selectedBrands.length > 0 && (
                      <span className="selection-count">{selectedBrands.length}</span>
                    )}
                    <span className="multi-select-chevron">▾</span>
                  </button>
                  {brandDropdownOpen && (
                    <div className="multi-select-dropdown" id="brand-multi-select" role="listbox" aria-multiselectable="true">
                      {brands.length ? (
                        <>
                          <div className="multi-select-header">
                            <div className="multi-select-search">
                              <input
                                type="text"
                                placeholder="Szukaj marki..."
                                value={brandSearch}
                                onChange={(event) => setBrandSearch(event.target.value)}
                                aria-label="Szukaj marki"
                                autoFocus
                              />
                            </div>
                            <button type="button" onClick={() => setSelectedBrands([])}>Wyczyść wybór</button>
                          </div>
                          {filteredBrands.length ? (
                            <ul className="multi-select-options">
                              {filteredBrands.map((brand) => (
                                <li key={brand.id}>
                                  <label
                                    className={`multi-select-option ${selectedBrands.includes(brand.id) ? 'is-checked' : ''}`}
                                  >
                                    <span className="option-text">
                                      <span className="option-name">{brand.nazwa}</span>
                                      <span className="option-count">({brand.ogloszenia_count ?? 0})</span>
                                    </span>
                                    <span className="option-switch">
                                      <input
                                        type="checkbox"
                                        checked={selectedBrands.includes(brand.id)}
                                        onChange={() => toggleBrand(brand.id)}
                                        className="switch-input"
                                      />
                                      <span className="switch-visual" aria-hidden="true" />
                                    </span>
                                  </label>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="multi-select-empty">Brak marek spełniających kryteria.</p>
                          )}
                        </>
                      ) : (
                        <p className="multi-select-empty">Brak marek do wyświetlenia.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="filter-field multi-select-field" ref={modelDropdownRef}>
                <span className="filter-label">Modele</span>
                <div className={`multi-select ${modelDropdownOpen ? 'is-open' : ''} ${modelsDisabled ? 'disabled' : ''}`}>
                  <button
                    type="button"
                    className="multi-select-trigger"
                    onClick={() => setModelDropdownOpen((prev) => !prev)}
                    aria-haspopup="listbox"
                    aria-expanded={modelDropdownOpen}
                    aria-controls="model-multi-select"
                    disabled={modelsDisabled}
                  >
                    <span className="multi-select-summary">{modelSummary}</span>
                    {selectedModels.length > 0 && !modelsDisabled && (
                      <span className="selection-count">{selectedModels.length}</span>
                    )}
                    <span className="multi-select-chevron">▾</span>
                  </button>
                  {!modelsDisabled && modelDropdownOpen && (
                    <div className="multi-select-dropdown" id="model-multi-select" role="listbox" aria-multiselectable="true">
                      {models.length ? (
                        <>
                          <div className="multi-select-header">
                            <div className="multi-select-search">
                              <input
                                type="text"
                                placeholder="Szukaj modelu..."
                                value={modelSearch}
                                onChange={(event) => setModelSearch(event.target.value)}
                                aria-label="Szukaj modelu"
                                autoFocus
                              />
                            </div>
                            <button type="button" onClick={() => setSelectedModels([])}>Wyczyść wybór</button>
                          </div>
                          {filteredModels.length ? (
                            <ul className="multi-select-options">
                              {filteredModels.map((model) => (
                                <li key={model.id}>
                                  <label
                                    className={`multi-select-option ${selectedModels.includes(model.id) ? 'is-checked' : ''}`}
                                  >
                                    <span className="option-text">
                                      <span className="option-name">{model.nazwa}</span>
                                      <span className="option-count">({model.ogloszenia_count ?? 0})</span>
                                    </span>
                                    <span className="option-switch">
                                      <input
                                        type="checkbox"
                                        checked={selectedModels.includes(model.id)}
                                        onChange={() => toggleModel(model.id)}
                                        className="switch-input"
                                      />
                                      <span className="switch-visual" aria-hidden="true" />
                                    </span>
                                  </label>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="multi-select-empty">Brak modeli spełniających kryteria.</p>
                          )}
                        </>
                      ) : (
                        <p className="multi-select-empty">Brak modeli dla wybranej marki.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
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
                <button className="btn-ghost" type="button" onClick={resetFilters}>Wyczyść</button>
                <button className="btn-primary" type="button" onClick={() => applyBasicFilters()}>Filtruj</button>
                <Link to="/ogloszenia" className="btn-secondary">Pokaż wszystkie filtry</Link>
              </div>
              {loading && (
                <div className="filters-loader" aria-live="polite">
                  <span className="filters-loader__spinner" aria-hidden="true" />
                  <span>Aktualizuję wyniki...</span>
                </div>
              )}
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
