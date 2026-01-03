import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../App.css';
import { fetchListingById, fetchListings } from '../api/client';
import { cleanTitle, titleFromBrandModel } from '../utils/title';
import { toSlug } from '../utils/slug';
import { formatMileage, formatPowerKMkW, formatEngineCapacity, mapFuel, mapGearbox, mapDrive, formatDatePL, formatPrice, formatBoolean } from '../utils/format';
import FavoriteButton from '../components/FavoriteButton';
import VerifiedBadge from '../components/VerifiedBadge';
import LoadingScreen from '../components/common/LoadingScreen';
import { useAuth } from '../contexts/AuthContext';
import { HistoriaPojazduSummary, isHistoryVerified, verifiedHistoryTitle } from '../utils/history';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import type { ChartData, ChartOptions, ScriptableContext, TooltipItem } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, Legend);

interface Zdjecie {
  id: number;
  url?: string | null;
}

interface SellerInfo {
  id: number;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
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
  historia_pojazdu?: HistoriaPojazduResource | null;
  sprzedawca?: SellerInfo | null;
  [key: string]: any;
}

type HighlightType = 'mileage' | 'fuel' | 'gearbox' | 'engine' | 'power';

type HighlightData = {
  id: string;
  label: string;
  value: string;
  icon: HighlightType;
};

type ListingLite = {
  id: number;
  tytul: string;
  marka_id?: number | null;
  model_id?: number | null;
  marka?: { id: number; nazwa: string } | null;
  model?: { id: number; nazwa: string } | null;
  moc_silnika?: number | string | null;
  cena?: number | string | null;
  przebieg?: number | string | null;
  rodzaj_paliwa?: string | null;
  rok_produkcji?: number | string | null;
  created_at?: string;
  zdjecia?: Zdjecie[];
  historia_pojazdu?: HistoriaPojazduSummary | null;
};

type BreadcrumbItem = {
  label: string;
  url?: string | null;
};

type HistoriaStatus = 'pending' | 'success' | 'failed' | 'skipped' | string;

interface HistoriaEventDetail {
  name?: string;
  value?: string;
  additionalInformation?: { name?: string; value?: string }[] | null;
}

interface HistoriaEvent {
  eventDate?: string | null;
  eventName?: string | null;
  eventType?: string | null;
  comment?: string | null;
  eventDetails?: HistoriaEventDetail[] | null;
}

interface MileageEvent {
  date?: string | null;
  label: string;
  comment?: string | null;
  mileage: number;
}

interface HistoriaTimelineData {
  events?: HistoriaEvent[] | null;
  totalOwners?: number | null;
  currentOwners?: number | null;
  registrationProvince?: string | null;
  technicalInspectionStatus?: string | null;
  validOcInsurance?: boolean | null;
  odometerReadings?: { value?: number; unit?: string; rolledBack?: boolean | null }[] | null;
  insuranceExpiryDate?: string | null;
  reportGenerationDate?: string | null;
}

interface HistoriaTechnicalData {
  basicData?: Record<string, any> | null;
  detailedData?: Record<string, any> | null;
}

interface HistoriaPayload {
  vehicle_data?: {
    technicalData?: HistoriaTechnicalData | null;
  } | null;
  timeline_data?: {
    timelineData?: HistoriaTimelineData | null;
  } | null;
}

interface HistoriaPojazduResource {
  status: HistoriaStatus;
  fetched_at?: string | null;
  last_error_message?: string | null;
  payload?: HistoriaPayload | null;
}

const HISTORY_STATUS_LABELS: Record<string, string> = {
  success: 'Dane Potwierdzone',
  pending: 'Trwa pobieranie',
  failed: 'Błąd pobierania',
  skipped: 'Pominięto',
};

const HISTORY_STATUS_MESSAGES: Record<string, string> = {
  success: '',
  pending: 'Raport jest przygotowywany — odśwież stronę za moment.',
  failed: 'Nie udało się pobrać raportu. Spróbuj ponownie później.',
  skipped: 'Raport został pominięty, ponieważ brakuje kompletu danych pojazdu.',
};

const getHistoryStatusLabel = (status: HistoriaStatus): string => HISTORY_STATUS_LABELS[status] ?? 'Brak danych';

const getHistoryStatusDescription = (status: HistoriaStatus): string => HISTORY_STATUS_MESSAGES[status] ?? 'Raport nie jest jeszcze dostępny.';

const parseTimestamp = (value?: string | null): number => {
  if (!value) return 0;
  const ts = Date.parse(value);
  return Number.isNaN(ts) ? 0 : ts;
};

const formatEventDate = (value?: string | null): string => {
  if (!value) return '—';
  try {
    return formatDatePL(value);
  } catch (error) {
    return value;
  }
};

const toNumber = (value: unknown): number | null => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};

const parseMileageValue = (value?: string | number | null): number | null => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === 'string') {
    const normalized = value.replace(/[^\d.,]/g, '').replace(',', '.');
    if (!normalized) return null;
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};

const MILEAGE_KEYWORDS = ['przebieg', 'drogomierz', 'licznik', 'odczytany stan', 'kilometr'];
const MILEAGE_VALUE_PATTERN = /\d[\d\s.,]*\s?(?:km|kilometr)/i;

const hasMileageIndicator = (text?: string | null): boolean => {
  if (!text) return false;
  const normalized = text.toLowerCase();
  return MILEAGE_KEYWORDS.some(keyword => normalized.includes(keyword)) || MILEAGE_VALUE_PATTERN.test(text);
};

interface ExtractedMileage {
  value: number;
  label: string;
  fallbackText?: string | null;
}

const extractMileageFromEvent = (event: HistoriaEvent): ExtractedMileage | null => {
  if (!event) return null;

  const inspectDetail = (detail?: HistoriaEventDetail | null): ExtractedMileage | null => {
    if (!detail) return null;
    const combined = `${detail.name ?? ''} ${detail.value ?? ''}`.trim();
    if (!combined) return null;
    if (!hasMileageIndicator(combined)) return null;
    const numeric = parseMileageValue(detail.value ?? combined);
    if (numeric == null) return null;
    return {
      value: numeric,
      label: detail.name ?? event.eventName ?? event.eventType ?? 'Zdarzenie',
      fallbackText: detail.value ?? combined,
    };
  };

  if (Array.isArray(event.eventDetails)) {
    for (const detail of event.eventDetails) {
      const result = inspectDetail(detail);
      if (result) {
        return result;
      }
    }
  }

  const fallbackSources = [event.comment, event.eventName, event.eventType];
  for (const source of fallbackSources) {
    if (!source) continue;
    if (!hasMileageIndicator(source)) continue;
    const numeric = parseMileageValue(source);
    if (numeric != null) {
      return {
        value: numeric,
        label: event.eventName ?? event.eventType ?? 'Zdarzenie',
        fallbackText: source,
      };
    }
  }

  return null;
};

const getBrandId = (listing: ListingLite | OgloszenieDetail | null | undefined): number | null => {
  if (!listing) return null;
  return listing.marka?.id ?? (listing as any).marka_id ?? null;
};

const getModelId = (listing: ListingLite | OgloszenieDetail | null | undefined): number | null => {
  if (!listing) return null;
  return listing.model?.id ?? (listing as any).model_id ?? null;
};

const getPower = (listing: ListingLite | OgloszenieDetail | null | undefined): number | null => {
  if (!listing) return null;
  return toNumber(listing.moc_silnika as number | string | null);
};

function selectRelatedListings(pool: ListingLite[], current: OgloszenieDetail, desired = 4): ListingLite[] {
  if (!pool.length) return [];
  const targetBrand = getBrandId(current);
  const targetModel = getModelId(current);
  const targetPower = getPower(current);
  const sameModel: ListingLite[] = [];
  const sameBrand: ListingLite[] = [];
  const fallback: ListingLite[] = [];

  for (const listing of pool) {
    if (listing.id === current.id) continue;
    const brandId = getBrandId(listing);
    const modelId = getModelId(listing);
    if (targetBrand && targetModel && brandId === targetBrand && modelId === targetModel) {
      sameModel.push(listing);
    } else if (targetBrand && brandId === targetBrand) {
      sameBrand.push(listing);
    } else {
      fallback.push(listing);
    }
  }

  const picks: ListingLite[] = [];
  const pushFrom = (source: ListingLite[]) => {
    for (const listing of source) {
      if (picks.length >= desired) break;
      if (picks.some(l => l.id === listing.id)) continue;
      picks.push(listing);
    }
  };

  pushFrom(sameModel);
  pushFrom(sameBrand);

  if (picks.length < desired && fallback.length) {
    const powerSorted = [...fallback].sort((a, b) => {
      const powerA = getPower(a);
      const powerB = getPower(b);
      const diffA = targetPower !== null && powerA !== null ? Math.abs(powerA - targetPower) : Number.MAX_SAFE_INTEGER;
      const diffB = targetPower !== null && powerB !== null ? Math.abs(powerB - targetPower) : Number.MAX_SAFE_INTEGER;
      if (diffA !== diffB) return diffA - diffB;
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return dateB - dateA;
    });
    pushFrom(powerSorted);
  }

  return picks.slice(0, desired);
}

const HighlightIcon: React.FC<{ type: HighlightType }> = ({ type }) => {
  switch (type) {
    case 'mileage':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="8" />
          <path d="M12 12l3-3" />
          <path d="M8 15h8" />
        </svg>
      );
    case 'fuel':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3c-3 3-5 5.5-5 8.5a5 5 0 0010 0C17 8.5 15 6 12 3z" />
          <path d="M10 11a2 2 0 104 0" />
        </svg>
      );
    case 'gearbox':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 5v9" />
          <path d="M17 5v9" />
          <path d="M7 9h10" />
          <path d="M12 5v13" />
          <circle cx="7" cy="17.5" r="1.5" />
          <circle cx="17" cy="17.5" r="1.5" />
        </svg>
      );
    case 'engine':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 10h2l2-3h6l2 3h2a2 2 0 012 2v4a2 2 0 01-2 2H4z" />
          <path d="M10 7v3" />
          <path d="M14 7v3" />
        </svg>
      );
    case 'power':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="13 2 5 14 11 14 11 22 19 10 13 10" />
        </svg>
      );
    default:
      return null;
  }
};

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [item, setItem] = useState<OgloszenieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mainIndex, setMainIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [relatedListings, setRelatedListings] = useState<ListingLite[]>([]);
  const [relatedLoading, setRelatedLoading] = useState(false);
  const [timelineModalOpen, setTimelineModalOpen] = useState(false);

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

  useEffect(() => {
    if (!item) {
      setRelatedListings([]);
      return;
    }
    let active = true;
    (async () => {
      try {
        setRelatedLoading(true);
        const response = await fetchListings({ per_page: 60, sort: '-created_at' });
        const list = Array.isArray((response as any)?.data) ? (response as any).data : (Array.isArray(response) ? response : []);
        const pool = (list as ListingLite[]).filter((l) => l && l.id !== item.id);
        const selected = selectRelatedListings(pool, item, 4);
        if (!active) return;
        setRelatedListings(selected);
      } catch (err) {
        if (!active) return;
        setRelatedListings([]);
      } finally {
        if (active) setRelatedLoading(false);
      }
    })();
    return () => { active = false; };
  }, [item]);

  const images = Array.isArray(item?.zdjecia) ? item!.zdjecia!.filter(z => z && z.url) : [];
  const main = images.length > 0 ? images[mainIndex]?.url ?? null : null;
  const hasInlineGallery = images.length > 1;

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

  const handleInlineNavigation = useCallback((direction: 'prev' | 'next') => {
    if (!hasInlineGallery) return;
    setMainIndex((prev) => {
      const total = images.length;
      if (total <= 1) return prev;
      const nextIndex = direction === 'prev'
        ? (prev - 1 + total) % total
        : (prev + 1) % total;
      if (lightboxOpen) {
        setLightboxIndex(nextIndex);
      }
      return nextIndex;
    });
  }, [hasInlineGallery, images.length, lightboxOpen]);

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

  useEffect(() => {
    if (!timelineModalOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setTimelineModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [timelineModalOpen]);
  const ownerId = typeof item?.uzytkownik_id === 'number'
    ? item.uzytkownik_id
    : typeof item?.uzytkownik_id === 'string'
      ? Number(item.uzytkownik_id)
      : null;
  const canEditListing = Boolean(user && ownerId != null && user.id === ownerId);
  const seller = item?.sprzedawca ?? null;
  const sellerPhoneHref = seller?.phone
    ? `tel:${seller.phone.replace(/[^+\d]/g, '')}`
    : null;

  const computedTitle = titleFromBrandModel(item?.marka, item?.model, cleanTitle(item?.tytul ?? '')) || 'Ogłoszenie';
  const highlightCards: HighlightData[] = item ? [
    {
      id: 'mileage',
      label: 'Przebieg',
      value: formatMileage(item.przebieg as number),
      icon: 'mileage',
    },
    {
      id: 'fuel',
      label: 'Rodzaj paliwa',
      value: mapFuel(item.rodzaj_paliwa as string),
      icon: 'fuel',
    },
    {
      id: 'gearbox',
      label: 'Skrzynia biegów',
      value: mapGearbox(item.skrzynia_biegow as string),
      icon: 'gearbox',
    },
    {
      id: 'engine',
      label: 'Poj. silnika',
      value: formatEngineCapacity(item.pojemnosc_silnika as number),
      icon: 'engine',
    },
    {
      id: 'power',
      label: 'Moc',
      value: formatPowerKMkW(item.moc_silnika as number),
      icon: 'power',
    },
  ] : [];

  const historia = (item?.historia_pojazdu ?? null) as HistoriaPojazduResource | null;
  const historiaVerified = isHistoryVerified(historia);
  const historiaStatus: HistoriaStatus = (historia?.status ?? 'pending') as HistoriaStatus;
  const technicalData = historia?.payload?.vehicle_data?.technicalData ?? {};
  const basicHistoryData = (technicalData?.basicData ?? {}) as Record<string, any>;
  const timelineData = historia?.payload?.timeline_data?.timelineData ?? null;
  const rawEvents = timelineData && Array.isArray(timelineData.events) ? timelineData.events.filter(Boolean) : [];
  const historyEvents = rawEvents
    .map(event => event as HistoriaEvent)
    .sort((a, b) => parseTimestamp(b?.eventDate) - parseTimestamp(a?.eventDate));
  const odometerReadings = timelineData?.odometerReadings ?? [];
  const lastOdometer = Array.isArray(odometerReadings) && odometerReadings.length > 0
    ? odometerReadings[odometerReadings.length - 1]
    : null;
  const lastOdometerValue = typeof lastOdometer?.value === 'number' ? lastOdometer.value : null;
  const ocStatus = timelineData?.validOcInsurance === true
    ? 'Polisa ważna'
    : timelineData?.validOcInsurance === false
      ? 'Brak polisy'
      : 'Nieznany status';
  const historySummaryCards = [
    { id: 'registration', label: 'Status rejestracji', value: basicHistoryData?.registrationStatus ?? '—' },
    { id: 'inspection', label: 'Badanie techniczne', value: timelineData?.technicalInspectionStatus ?? basicHistoryData?.technicalInspectionStatus ?? '—' },
    { id: 'oc', label: 'Polisa OC', value: ocStatus },
    { id: 'odometer', label: 'Ostatni przebieg', value: lastOdometerValue != null ? formatMileage(lastOdometerValue) : '—' },
  ];
  const mileageEvents: MileageEvent[] = historyEvents
    .map((event) => {
      const extracted = extractMileageFromEvent(event);
      if (!extracted) return null;
      return {
        date: event.eventDate ?? null,
        label: extracted.label,
        comment: event.comment ?? extracted.fallbackText ?? null,
        mileage: extracted.value,
      } as MileageEvent;
    })
    .filter((entry): entry is MileageEvent => Boolean(entry))
    .sort((a, b) => parseTimestamp(a.date) - parseTimestamp(b.date));
  const hasTimelineEvents = historyEvents.length > 0;
  const hasMileageTimeline = mileageEvents.length > 0;
  const minMileageValue = mileageEvents.reduce((min, event) => Math.min(min, event.mileage), Number.POSITIVE_INFINITY);
  const normalizedMinMileage = hasMileageTimeline && minMileageValue !== Number.POSITIVE_INFINITY ? minMileageValue : 0;
  const maxMileageValue = mileageEvents.reduce((max, event) => Math.max(max, event.mileage), normalizedMinMileage);
  const mileageRange = Math.max(maxMileageValue - normalizedMinMileage, 1);
  const mileageChartData = useMemo<ChartData<'line'>>(() => {
    if (!mileageEvents.length) {
      return { labels: [], datasets: [] };
    }
    return {
      labels: mileageEvents.map(event => formatEventDate(event.date)),
      datasets: [
        {
          label: 'Przebieg',
          data: mileageEvents.map(event => event.mileage),
          fill: true,
          borderColor: '#2563eb',
          borderWidth: 3,
          tension: 0.35,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBorderColor: '#2563eb',
          pointBackgroundColor: '#ffffff',
          backgroundColor: (context: ScriptableContext<'line'>) => {
            const { chart } = context;
            const { ctx, chartArea } = chart;
            if (!chartArea) {
              return 'rgba(37,99,235,0.12)';
            }
            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            gradient.addColorStop(0, 'rgba(37,99,235,0.35)');
            gradient.addColorStop(1, 'rgba(37,99,235,0)');
            return gradient;
          },
        },
      ],
    };
  }, [mileageEvents]);
  const mileageChartPadding = Math.max(Math.round(mileageRange * 0.1), 1000);
  const mileageChartOptions = useMemo<ChartOptions<'line'>>(() => ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: { intersect: false, mode: 'index' },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0f172a',
        borderColor: '#1d4ed8',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (tooltipItem: TooltipItem<'line'>) => {
            const parsedValue = typeof tooltipItem.parsed.y === 'number'
              ? tooltipItem.parsed.y
              : Number(tooltipItem.parsed);
            const safeValue = Number.isFinite(parsedValue) ? parsedValue : 0;
            return `Przebieg: ${formatMileage(safeValue)}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(15,23,42,0.08)',
          drawTicks: false,
        },
        border: { display: false },
        ticks: {
          color: '#475569',
          maxRotation: 0,
          autoSkip: true,
        },
      },
      y: {
        beginAtZero: false,
        suggestedMin: Math.max(normalizedMinMileage - mileageChartPadding, 0),
        suggestedMax: maxMileageValue + mileageChartPadding,
        grid: {
          color: 'rgba(37,99,235,0.08)',
          drawTicks: false,
        },
        ticks: {
          color: '#475569',
          callback: (tickValue: number | string) => {
            const numericValue = typeof tickValue === 'number' ? tickValue : Number(tickValue);
            return formatMileage(Number.isFinite(numericValue) ? numericValue : 0);
          },
        },
      },
    },
  }), [normalizedMinMileage, mileageChartPadding, maxMileageValue]);
  const hasHistoryDetails = historySummaryCards.some(card => card.value && card.value !== '—') || hasTimelineEvents || hasMileageTimeline;
  const historyUpdatedAt = historia?.fetched_at ? new Date(historia.fetched_at).toLocaleString('pl-PL') : null;
  const historyStatusMessage = getHistoryStatusDescription(historiaStatus);
  const timelineButtonDisabled = historiaStatus !== 'success' || (!hasTimelineEvents && !hasMileageTimeline);

  const formatListingTitle = (listing: ListingLite) => {
    const fallback = titleFromBrandModel(listing.marka, listing.model, cleanTitle(listing.tytul ?? ''));
    return cleanTitle(listing.tytul ?? '') || fallback || 'Ogłoszenie';
  };

  const getListingCover = (listing: ListingLite) => {
    const photos = Array.isArray(listing.zdjecia) ? listing.zdjecia : [];
    return photos.length ? photos[0]?.url ?? null : null;
  };

  const breadcrumbs = useMemo<BreadcrumbItem[]>(() => {
    const items: BreadcrumbItem[] = [{ label: 'Strona główna', url: '/' }];

    if (item?.marka?.nazwa) {
      const brandSlug = toSlug(item.marka.nazwa);
      items.push({
        label: item.marka.nazwa,
        url: brandSlug ? `/marka/${brandSlug}` : null,
      });

      if (item.model?.nazwa) {
        const modelSlug = toSlug(item.model.nazwa);
        items.push({
          label: item.model.nazwa,
          url: brandSlug && modelSlug ? `/marka/${brandSlug}/${modelSlug}` : null,
        });
      }
    }

    items.push({ label: 'Ogłoszenie' });

    return items;
  }, [item?.marka?.nazwa, item?.model?.nazwa]);

  if (loading) return <LoadingScreen />;
  if (error) return <p className="feedback error">{error}</p>;
  if (!item) return <p className="empty">Brak ogłoszenia.</p>;

  return (
    <div className="product-page-wrapper">
      <nav className="breadcrumbs" aria-label="Ścieżka okruszków">
        <ol>
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            const key = `${crumb.label}-${index}`;
            if (crumb.url && !isLast) {
              return (
                <li key={key}>
                  <Link to={crumb.url}>{crumb.label}</Link>
                </li>
              );
            }
            return (
              <li key={key}>
                <span>{crumb.label}</span>
              </li>
            );
          })}
        </ol>
      </nav>
      <article className="ogloszenie-detail">
      <div className="detail-grid">
        <div className="gallery">
          <div className="main-image-wrapper">
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

            {hasInlineGallery && (
              <>
                <button
                  type="button"
                  className="gallery-arrow prev"
                  aria-label="Poprzednie zdjęcie"
                  onClick={() => handleInlineNavigation('prev')}
                >
                  <span aria-hidden="true">‹</span>
                </button>
                <button
                  type="button"
                  className="gallery-arrow next"
                  aria-label="Następne zdjęcie"
                  onClick={() => handleInlineNavigation('next')}
                >
                  <span aria-hidden="true">›</span>
                </button>
                <div className="gallery-counter" aria-live="polite">
                  {mainIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>

          {hasInlineGallery && (
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
          <div className="detail-headline">
            <div className="detail-title">
              <h1>{computedTitle}</h1>
              {historiaVerified && <VerifiedBadge title={verifiedHistoryTitle} />}
            </div>
            <div className="detail-actions">
              {canEditListing && (
                <Link to={`/ogloszenia/${item.id}/edytuj`} className="btn-secondary detail-edit-button">
                  Edytuj ogłoszenie
                </Link>
              )}
              <FavoriteButton
                listingId={item.id}
                variant="button"
                labelAdd="Dodaj do ulubionych"
                labelRemove="Usuń z ulubionych"
              />
            </div>
          </div>
          <p className="price"><strong>Cena:</strong> {formatPrice(typeof item.cena === 'string' ? Number(item.cena) : item.cena as number)} </p>

          <div className="meta">
            <p><strong>Marka:</strong> {item.marka?.nazwa ?? '—'}</p>
            <p><strong>Model:</strong> {item.model?.nazwa ?? '—'}</p>
          </div>

          <section className="contact">
            <h3>Kontakt</h3>
            {seller ? (
              <div className="contact-card">
                <div className="contact-card__grid">
                  <div>
                    <p className="contact-card__label">Sprzedawca</p>
                    <p className="contact-card__value">{seller.name ?? 'Nieznany użytkownik'}</p>
                  </div>
                  <div>
                    <p className="contact-card__label">Numer telefonu</p>
                    <p className="contact-card__value contact-card__value--phone">
                      {seller.phone ?? 'Brak numeru'}
                    </p>
                  </div>
                </div>
                {seller.phone ? (
                  <a className="contact-card__cta" href={sellerPhoneHref ?? undefined}>
                    Zadzwoń: {seller.phone}
                  </a>
                ) : (
                  <p className="contact-card__empty">Sprzedawca nie udostępnił numeru telefonu.</p>
                )}
                {!seller.phone && canEditListing && (
                  <Link className="contact-card__manage" to="/panel-klienta?tab=profile">
                    Uzupełnij numer w panelu klienta
                  </Link>
                )}
              </div>
            ) : (
              <p>Brak danych kontaktowych.</p>
            )}
          </section>
        </div>
      </div>
      <div className="detail-sections">
        <section className="key-highlights">
          <h3>Najważniejsze informacje</h3>
          <div className="highlight-grid">
            {highlightCards.map(card => (
              <div className="highlight-item" key={card.id}>
                <div className="highlight-icon">
                  <HighlightIcon type={card.icon} />
                </div>
                <div className="highlight-text">
                  <span className="label">{card.label}</span>
                  <span className="value">{card.value}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {historiaVerified && (
          <section className="vehicle-history">
            <div className="history-header">
              <div>
                <h3>Historia pojazdu (CEPiK)</h3>
                <p className="history-note">
                  Dane pochodzą z serwisu{' '}
                  <a href="https://moj.gov.pl/nforms/engine/ng/index?xFormsAppName=HistoriaPojazdu#/search" target="_blank" rel="noreferrer noopener">
                    historiapojazdu.gov.pl
                  </a>
                  {historyUpdatedAt ? ` · Ostatnia aktualizacja: ${historyUpdatedAt}` : ''}
                </p>
                {historyStatusMessage && <p>{historyStatusMessage}</p>}
              </div>
              <span className={`history-status ${historiaStatus}`}>
                {getHistoryStatusLabel(historiaStatus)}
              </span>
            </div>

            {historia && hasHistoryDetails ? (
              <>
                <div className="history-summary-grid">
                  {historySummaryCards.map(card => (
                    <div className="history-summary-card" key={card.id}>
                      <span className="label">{card.label}</span>
                      <span className="value">{card.value}</span>
                    </div>
                  ))}
                  <button
                    className="history-summary-card timeline-button"
                    type="button"
                    onClick={() => setTimelineModalOpen(true)}
                    disabled={timelineButtonDisabled}
                  >
                    Wykres czasu
                  </button>
                </div>
              </>
            ) : (
              <div className="history-placeholder">
                <p>Raport nie zawiera dodatkowych danych do wyświetlenia.</p>
                {historia?.last_error_message && (
                  <p className="history-error">Szczegóły: {historia.last_error_message}</p>
                )}
              </div>
            )}
          </section>
        )}

        <section className="spec">
          <h3>Specyfikacja</h3>
          <dl className="ogloszenie-details">
            <div><dt>Rok produkcji</dt><dd>{item.rok_produkcji ?? '—'}</dd></div>
            <div><dt>Napęd</dt><dd>{mapDrive(item.naped as string)}</dd></div>
            <div><dt>VIN</dt><dd>{item.vin ?? '—'}</dd></div>
            <div><dt>Nr rejestracyjny</dt><dd>{item.numer_rejestracyjny ?? '—'}</dd></div>
            <div><dt>Data I rejestracji</dt><dd>{formatDatePL(item.data_pierwszej_rej as string)}</dd></div>
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

        <p className="timestamp">Dodano: {item.created_at ? new Date(item.created_at).toLocaleString() : '—'}</p>
      </div>
    </article>
    {(relatedLoading || relatedListings.length > 0) && (
      <section className="related-listings">
        <div className="related-header">
          <h3>Sprawdź też</h3>
          <p>Polecamy podobne oferty, które mogą Cię zainteresować.</p>
        </div>
        {relatedLoading && relatedListings.length === 0 ? (
          <div className="related-placeholder">Ładujemy propozycje…</div>
        ) : relatedListings.length > 0 ? (
          <div className="related-grid">
            {relatedListings.map((listing) => {
              const cover = getListingCover(listing);
              const title = formatListingTitle(listing);
              const rawPrice = typeof listing.cena === 'string' ? Number(listing.cena) : (listing.cena as number | null);
              const priceValue = typeof rawPrice === 'number' && Number.isFinite(rawPrice) ? rawPrice : null;
              const mileageValue = toNumber(listing.przebieg ?? null);
              const relatedVerified = isHistoryVerified(listing.historia_pojazdu);
              return (
                <Link to={`/ogloszenie/${listing.id}`} className="related-card" key={listing.id}>
                  <div className="related-thumb">
                    {cover ? (
                      <img src={cover} alt={title} loading="lazy" decoding="async" />
                    ) : (
                      <div className="related-thumb-placeholder">Brak zdjęcia</div>
                    )}
                  </div>
                  <div className="related-card-body">
                    <span className="related-card-brand">{listing.marka?.nazwa ?? 'Auto'}</span>
                    <div className="related-card-title-row">
                      <h4>{title}</h4>
                      {relatedVerified && <VerifiedBadge title={verifiedHistoryTitle} />}
                    </div>
                    <p className="related-card-price">{formatPrice(priceValue ?? null)}</p>
                    <div className="related-card-meta">
                      <span>{listing.rodzaj_paliwa ? mapFuel(listing.rodzaj_paliwa) : '—'}</span>
                      <span>{formatMileage(mileageValue ?? undefined)}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="related-placeholder">Brak innych ogłoszeń do polecenia.</div>
        )}
      </section>
    )}
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
    {timelineModalOpen && (
      <div className="timeline-modal-overlay" onClick={() => setTimelineModalOpen(false)}>
        <div className="timeline-modal" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="timeline-modal-close"
            onClick={() => setTimelineModalOpen(false)}
            aria-label="Zamknij modal Wykres czasu"
          >
            ×
          </button>
          <header className="timeline-modal-header">
            <div>
              <p className="eyebrow">CEPiK</p>
              <h3>Wykres czasu i przebiegu</h3>
              <p>Pełna lista wpisów z historiapojazdu.gov.pl.</p>
            </div>
            <span className={`history-status ${historiaStatus}`}>
              {getHistoryStatusLabel(historiaStatus)}
            </span>
          </header>

          <section className="timeline-section mileage-section">
            <div className="timeline-section-head">
              <div>
                <h4>Wykres przebiegu</h4>
                <p>Schludny wykres pokazuje każdy odczyt licznika zapisany w CEPiK.</p>
              </div>
              {hasMileageTimeline && (
                <div className="mileage-scale">
                  <span>Min {formatMileage(normalizedMinMileage)}</span>
                  <span>Max {formatMileage(maxMileageValue)}</span>
                </div>
              )}
            </div>
            {hasMileageTimeline ? (
              <div className="mileage-chart-card">
                <div className="mileage-chart" role="img" aria-label="Wykres przebiegu pojazdu">
                  <Line data={mileageChartData} options={mileageChartOptions} />
                </div>
              </div>
            ) : (
              <p className="history-placeholder">Brak danych licznikowych w raporcie.</p>
            )}
          </section>

          <section className="timeline-section">
            <h4>Najważniejsze zdarzenia</h4>
            {hasTimelineEvents ? (
              <ol className="history-event-list">
                {historyEvents.map((event, index) => (
                  <li className="history-event-row" key={`${event.eventType ?? 'event'}-${event.eventDate ?? index}`}>
                    <div className="event-date">{formatEventDate(event.eventDate)}</div>
                    <div className="event-body">
                      <p className="event-name">{event.eventName ?? event.eventType ?? 'Zdarzenie'}</p>
                      {event.comment && <p className="event-comment">{event.comment}</p>}
                      {Array.isArray(event.eventDetails) && event.eventDetails.length > 0 && (
                        <dl className="history-event-details">
                          {event.eventDetails.map((detail, detailIndex) => (
                            detail?.value ? (
                              <div key={`${event.eventType ?? 'event'}-detail-${detailIndex}`}>
                                <dt>{detail.name ?? 'Informacja'}</dt>
                                <dd>{detail.value}</dd>
                              </div>
                            ) : null
                          ))}
                        </dl>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="history-placeholder">Brak zdarzeń do wyświetlenia.</p>
            )}
          </section>
        </div>
      </div>
    )}
    </div>
  );
};

export default ProductPage;
