import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Listing from '../components/Listing';
import LoadingScreen from '../components/common/LoadingScreen';
import './Home.css';
import { fetchBrands, fetchListings, fetchModels, MarkaDto, ModelDto } from '../api/client';
import { toSlug } from '../utils/slug';

interface Zdjecie {
  id: number;
  url?: string | null;
}

interface ListingItem {
  id: number;
  tytul: string;
  opis?: string;
  cena?: number | string | null;
  marka?: { id: number; nazwa: string } | null;
  model?: { id: number; nazwa: string } | null;
  rok_produkcji?: number | string | null;
  przebieg?: number | string | null;
  rodzaj_paliwa?: string | null;
  moc_silnika?: number | string | null;
  pojemnosc_silnika?: number | string | null;
  skrzynia_biegow?: string | null;
  zdjecia?: Zdjecie[];
  historia_pojazdu?: any;
}

function normalizeListings(payload: unknown): ListingItem[] {
  if (Array.isArray(payload)) {
    return payload as ListingItem[];
  }

  if (payload && typeof payload === 'object' && 'data' in payload) {
    const data = (payload as { data?: unknown }).data;
    if (Array.isArray(data)) {
      return data as ListingItem[];
    }
  }

  return [];
}

const BrandListings: React.FC = () => {
  const { brandSlug, modelSlug } = useParams<'brandSlug' | 'modelSlug'>();
  const [brand, setBrand] = useState<MarkaDto | null>(null);
  const [model, setModel] = useState<ModelDto | null>(null);
  const [listings, setListings] = useState<ListingItem[]>([]);
  const [models, setModels] = useState<ModelDto[]>([]);
  const [brandDictionary, setBrandDictionary] = useState<MarkaDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadBrandListings() {
      setLoading(true);
      setError(null);

      try {
        const availableBrands = await fetchBrands();
        if (!mounted) return;
        setBrandDictionary(availableBrands);

        if (!brandSlug) {
          setBrand(null);
          setModel(null);
          setModels([]);
          setListings([]);
          return;
        }

        const matchedBrand = availableBrands.find((b) => toSlug(b.nazwa) === brandSlug) ?? null;
        if (!matchedBrand) {
          setBrand(null);
          setModel(null);
          setModels([]);
          setListings([]);
          setError('Nie znaleziono wskazanej marki.');
          return;
        }

        setBrand(matchedBrand);

        let brandModels: ModelDto[] = [];
        try {
          brandModels = await fetchModels(matchedBrand.id);
        } catch {
          brandModels = [];
        }

        if (!mounted) return;
        setModels(brandModels);

        let selectedModel: ModelDto | null = null;
        if (modelSlug) {
          selectedModel = brandModels.find((m) => toSlug(m.nazwa) === modelSlug) ?? null;
          if (!selectedModel) {
            setModel(null);
            setListings([]);
            setError('Nie znaleziono wskazanego modelu dla tej marki.');
            return;
          }
        }

        setModel(selectedModel);

        const params: Record<string, any> = {
          marka_id: matchedBrand.id,
          sort: '-created_at',
          per_page: 24,
        };

        if (selectedModel) {
          params.model_id = selectedModel.id;
        }

        const response = await fetchListings(params);
        if (!mounted) return;
        setListings(normalizeListings(response));
      } catch (err) {
        if (!mounted) return;
        const message = err instanceof Error ? err.message : 'Nie udało się pobrać ogłoszeń.';
        setListings([]);
        setError(message);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadBrandListings();

    return () => {
      mounted = false;
    };
  }, [brandSlug, modelSlug]);

  const brandTitle = useMemo(() => {
    if (brand && model) {
      return `${brand.nazwa} ${model.nazwa}`;
    }
    if (brand) {
      return brand.nazwa;
    }
    return 'Wybierz markę';
  }, [brand, model]);

  const brandDescription = useMemo(() => {
    if (brand && model) {
      return `Najnowsze aktywne ogłoszenia dla modelu ${model.nazwa} marki ${brand.nazwa}.`;
    }
    if (brand) {
      return `Najnowsze aktywne ogłoszenia marki ${brand.nazwa}.`;
    }
    return 'Skorzystaj z listy marek, aby przejść do konkretnego producenta.';
  }, [brand, model]);

  const canonicalBrandSlug = brand ? toSlug(brand.nazwa) : (brandSlug ?? '');

  const brandLinks = useMemo(() => {
    if (!brandDictionary.length) {
      return [];
    }

    return brandDictionary.map((entry) => {
      const slug = toSlug(entry.nazwa);
      const isActive = brand ? entry.id === brand.id : slug === brandSlug;
      return {
        label: entry.nazwa,
        url: `/marka/${slug}`,
        active: Boolean(isActive),
      };
    });
  }, [brand, brandDictionary, brandSlug]);

  const modelLinks = useMemo(() => {
    if (!brand) {
      return [];
    }

    const base = `/marka/${canonicalBrandSlug}`;
    const items = [
      {
        label: 'Wszystkie modele',
        url: base,
        active: !model,
      },
    ];

    models.forEach((m) => {
      items.push({
        label: m.nazwa,
        url: `${base}/${toSlug(m.nazwa)}`,
        active: Boolean(model && model.id === m.id),
      });
    });

    return items;
  }, [brand, canonicalBrandSlug, model, models]);

  return (
    <div className="App home-page">
      <main className="main-content">
        <section className="listings promoted full-width brand-page">
          <div className="promoted-inner">
            <div className="listings-header brand-page-header">
              <div className="brand-page-title">
                <p className="brand-label">Marka</p>
                <h2>{brandTitle}</h2>
                <p className="brand-description">{brandDescription}</p>
              </div>
              <div className="brand-page-actions">
                <Link to="/">Strona główna</Link>
                <Link to="/ogloszenia">Pełna wyszukiwarka</Link>
              </div>
            </div>

            {brandLinks.length > 0 && (
              <div className="brand-directory">
                <span className="switcher-label">Marki</span>
                <div className="switcher-list">
                  {brandLinks.map((link) => (
                    <Link
                      key={link.url}
                      to={link.url}
                      className={`model-chip${link.active ? ' active' : ''}`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {brand && modelLinks.length > 1 && (
              <div className="brand-model-switcher">
                <span className="switcher-label">Modele</span>
                <div className="switcher-list">
                  {modelLinks.map((item) => (
                    <Link
                      key={item.url}
                      to={item.url}
                      className={`model-chip${item.active ? ' active' : ''}`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {brand ? (
              <Listing
                items={listings}
                loading={loading}
                error={error}
                showGalleryControls
              />
            ) : (
              <div className={`brand-placeholder${error ? ' error' : ''}`}>
                {loading ? <LoadingScreen /> : <p>{error ?? 'Wybierz markę z listy powyżej.'}</p>}
              </div>
            )}

            <div className="brand-page-footer">
              <Link to="/ogloszenia" className="btn-secondary">Przejdź do pełnej listy</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BrandListings;
