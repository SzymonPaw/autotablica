import React, { useEffect, useMemo, useRef, useState } from 'react';
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

type SelectOption = {
  label: string;
  value: string;
};

type OptionMultiSelectConfig = {
  id: string;
  label: string;
  options: SelectOption[];
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  emptyLabel: string;
};

type RangeFilterId = 'budget' | 'year' | 'mileage' | 'power' | 'engine';

type RangeFilterConfig = {
  id: RangeFilterId;
  label: string;
  buttonLabel: string;
  minValue: string;
  maxValue: string;
  setMin: (value: string) => void;
  setMax: (value: string) => void;
  inputProps?: {
    min?: number;
    max?: number;
    step?: number;
  };
  summaryUnit?: string;
};

const numberFormatter = new Intl.NumberFormat('pl-PL');

const formatRangeSummary = (minValue: string, maxValue: string, unit?: string): string => {
  const formatValue = (value: string) => {
    if (!value) return '';
    const numericValue = Number(value);
    if (Number.isNaN(numericValue)) {
      return value;
    }
    const formatted = numberFormatter.format(numericValue);
    return unit ? `${formatted} ${unit}` : formatted;
  };

  const hasMin = Boolean(minValue);
  const hasMax = Boolean(maxValue);

  if (!hasMin && !hasMax) {
    return 'Nie ustawiono';
  }

  if (hasMin && hasMax) {
    return `Od ${formatValue(minValue)} do ${formatValue(maxValue)}`;
  }

  if (hasMin) {
    return `Od ${formatValue(minValue)}`;
  }

  return `Do ${formatValue(maxValue)}`;
};

const formatOptionSelectionSummary = (
  selectedValues: string[],
  options: SelectOption[],
  emptyLabel: string,
): string => {
  if (!selectedValues.length) {
    return emptyLabel;
  }

  const names = selectedValues
    .map((value) => options.find((option) => option.value === value)?.label)
    .filter((label): label is string => Boolean(label));

  if (!names.length) {
    return emptyLabel;
  }

  if (names.length === 1) {
    return names[0];
  }

  if (names.length === 2) {
    return `${names[0]}, ${names[1]}`;
  }

  return `${names[0]}, ${names[1]} +${names.length - 2}`;
};

const fuelOptions: SelectOption[] = [
  { label: 'Dowolne', value: '' },
  { label: 'Benzyna', value: 'benzyna' },
  { label: 'Diesel', value: 'diesel' },
  { label: 'LPG', value: 'lpg' },
  { label: 'Elektryczny', value: 'elektryczny' },
  { label: 'Hybryda', value: 'hybryda' },
];

const transmissionOptions: SelectOption[] = [
  { label: 'Dowolna', value: '' },
  { label: 'Manualna', value: 'manualna' },
  { label: 'Automatyczna', value: 'automatyczna' },
  { label: 'Półautomatyczna', value: 'polautomatyczna' },
];

const drivetrainOptions: SelectOption[] = [
  { label: 'Dowolny', value: '' },
  { label: 'Przedni', value: 'przedni' },
  { label: 'Tylny', value: 'tylny' },
  { label: '4x4', value: '4x4' },
];

const conditionOptions: SelectOption[] = [
  { label: 'Dowolny', value: '' },
  { label: 'Nowy', value: 'nowy' },
  { label: 'Używany', value: 'uzywany' },
  { label: 'Uszkodzony', value: 'uszkodzony' },
];

const doorOptions: SelectOption[] = [
  { label: 'Dowolnie', value: '' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
];

const seatOptions: SelectOption[] = [
  { label: 'Dowolnie', value: '' },
  { label: '2', value: '2' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '7', value: '7' },
];

const requirementsOptions: SelectOption[] = [
  { label: 'Bezwypadkowy', value: 'bezwypadkowy' },
  { label: 'Pierwszy właściciel', value: 'pierwszy_wlasciciel' },
  { label: 'Serwis w ASO', value: 'serwisowany_w_aso' },
  { label: 'Zarejestrowany w Polsce', value: 'zarejestrowany_w_polsce' },
  { label: 'Lakier metalik', value: 'metalik' },
];

const formatSummary = (
  selectedIds: number[],
  dictionary: { id: number; nazwa: string }[],
  emptyLabel: string,
  fallbackLabel: (count: number) => string,
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
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [selectedModels, setSelectedModels] = useState<number[]>([]);
  const [cenaMin, setCenaMin] = useState<string>('');
  const [cenaMax, setCenaMax] = useState<string>('');
  const [rokMin, setRokMin] = useState<string>('');
  const [rokMax, setRokMax] = useState<string>('');
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([]);
  const [przebiegMin, setPrzebiegMin] = useState<string>('');
  const [przebiegMax, setPrzebiegMax] = useState<string>('');
  const [mocMin, setMocMin] = useState<string>('');
  const [mocMax, setMocMax] = useState<string>('');
  const [pojemnoscMin, setPojemnoscMin] = useState<string>('');
  const [pojemnoscMax, setPojemnoscMax] = useState<string>('');
  const [selectedTransmissions, setSelectedTransmissions] = useState<string[]>([]);
  const [selectedDrivetrains, setSelectedDrivetrains] = useState<string[]>([]);
  const [kolor, setKolor] = useState<string>('');
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedDoorCounts, setSelectedDoorCounts] = useState<string[]>([]);
  const [selectedSeatCounts, setSelectedSeatCounts] = useState<string[]>([]);
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([]);
  const [activeRangeModal, setActiveRangeModal] = useState<RangeFilterId | null>(null);
  const [rangeDraftMin, setRangeDraftMin] = useState<string>('');
  const [rangeDraftMax, setRangeDraftMax] = useState<string>('');
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const [brandSearch, setBrandSearch] = useState('');
  const [modelSearch, setModelSearch] = useState('');
  const [activeOptionSelect, setActiveOptionSelect] = useState<string | null>(null);
  const brandDropdownRef = useRef<HTMLDivElement | null>(null);
  const modelDropdownRef = useRef<HTMLDivElement | null>(null);
  const optionSelectRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const rangeModalMinInputRef = useRef<HTMLInputElement | null>(null);
  const liveFiltersReadyRef = useRef(false);
  const liveFiltersSuppressedRef = useRef(false);
  const dropdownOverlayActive = brandDropdownOpen || modelDropdownOpen || Boolean(activeOptionSelect);

  const buildFilterParams = (initial: Record<string, any> = {}) => {
    const params: Record<string, any> = { ...initial };

    if (search.trim()) params.q = search.trim();
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
    if (selectedFuelTypes.length) params.paliwo = selectedFuelTypes;
    if (przebiegMin) params.przebieg_min = Number(przebiegMin);
    if (przebiegMax) params.przebieg_max = Number(przebiegMax);
    if (mocMin) params.moc_min = Number(mocMin);
    if (mocMax) params.moc_max = Number(mocMax);
    if (pojemnoscMin) params.pojemnosc_min = Number(pojemnoscMin);
    if (pojemnoscMax) params.pojemnosc_max = Number(pojemnoscMax);
    if (selectedTransmissions.length) params.skrzynia_biegow = selectedTransmissions;
    if (selectedDrivetrains.length) params.naped = selectedDrivetrains;
    if (selectedConditions.length) params.stan = selectedConditions;
    if (kolor.trim()) params.kolor = kolor.trim();
    if (selectedDoorCounts.length) params.liczba_drzwi = selectedDoorCounts.map(Number);
    if (selectedSeatCounts.length) params.liczba_miejsc = selectedSeatCounts.map(Number);
    if (selectedRequirements.includes('bezwypadkowy')) params.bezwypadkowy = true;
    if (selectedRequirements.includes('pierwszy_wlasciciel')) params.pierwszy_wlasciciel = true;
    if (selectedRequirements.includes('serwisowany_w_aso')) params.serwisowany_w_aso = true;
    if (selectedRequirements.includes('zarejestrowany_w_polsce')) params.zarejestrowany_w_polsce = true;
    if (selectedRequirements.includes('metalik')) params.metalik = true;

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
        setSelectedModels((prev) => prev.filter((id) => ms.some((model) => model.id === id)));
      } catch {
        if (!mounted) return;
        setModels([]);
        setSelectedModels([]);
      }
    })();

    return () => { mounted = false; };
  }, [selectedBrands]);

  const modelsDisabled = selectedBrands.length !== 1;

  const filteredBrands = useMemo(() => {
    const query = brandSearch.trim().toLowerCase();
    if (!query) return brands;
    return brands.filter((brand) => brand.nazwa.toLowerCase().includes(query));
  }, [brandSearch, brands]);

  const filteredModels = useMemo(() => {
    if (modelsDisabled) return [];
    const query = modelSearch.trim().toLowerCase();
    if (!query) return models;
    return models.filter((model) => model.nazwa.toLowerCase().includes(query));
  }, [modelSearch, models, modelsDisabled]);

  const toggleBrand = (brandId: number) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId) ? prev.filter((id) => id !== brandId) : [...prev, brandId]
    );
  };

  const toggleModel = (modelId: number) => {
    if (modelsDisabled) {
      return;
    }
    setSelectedModels((prev) =>
      prev.includes(modelId) ? prev.filter((id) => id !== modelId) : [...prev, modelId]
    );
  };

  const toggleRequirement = (value: string) => {
    setSelectedRequirements((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const brandSummary = useMemo(
    () => formatSummary(selectedBrands, brands, 'Wszystkie marki', (count) => `${count} marek`),
    [selectedBrands, brands],
  );

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
    if (!brandDropdownOpen) {
      setBrandSearch('');
    }
  }, [brandDropdownOpen]);

  useEffect(() => {
    if (!modelDropdownOpen) {
      setModelSearch('');
    }
  }, [modelDropdownOpen]);

  useEffect(() => {
    if (modelsDisabled) {
      setModelDropdownOpen(false);
      setModelSearch('');
    }
  }, [modelsDisabled]);

  useEffect(() => {
    if (!activeOptionSelect) return undefined;

    const handleClickOutside = (event: MouseEvent) => {
      const activeRef = optionSelectRefs.current[activeOptionSelect];
      if (!activeRef) {
        setActiveOptionSelect(null);
        return;
      }
      if (!activeRef.contains(event.target as Node)) {
        setActiveOptionSelect(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeOptionSelect]);

  useEffect(() => {
    if (!activeRangeModal) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setActiveRangeModal(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeRangeModal]);

  useEffect(() => {
    if (activeRangeModal && rangeModalMinInputRef.current) {
      rangeModalMinInputRef.current.focus();
    }
  }, [activeRangeModal]);

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

  useEffect(() => {
    if (!liveFiltersReadyRef.current) {
      liveFiltersReadyRef.current = true;
      return;
    }

    if (liveFiltersSuppressedRef.current) {
      liveFiltersSuppressedRef.current = false;
      return;
    }

    const debounceId = window.setTimeout(() => {
      applyFilters();
    }, 500);

    return () => window.clearTimeout(debounceId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    search,
    selectedBrands,
    selectedModels,
    cenaMin,
    cenaMax,
    rokMin,
    rokMax,
    selectedFuelTypes,
    przebiegMin,
    przebiegMax,
    mocMin,
    mocMax,
    pojemnoscMin,
    pojemnoscMax,
    selectedTransmissions,
    selectedDrivetrains,
    kolor,
    selectedConditions,
    selectedDoorCounts,
    selectedSeatCounts,
    selectedRequirements,
  ]);

  const resetFilters = async () => {
    liveFiltersSuppressedRef.current = true;
    setSearch('');
    setSelectedBrands([]);
    setSelectedModels([]);
    setModels([]);
    setCenaMin('');
    setCenaMax('');
    setRokMin('');
    setRokMax('');
    setPrzebiegMin('');
    setPrzebiegMax('');
    setMocMin('');
    setMocMax('');
    setPojemnoscMin('');
    setPojemnoscMax('');
    setSelectedFuelTypes([]);
    setSelectedTransmissions([]);
    setSelectedDrivetrains([]);
    setKolor('');
    setSelectedConditions([]);
    setSelectedDoorCounts([]);
    setSelectedSeatCounts([]);
    setSelectedRequirements([]);
    setBrandSearch('');
    setModelSearch('');
    setBrandDropdownOpen(false);
    setModelDropdownOpen(false);
    setActiveOptionSelect(null);
    setActiveRangeModal(null);
    setRangeDraftMin('');
    setRangeDraftMax('');

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

  const registerOptionSelectRef = (id: string) => (node: HTMLDivElement | null) => {
    optionSelectRefs.current[id] = node;
  };

  const rangeFilterConfigs: Record<RangeFilterId, RangeFilterConfig> = {
    budget: {
      id: 'budget',
      label: 'Budżet (PLN)',
      buttonLabel: 'Ustal budżet',
      minValue: cenaMin,
      maxValue: cenaMax,
      setMin: setCenaMin,
      setMax: setCenaMax,
      inputProps: { min: 0, step: 1000 },
      summaryUnit: 'PLN',
    },
    year: {
      id: 'year',
      label: 'Rok produkcji',
      buttonLabel: 'Ustal rocznik',
      minValue: rokMin,
      maxValue: rokMax,
      setMin: setRokMin,
      setMax: setRokMax,
      inputProps: { min: 1900, max: new Date().getFullYear(), step: 1 },
    },
    mileage: {
      id: 'mileage',
      label: 'Przebieg (km)',
      buttonLabel: 'Ustal przebieg',
      minValue: przebiegMin,
      maxValue: przebiegMax,
      setMin: setPrzebiegMin,
      setMax: setPrzebiegMax,
      inputProps: { min: 0, step: 1000 },
      summaryUnit: 'km',
    },
    power: {
      id: 'power',
      label: 'Moc silnika (KM)',
      buttonLabel: 'Ustal moc',
      minValue: mocMin,
      maxValue: mocMax,
      setMin: setMocMin,
      setMax: setMocMax,
      inputProps: { min: 0, step: 10 },
      summaryUnit: 'KM',
    },
    engine: {
      id: 'engine',
      label: 'Pojemność (cm³)',
      buttonLabel: 'Ustal pojemność',
      minValue: pojemnoscMin,
      maxValue: pojemnoscMax,
      setMin: setPojemnoscMin,
      setMax: setPojemnoscMax,
      inputProps: { min: 0, step: 100 },
      summaryUnit: 'cm³',
    },
  };

  const rangeFilterOrder: RangeFilterId[] = ['budget', 'year', 'mileage', 'power', 'engine'];

  const activeRangeConfig = activeRangeModal ? rangeFilterConfigs[activeRangeModal] : null;

  const openRangeModal = (id: RangeFilterId) => {
    const config = rangeFilterConfigs[id];
    setRangeDraftMin(config.minValue ?? '');
    setRangeDraftMax(config.maxValue ?? '');
    setActiveRangeModal(id);
  };

  const closeRangeModal = () => {
    setActiveRangeModal(null);
  };

  const clearRangeModalDraft = () => {
    setRangeDraftMin('');
    setRangeDraftMax('');
  };

  const applyRangeModal = () => {
    if (!activeRangeModal) return;
    const config = rangeFilterConfigs[activeRangeModal];
    config.setMin(rangeDraftMin);
    config.setMax(rangeDraftMax);
    setActiveRangeModal(null);
  };

  const optionSelectFields: OptionMultiSelectConfig[] = [
    {
      id: 'fuel',
      label: 'Rodzaj paliwa',
      options: fuelOptions,
      selected: selectedFuelTypes,
      setSelected: setSelectedFuelTypes,
      emptyLabel: 'Dowolne paliwo',
    },
    {
      id: 'gearbox',
      label: 'Skrzynia biegów',
      options: transmissionOptions,
      selected: selectedTransmissions,
      setSelected: setSelectedTransmissions,
      emptyLabel: 'Dowolna skrzynia',
    },
    {
      id: 'drive',
      label: 'Napęd',
      options: drivetrainOptions,
      selected: selectedDrivetrains,
      setSelected: setSelectedDrivetrains,
      emptyLabel: 'Dowolny napęd',
    },
    {
      id: 'condition',
      label: 'Stan',
      options: conditionOptions,
      selected: selectedConditions,
      setSelected: setSelectedConditions,
      emptyLabel: 'Dowolny stan',
    },
    {
      id: 'doors',
      label: 'Liczba drzwi',
      options: doorOptions,
      selected: selectedDoorCounts,
      setSelected: setSelectedDoorCounts,
      emptyLabel: 'Dowolna liczba drzwi',
    },
    {
      id: 'seats',
      label: 'Liczba miejsc',
      options: seatOptions,
      selected: selectedSeatCounts,
      setSelected: setSelectedSeatCounts,
      emptyLabel: 'Dowolna liczba miejsc',
    },
  ];

  const requirementsSelectId = 'requirements';
  const requirementsSummary = formatOptionSelectionSummary(
    selectedRequirements,
    requirementsOptions,
    'Brak dodatkowych wymagań',
  );
  const requirementsSelectionCount = selectedRequirements.length;
  const isRequirementsOpen = activeOptionSelect === requirementsSelectId;

  return (
    <div className="App home-page all-listings-page">
      <main className="main-content all-listings-layout">
        <section className="filters-shell full-width">
          <div className="filters-shell-inner">
            <div className="all-filters-panel">
              {dropdownOverlayActive && (
                <div
                  className="dropdown-overlay"
                  onClick={() => {
                    setBrandDropdownOpen(false);
                    setModelDropdownOpen(false);
                    setActiveOptionSelect(null);
                  }}
                />
              )}
              <div className="filters-panel-heading">
                <div>
                  <p className="filters-panel-title">Filtry ogłoszeń</p>
                </div>
              </div>

              <div className="filters-panel-body">
                <div className="filters-panel-row primary">
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
                            <p className="multi-select-empty">Wybierz markę, aby zobaczyć modele.</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={`filter-field multi-select-field ${modelsDisabled ? 'is-disabled' : ''}`} ref={modelDropdownRef}>
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
                        {selectedModels.length > 0 && (
                          <span className="selection-count">{selectedModels.length}</span>
                        )}
                        <span className="multi-select-chevron">▾</span>
                      </button>
                      {modelDropdownOpen && (
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
                            <p className="multi-select-empty">Wybierz markę, aby zobaczyć modele.</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="filter-field multi-select-field">
                    <span className="filter-label">Wyszukiwanie</span>
                    <SearchBar value={search} onChange={setSearch} onEnter={applyFilters} />
                  </div>
                </div>

                <div className="filters-panel-row metrics-grid">
                  {rangeFilterOrder.map((filterId) => {
                    const config = rangeFilterConfigs[filterId];
                    const summary = formatRangeSummary(
                      config.minValue,
                      config.maxValue,
                      config.summaryUnit,
                    );
                    return (
                      <div className="filter-card range-card" key={config.id}>
                        <div className="range-card-header">
                          <span className="filter-label">{config.label}</span>
                          <p className="range-summary">{summary}</p>
                        </div>
                        <button
                          type="button"
                          className="range-trigger-btn"
                          onClick={() => openRangeModal(config.id)}
                        >
                          {config.buttonLabel}
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="filters-panel-row selects-grid">
                  {optionSelectFields.map((field) => {
                    const isOpen = activeOptionSelect === field.id;
                    const selectionCount = field.selected.length;
                    const summary = formatOptionSelectionSummary(field.selected, field.options, field.emptyLabel);

                    return (
                      <div
                        key={field.id}
                        className="filter-field multi-select-field option-select-field"
                        ref={registerOptionSelectRef(field.id)}
                      >
                        <span className="filter-label">{field.label}</span>
                        <div className={`multi-select ${isOpen ? 'is-open' : ''}`}>
                          <button
                            type="button"
                            className="multi-select-trigger"
                            onClick={() =>
                              setActiveOptionSelect((prev) => (prev === field.id ? null : field.id))
                            }
                            aria-haspopup="listbox"
                            aria-expanded={isOpen}
                            aria-controls={`${field.id}-option-multi-select`}
                          >
                            <span className="multi-select-summary">{summary}</span>
                            {selectionCount > 0 && (
                              <span className="selection-count">{selectionCount}</span>
                            )}
                            <span className="multi-select-chevron">▾</span>
                          </button>
                          {isOpen && (
                            <div
                              className="multi-select-dropdown option-multi-select-dropdown"
                              id={`${field.id}-option-multi-select`}
                              role="listbox"
                              aria-multiselectable="true"
                            >
                              <ul className="multi-select-options">
                                {field.options.map((option) => {
                                  const optionKey = option.value || option.label;
                                  const isChecked = field.selected.includes(option.value);
                                  return (
                                    <li key={`${field.id}-${optionKey}`}>
                                      <label
                                        className={`multi-select-option ${isChecked ? 'is-checked' : ''}`}
                                      >
                                        <span className="option-text">
                                          <span className="option-name">{option.label}</span>
                                        </span>
                                        <span className="option-switch">
                                          <input
                                            type="checkbox"
                                            className="switch-input"
                                            checked={isChecked}
                                            onChange={() =>
                                              field.setSelected((prev) =>
                                                prev.includes(option.value)
                                                  ? prev.filter((value) => value !== option.value)
                                                  : [...prev, option.value]
                                              )
                                            }
                                          />
                                          <span className="switch-visual" aria-hidden="true" />
                                        </span>
                                      </label>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  <div className="filter-field multi-select-field option-select-field color-field">
                    <span className="filter-label">Kolor</span>
                    <input type="text" value={kolor} onChange={(e) => setKolor(e.target.value)} placeholder="np. Czarny" />
                  </div>
                  <div
                    className="filter-field multi-select-field option-select-field"
                    ref={registerOptionSelectRef(requirementsSelectId)}
                  >
                    <span className="filter-label">Dodatkowe wymagania</span>
                    <div className={`multi-select ${isRequirementsOpen ? 'is-open' : ''}`}>
                      <button
                        type="button"
                        className="multi-select-trigger"
                        onClick={() =>
                          setActiveOptionSelect((prev) =>
                            prev === requirementsSelectId ? null : requirementsSelectId
                          )
                        }
                        aria-haspopup="listbox"
                        aria-expanded={isRequirementsOpen}
                        aria-controls={`${requirementsSelectId}-option-multi-select`}
                      >
                        <span className="multi-select-summary">{requirementsSummary}</span>
                        {requirementsSelectionCount > 0 && (
                          <span className="selection-count">{requirementsSelectionCount}</span>
                        )}
                        <span className="multi-select-chevron">▾</span>
                      </button>
                      {isRequirementsOpen && (
                        <div
                          className="multi-select-dropdown option-multi-select-dropdown"
                          id={`${requirementsSelectId}-option-multi-select`}
                          role="listbox"
                          aria-multiselectable="true"
                        >
                          <ul className="multi-select-options">
                            {requirementsOptions.map((option) => {
                              const optionKey = option.value || option.label;
                              const isChecked = selectedRequirements.includes(option.value);
                              return (
                                <li key={`${requirementsSelectId}-${optionKey}`}>
                                  <label
                                    className={`multi-select-option ${isChecked ? 'is-checked' : ''}`}
                                  >
                                    <span className="option-text">
                                      <span className="option-name">{option.label}</span>
                                    </span>
                                    <span className="option-switch">
                                      <input
                                        type="checkbox"
                                        className="switch-input"
                                        checked={isChecked}
                                        onChange={() => toggleRequirement(option.value)}
                                      />
                                      <span className="switch-visual" aria-hidden="true" />
                                    </span>
                                  </label>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="filter-actions modern-actions">
                <button type="button" className="btn-secondary" onClick={resetFilters}>Wyczyść</button>
                <button type="button" className="btn-primary" onClick={applyFilters}>Filtruj</button>
              </div>
            </div>

          </div>
        </section>

        <section className="listings promoted full-width all-listings-shell">
          <div className="promoted-inner">
            <div className="listings-header">
              <h2>Wszystkie ogłoszenia</h2>
            </div>

            <Listing items={ogloszenia} loading={loadingOgloszenia} error={ogloszeniaError} />

            {hasMore && (
              <div className="load-more">
                <button type="button" onClick={handleLoadMore} disabled={loadingMore}>
                  {loadingMore ? 'Ładowanie...' : 'Pokaż więcej'}
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      {activeRangeConfig && (
        <div className="range-modal-overlay" role="dialog" aria-modal="true" aria-label={activeRangeConfig.label} onClick={closeRangeModal}>
          <div className="range-modal" onClick={(event) => event.stopPropagation()}>
            <header className="range-modal-header">
              <div>
                <p className="range-modal-eyebrow">Precyzyjny zakres</p>
                <h3>{activeRangeConfig.label}</h3>
              </div>
              <button
                type="button"
                className="range-modal-close"
                onClick={closeRangeModal}
                aria-label="Zamknij okno zakresu"
              >
                ×
              </button>
            </header>
            <div className="range-modal-body">
              <label className="range-modal-field">
                <span>Minimalna wartość</span>
                <input
                  type="number"
                  ref={rangeModalMinInputRef}
                  value={rangeDraftMin}
                  onChange={(e) => setRangeDraftMin(e.target.value)}
                  {...(activeRangeConfig.inputProps ?? {})}
                />
              </label>
              <label className="range-modal-field">
                <span>Maksymalna wartość</span>
                <input
                  type="number"
                  value={rangeDraftMax}
                  onChange={(e) => setRangeDraftMax(e.target.value)}
                  {...(activeRangeConfig.inputProps ?? {})}
                />
              </label>
            </div>
            <div className="range-modal-actions">
              <button type="button" className="range-modal-clear" onClick={clearRangeModalDraft}>
                Wyczyść wartości
              </button>
              <div className="range-modal-actions-primary">
                <button type="button" className="btn-secondary" onClick={closeRangeModal}>
                  Anuluj
                </button>
                <button type="button" className="btn-primary" onClick={applyRangeModal}>
                  Zapisz
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllListings;
