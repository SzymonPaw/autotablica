import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createListing, updateListing, saveDraftListing, uploadListingPhotos, fetchBrands, fetchModels, fetchListingById, MarkaDto, ModelDto } from '../../api/client';
import './AddListingForm.css';

interface AddListingFormProps {
  onSuccess: (createdId: number) => void;
  editingId?: number | string;
}

interface ListingFormData {
  opis: string;
  cena: string;
  marka_id: string;
  model_id: string;
  vin: string;
  numer_rejestracyjny: string;
  rok_produkcji: string;
  data_pierwszej_rej: string;
  przebieg: string;
  moc_silnika: string;
  rodzaj_paliwa: string;
  skrzynia_biegow: string;
  pojemnosc_silnika: string;
  naped: string;
  liczba_drzwi: string;
  liczba_miejsc: string;
  kolor: string;
  metalik: boolean;
  stan: string;
  wypadkowy: boolean;
  zarejestrowany_w_polsce: boolean;
  pierwszy_wlasciciel: boolean;
  serwisowany_w_aso: boolean;
  bezwypadkowy: boolean;
  zdjecia: File[];
  wyposazenie: {
    [key: string]: boolean;
  };
}

const AddListingForm: React.FC<AddListingFormProps> = ({ onSuccess, editingId }) => {
  const navigate = useNavigate();
  const isEditing = !!editingId;
  const [isLoadingExisting, setIsLoadingExisting] = useState(isEditing);
  const [formData, setFormData] = useState<ListingFormData>({
    opis: '',
    cena: '',
    marka_id: '',
    model_id: '',
    vin: '',
    numer_rejestracyjny: '',
    rok_produkcji: '',
    data_pierwszej_rej: '',
    przebieg: '',
    moc_silnika: '',
    rodzaj_paliwa: '',
    skrzynia_biegow: '',
    pojemnosc_silnika: '',
    naped: '',
    liczba_drzwi: '',
    liczba_miejsc: '',
    kolor: '',
    metalik: false,
    stan: '',
    wypadkowy: false,
    zarejestrowany_w_polsce: false,
    pierwszy_wlasciciel: false,
    serwisowany_w_aso: false,
    bezwypadkowy: false,
    zdjecia: [],
    wyposazenie: {}
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photosError, setPhotosError] = useState<string | null>(null);
  const [createdId, setCreatedId] = useState<number | null>(null);
  const [brands, setBrands] = useState<MarkaDto[]>([]);
  const [models, setModels] = useState<ModelDto[]>([]);
  const [brandsError, setBrandsError] = useState<string | null>(null);
  const [modelsError, setModelsError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAdditionalInfoExpanded, setIsAdditionalInfoExpanded] = useState(false);
  const [expandedEquipmentCategories, setExpandedEquipmentCategories] = useState<{[key: string]: boolean}>({
    bezpieczenstwo: false,
    komfort: false,
    multimedia: false,
    oswietlenie: false,
    inne: false
  });

  const toggleEquipmentCategory = (category: string) => {
    setExpandedEquipmentCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Load brands on mount
  useEffect(() => {
    let mounted = true;
    fetchBrands()
      .then((list) => { if (mounted) { setBrands(list); setBrandsError(null); }})
      .catch((e) => { if (mounted) setBrandsError(e?.message || 'Nie udało się pobrać marek.'); });
    return () => { mounted = false; };
  }, []);

  // Load existing listing data when editing
  useEffect(() => {
    if (!isEditing) {
      setIsLoadingExisting(false);
      return;
    }

    let mounted = true;
    const loadExistingListing = async () => {
      try {
        const data = await fetchListingById(editingId);
        if (!mounted) return;

        setFormData({
          opis: data.opis || '',
          cena: String(data.cena || ''),
          marka_id: String(data.marka_id || ''),
          model_id: String(data.model_id || ''),
          vin: data.vin || '',
          numer_rejestracyjny: data.numer_rejestracyjny || '',
          rok_produkcji: data.rok_produkcji ? String(data.rok_produkcji) : '',
          data_pierwszej_rej: data.data_pierwszej_rej || '',
          przebieg: data.przebieg ? String(data.przebieg) : '',
          moc_silnika: data.moc_silnika ? String(data.moc_silnika) : '',
          rodzaj_paliwa: data.rodzaj_paliwa || '',
          skrzynia_biegow: data.skrzynia_biegow || '',
          pojemnosc_silnika: data.pojemnosc_silnika ? String(data.pojemnosc_silnika) : '',
          naped: data.naped || '',
          liczba_drzwi: data.liczba_drzwi ? String(data.liczba_drzwi) : '',
          liczba_miejsc: data.liczba_miejsc ? String(data.liczba_miejsc) : '',
          kolor: data.kolor || '',
          metalik: data.metalik || false,
          stan: data.stan || '',
          wypadkowy: data.wypadkowy || false,
          zarejestrowany_w_polsce: data.zarejestrowany_w_polsce || false,
          pierwszy_wlasciciel: data.pierwszy_wlasciciel || false,
          serwisowany_w_aso: data.serwisowany_w_aso || false,
          bezwypadkowy: data.bezwypadkowy || false,
          zdjecia: [],
          wyposazenie: (data.wyposazenie && typeof data.wyposazenie === 'object') ? data.wyposazenie : {}
        });

        setIsLoadingExisting(false);
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Nie udało się załadować danych ogłoszenia');
          setIsLoadingExisting(false);
        }
      }
    };

    loadExistingListing();
    return () => { mounted = false; };
  }, [isEditing, editingId]);

  // Load models when marka_id changes
  useEffect(() => {
    let mounted = true;
    if (formData.marka_id) {
      fetchModels(Number(formData.marka_id))
        .then((list) => { if (mounted) { setModels(list); setModelsError(null); }})
        .catch((e) => { if (mounted) setModelsError(e?.message || 'Nie udało się pobrać modeli.'); });
    } else {
      setModels([]);
    }
    return () => { mounted = false; };
  }, [formData.marka_id]);

  const selectedBrand = useMemo(() => brands.find(b => String(b.id) === String(formData.marka_id)) || null, [brands, formData.marka_id]);
  const selectedModel = useMemo(() => models.find(m => String(m.id) === String(formData.model_id)) || null, [models, formData.model_id]);
  const computedTitle = useMemo(() => {
    const parts: string[] = [];
    if (selectedBrand?.nazwa) parts.push(selectedBrand.nazwa);
    if (selectedModel?.nazwa) parts.push(selectedModel.nazwa);
    return parts.join(' ').trim();
  }, [selectedBrand, selectedModel]);

  // Generuj listę lat od aktualnego roku do 1900
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const yearList: number[] = [];
    for (let year = currentYear; year >= 1900; year--) {
      yearList.push(year);
    }
    return yearList;
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
    if (files.length > 0) {
      const existingCount = formData.zdjecia.length;
      const availableSlots = 10 - existingCount;
      const filesToAdd = files.slice(0, availableSlots);
      
      setFormData(prev => ({
        ...prev,
        zdjecia: [...prev.zdjecia, ...filesToAdd]
      }));

      if (files.length > availableSlots) {
        alert(`Możesz dodać maksymalnie 10 zdjęć. Dodano ${filesToAdd.length} z ${files.length} upuszczonych plików.`);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      
      // Sprawdź czy to checkbox wyposażenia
      if (name.startsWith('wyposazenie_')) {
        const equipmentKey = name.replace('wyposazenie_', '');
        setFormData(prev => ({
          ...prev,
          wyposazenie: {
            ...prev.wyposazenie,
            [equipmentKey]: checked
          }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      }
    } else if (type === 'file') {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        setFormData(prev => ({
          ...prev,
          zdjecia: Array.from(files)
        }));
      }
    } else {
      // If brand changed, reset model
      if (name === 'marka_id') {
        setFormData(prev => ({ ...prev, marka_id: value, model_id: '' }));
        return;
      }
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const buildPayload = () => {
    // Przelicz pojemność silnika: jeśli użytkownik podał w cm³ (np. 2500),
    // zamieniamy na litry (2.5), bo backend trzyma decimal(5,2) w litrach.
    const rawCap = formData.pojemnosc_silnika ? Number(formData.pojemnosc_silnika) : 0;
    const pojemnoscLitry = rawCap > 50 ? Math.round((rawCap / 1000) * 100) / 100 : rawCap; // zaokrąglij do 2 miejsc

    // Filtruj wyposażenie - wysyłaj tylko to co jest zaznaczone (true)
    const wyposazenie = Object.entries(formData.wyposazenie)
      .filter(([_, value]) => value === true)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    return {
      tytul: computedTitle || 'Ogłoszenie',
      opis: formData.opis.trim(),
      cena: formData.cena ? Number(formData.cena) : 0,
      marka_id: formData.marka_id ? Number(formData.marka_id) : 0,
      model_id: formData.model_id ? Number(formData.model_id) : 0,
      rok_produkcji: formData.rok_produkcji ? Number(formData.rok_produkcji) : null,
      vin: formData.vin.trim(),
      numer_rejestracyjny: formData.numer_rejestracyjny.trim(),
      data_pierwszej_rej: formData.data_pierwszej_rej,
      przebieg: formData.przebieg ? Number(formData.przebieg) : 0,
      moc_silnika: formData.moc_silnika ? Number(formData.moc_silnika) : null,
      naped: formData.naped || null,
      liczba_drzwi: formData.liczba_drzwi ? Number(formData.liczba_drzwi) : null,
      liczba_miejsc: formData.liczba_miejsc ? Number(formData.liczba_miejsc) : null,
      kolor: formData.kolor || null,
      metalik: !!formData.metalik,
      stan: formData.stan || null,
      wypadkowy: !!formData.wypadkowy,
      zarejestrowany_w_polsce: !!formData.zarejestrowany_w_polsce,
      pierwszy_wlasciciel: !!formData.pierwszy_wlasciciel,
      serwisowany_w_aso: !!formData.serwisowany_w_aso,
      bezwypadkowy: !!formData.bezwypadkowy,
      rodzaj_paliwa: formData.rodzaj_paliwa,
      skrzynia_biegow: formData.skrzynia_biegow,
      pojemnosc_silnika: pojemnoscLitry || 0,
      status: 'aktywny',
      wyposazenie: Object.keys(wyposazenie).length > 0 ? wyposazenie : null,
    };
  };

  const buildDraftPayload = () => {
    // Dla szkiców wszystkie pola są opcjonalne
    const rawCap = formData.pojemnosc_silnika ? Number(formData.pojemnosc_silnika) : null;
    const pojemnoscLitry = rawCap && rawCap > 50 ? Math.round((rawCap / 1000) * 100) / 100 : rawCap;

    // Filtruj wyposażenie - wysyłaj tylko to co jest zaznaczone (true)
    const wyposazenie = Object.entries(formData.wyposazenie)
      .filter(([_, value]) => value === true)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    return {
      tytul: computedTitle || null,
      opis: formData.opis.trim() || null,
      cena: formData.cena ? Number(formData.cena) : null,
      marka_id: formData.marka_id ? Number(formData.marka_id) : null,
      model_id: formData.model_id ? Number(formData.model_id) : null,
      rok_produkcji: formData.rok_produkcji ? Number(formData.rok_produkcji) : null,
      vin: formData.vin.trim() || null,
      numer_rejestracyjny: formData.numer_rejestracyjny.trim() || null,
      data_pierwszej_rej: formData.data_pierwszej_rej || null,
      przebieg: formData.przebieg ? Number(formData.przebieg) : null,
      moc_silnika: formData.moc_silnika ? Number(formData.moc_silnika) : null,
      naped: formData.naped || null,
      liczba_drzwi: formData.liczba_drzwi ? Number(formData.liczba_drzwi) : null,
      liczba_miejsc: formData.liczba_miejsc ? Number(formData.liczba_miejsc) : null,
      kolor: formData.kolor || null,
      metalik: formData.metalik || null,
      stan: formData.stan || null,
      wypadkowy: formData.wypadkowy || null,
      zarejestrowany_w_polsce: formData.zarejestrowany_w_polsce || null,
      pierwszy_wlasciciel: formData.pierwszy_wlasciciel || null,
      serwisowany_w_aso: formData.serwisowany_w_aso || null,
      bezwypadkowy: formData.bezwypadkowy || null,
      rodzaj_paliwa: formData.rodzaj_paliwa || null,
      skrzynia_biegow: formData.skrzynia_biegow || null,
      pojemnosc_silnika: pojemnoscLitry,
      wyposazenie: Object.keys(wyposazenie).length > 0 ? wyposazenie : null,
    };
  };

  const saveDraft = async () => {
    setError(null);
    
    // Minimalna walidacja dla szkicu - wymagamy marki i modelu
    if (!formData.marka_id || !formData.model_id) {
      setError('Aby zapisać szkic, musisz wybrać przynajmniej markę i model pojazdu.');
      return;
    }
    
    setIsSubmitting(true);

    try {
      const payload = buildDraftPayload();
      
      const created = await saveDraftListing(payload);
      const newId = Number(created?.id ?? 0);
      
      // Nie próbujemy uploadować zdjęć do szkicu - to wymaga osobnej implementacji
      // if (newId > 0 && formData.zdjecia.length > 0) {
      //   try {
      //     await uploadListingPhotos(newId, formData.zdjecia);
      //   } catch (uploadErr) {
      //     console.warn('Upload zdjęć do szkicu nie powiódł się:', uploadErr);
      //   }
      // }
      
      alert('Szkic ogłoszenia został zapisany!');
      // Przekieruj do panelu klienta, zakładka ogłoszeń z widokiem szkiców
      navigate('/panel-klienta?tab=listings&view=drafts');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd podczas zapisywania szkicu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const payload = buildPayload();
      let resultId: number;

      if (isEditing) {
        // Update existing listing
        const updated = await updateListing(editingId, payload);
        resultId = Number(updated?.id ?? editingId ?? 0);
      } else {
        // Create new listing
        const created = await createListing(payload);
        resultId = Number(created?.id ?? 0);
        if (resultId > 0) setCreatedId(resultId);
      }

      if (resultId > 0 && formData.zdjecia.length > 0) {
        try {
          await uploadListingPhotos(resultId, formData.zdjecia);
          setPhotosError(null);
          onSuccess(resultId);
          return;
        } catch (uploadErr) {
          const msg = uploadErr instanceof Error ? uploadErr.message : 'Nie udało się wysłać zdjęć.';
          setPhotosError(msg);
          console.warn('Upload zdjęć nie powiódł się:', uploadErr);
          // Zatrzymaj przekierowanie — pozwól użytkownikowi spróbować ponownie bez duplikowania ogłoszenia
          return;
        }
      }
      // Jeśli nie ma zdjęć do wysłania — od razu przekieruj
      onSuccess(resultId);
    } catch (err) {
      const msg = isEditing ? 'Nie udało się zaktualizować ogłoszenia.' : 'Nie udało się dodać ogłoszenia.';
      setError(err instanceof Error ? err.message : msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const retryUpload = async () => {
    if (!createdId) return;
    if (!formData.zdjecia.length) return;
    setIsSubmitting(true);
    setPhotosError(null);
    try {
      await uploadListingPhotos(createdId, formData.zdjecia);
      onSuccess(createdId);
    } catch (uploadErr) {
      const msg = uploadErr instanceof Error ? uploadErr.message : 'Nie udało się wysłać zdjęć.';
      setPhotosError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-listing-page">
      <form onSubmit={handleSubmit} className="add-listing-form">
      <h2>{isEditing ? 'Edytuj ogłoszenie' : 'Dodaj nowe ogłoszenie'}</h2>

      {isLoadingExisting && <div style={{ textAlign: 'center', padding: '20px' }}>Ładowanie danych ogłoszenia...</div>}

      {error && <div className="error-message">{error}</div>}

      {/* Sekcja informacji o pojeździe (przenieione na początek) */}
      <section className="form-section">
        <h3>Informacje o pojeździe</h3>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="marka_id">Marka</label>
            <select
              id="marka_id"
              name="marka_id"
              value={formData.marka_id}
              onChange={handleChange}
              required
            >
              <option value="">Wybierz markę</option>
              {brands.length === 0 && !brandsError && (
                <option value="" disabled>(Brak marek — uruchom seed lub dodaj dane)</option>
              )}
              {brandsError && (
                <option value="" disabled>Nie udało się pobrać marek</option>
              )}
              {brands.map(b => (
                <option key={b.id} value={b.id}>{b.nazwa}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="model_id">Model</label>
            <select
              id="model_id"
              name="model_id"
              value={formData.model_id}
              onChange={handleChange}
              required
              disabled={!formData.marka_id}
            >
              <option value="">Wybierz model</option>
              {modelsError && (
                <option value="" disabled>Nie udało się pobrać modeli</option>
              )}
              {models.length === 0 && formData.marka_id && !modelsError && (
                <option value="" disabled>(Brak modeli dla wybranej marki)</option>
              )}
              {models.map(m => (
                <option key={m.id} value={m.id}>{m.nazwa}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="rok_produkcji">Rok produkcji</label>
            <select
              id="rok_produkcji"
              name="rok_produkcji"
              value={formData.rok_produkcji}
              onChange={handleChange}
              required
            >
              <option value="">Wybierz rok produkcji</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="przebieg">Przebieg (km)</label>
            <input
              type="number"
              id="przebieg"
              name="przebieg"
              value={formData.przebieg}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="data_pierwszej_rej">Data pierwszej rejestracji</label>
            <input
              type="date"
              id="data_pierwszej_rej"
              name="data_pierwszej_rej"
              value={formData.data_pierwszej_rej}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </section>

      {/* Sekcja specyfikacji technicznej */}
      <section className="form-section">
        <h3>Specyfikacja techniczna</h3>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="rodzaj_paliwa">Rodzaj paliwa</label>
            <select
              id="rodzaj_paliwa"
              name="rodzaj_paliwa"
              value={formData.rodzaj_paliwa}
              onChange={handleChange}
              required
            >
              <option value="">Wybierz rodzaj paliwa</option>
              <option value="benzyna">Benzyna</option>
              <option value="diesel">Diesel</option>
              <option value="lpg">LPG</option>
              <option value="elektryczny">Elektryczny</option>
              <option value="hybryda">Hybryda</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="skrzynia_biegow">Skrzynia biegów</label>
            <select
              id="skrzynia_biegow"
              name="skrzynia_biegow"
              value={formData.skrzynia_biegow}
              onChange={handleChange}
              required
            >
              <option value="">Wybierz typ skrzyni</option>
              <option value="manualna">Manualna</option>
              <option value="automatyczna">Automatyczna</option>
              <option value="polautomatyczna">Półautomatyczna</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="pojemnosc_silnika">Pojemność silnika (cm³ lub litry)</label>
            <input
              type="number"
              id="pojemnosc_silnika"
              name="pojemnosc_silnika"
              value={formData.pojemnosc_silnika}
              onChange={handleChange}
              required
              min="0"
              step="1"
              placeholder="np. 2494 (cm³) lub 2.5 (l)"
            />
            <small>Możesz wpisać wartość w cm³ (np. 2500) lub w litrach (np. 2.5) — przeliczymy automatycznie.</small>
          </div>

          <div className="form-group">
            <label htmlFor="moc_silnika">Moc silnika (KM)</label>
            <input
              type="number"
              id="moc_silnika"
              name="moc_silnika"
              value={formData.moc_silnika}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="naped">Napęd</label>
            <select
              id="naped"
              name="naped"
              value={formData.naped}
              onChange={handleChange}
              required
            >
              <option value="">Wybierz rodzaj napędu</option>
              <option value="przedni">Przedni</option>
              <option value="tylny">Tylny</option>
              <option value="4x4">4x4</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="liczba_drzwi">Liczba drzwi</label>
            <select
              id="liczba_drzwi"
              name="liczba_drzwi"
              value={formData.liczba_drzwi}
              onChange={handleChange}
              required
            >
              <option value="">Wybierz liczbę drzwi</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
      </section>

      {/* Sekcja statusu pojazdu */}
      <section className="form-section">
        <h3>Status pojazdu</h3>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="vin">VIN</label>
            <input
              type="text"
              id="vin"
              name="vin"
              value={formData.vin}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="numer_rejestracyjny">Numer rejestracyjny</label>
            <input
              type="text"
              id="numer_rejestracyjny"
              name="numer_rejestracyjny"
              value={formData.numer_rejestracyjny}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="kolor">Kolor</label>
            <input
              type="text"
              id="kolor"
              name="kolor"
              value={formData.kolor}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="stan">Stan</label>
            <select
              id="stan"
              name="stan"
              value={formData.stan}
              onChange={handleChange}
              required
            >
              <option value="">Wybierz stan</option>
              <option value="nowy">Nowy</option>
              <option value="uzywany">Używany</option>
              <option value="uszkodzony">Uszkodzony</option>
            </select>
          </div>
        </div>

        <div className="additional-info-toggle">
          <button
            type="button"
            className="toggle-button"
            onClick={() => setIsAdditionalInfoExpanded(!isAdditionalInfoExpanded)}
          >
            <span>Status pojazdu</span>
            <svg
              className={`toggle-icon ${isAdditionalInfoExpanded ? 'expanded' : ''}`}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          {isAdditionalInfoExpanded && (
            <div className="checkboxes-group">
              <label>
                <input
                  type="checkbox"
                  name="metalik"
                  checked={formData.metalik}
                  onChange={handleChange}
                />
                Lakier metalik
              </label>

              <label>
                <input
                  type="checkbox"
                  name="bezwypadkowy"
                  checked={formData.bezwypadkowy}
                  onChange={handleChange}
                />
                Bezwypadkowy
              </label>

              <label>
                <input
                  type="checkbox"
                  name="pierwszy_wlasciciel"
                  checked={formData.pierwszy_wlasciciel}
                  onChange={handleChange}
                />
                Pierwszy właściciel
              </label>

              <label>
                <input
                  type="checkbox"
                  name="serwisowany_w_aso"
                  checked={formData.serwisowany_w_aso}
                  onChange={handleChange}
                />
                Serwisowany w ASO
              </label>

              <label>
                <input
                  type="checkbox"
                  name="zarejestrowany_w_polsce"
                  checked={formData.zarejestrowany_w_polsce}
                  onChange={handleChange}
                />
                Zarejestrowany w Polsce
              </label>
            </div>
          )}
        </div>
      </section>

      {/* Sekcja wyposażenia */}
      <section className="form-section">
        <h3>Wyposażenie pojazdu</h3>
        
        {/* Bezpieczeństwo */}
        <div className="equipment-category">
          <button
            type="button"
            className="equipment-toggle-button"
            onClick={() => toggleEquipmentCategory('bezpieczenstwo')}
          >
            <span>Bezpieczeństwo</span>
            <svg
              className={`toggle-icon ${expandedEquipmentCategories.bezpieczenstwo ? 'expanded' : ''}`}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          {expandedEquipmentCategories.bezpieczenstwo && (
            <div className="checkboxes-group">
            <label>
              <input
                type="checkbox"
                name="wyposazenie_abs"
                checked={formData.wyposazenie['abs'] || false}
                onChange={handleChange}
              />
              ABS
            </label>
            <label>
              <input
                type="checkbox"
                name="wyposazenie_esp"
                checked={formData.wyposazenie['esp'] || false}
                onChange={handleChange}
              />
              ESP (Kontrola Trakcji)
            </label>
            <label>
              <input
                type="checkbox"
                name="wyposazenie_poduszki_powietrzne"
                checked={formData.wyposazenie['poduszki_powietrzne'] || false}
                onChange={handleChange}
              />
              Poduszki Powietrzne
            </label>
            <label>
              <input
                type="checkbox"
                name="wyposazenie_isofix"
                checked={formData.wyposazenie['isofix'] || false}
                onChange={handleChange}
              />
              ISOFIX
            </label>
            <label>
              <input
                type="checkbox"
                name="wyposazenie_system_ostrzegania_pasa"
                checked={formData.wyposazenie['system_ostrzegania_pasa'] || false}
                onChange={handleChange}
              />
              Asystent Pasa Ruchu
            </label>
            <label>
              <input
                type="checkbox"
                name="wyposazenie_asystent_martwego_pola"
                checked={formData.wyposazenie['asystent_martwego_pola'] || false}
                onChange={handleChange}
              />
              Asystent Martwego Pola
            </label>
            <label>
              <input
                type="checkbox"
                name="wyposazenie_kamera_cofania"
                checked={formData.wyposazenie['kamera_cofania'] || false}
                onChange={handleChange}
              />
              Kamera Cofania
            </label>
            <label>
              <input
                type="checkbox"
                name="wyposazenie_czujniki_parkowania"
                checked={formData.wyposazenie['czujniki_parkowania'] || false}
                onChange={handleChange}
              />
              Czujniki Parkowania
            </label>
          </div>
          )}
        </div>

        {/* Komfort */}
        <div className="equipment-category">
          <button
            type="button"
            className="equipment-toggle-button"
            onClick={() => toggleEquipmentCategory('komfort')}
          >
            <span>Komfort</span>
            <svg
              className={`toggle-icon ${expandedEquipmentCategories.komfort ? 'expanded' : ''}`}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          {expandedEquipmentCategories.komfort && (
            <div className="checkboxes-group">
            <label>
              <input
                type="checkbox"
                name="wyposazenie_klimatyzacja"
                checked={formData.wyposazenie['klimatyzacja'] || false}
                onChange={handleChange}
              />
              Klimatyzacja
            </label>
            <label>
              <input
                type="checkbox"
                name="wyposazenie_klimatyzacja_automatyczna"
                checked={formData.wyposazenie['klimatyzacja_automatyczna'] || false}
                onChange={handleChange}
              />
              Klimatyzacja Automatyczna
            </label>
            <label>
              <input
                type="checkbox"
                name="wyposazenie_tempomat"
                checked={formData.wyposazenie['tempomat'] || false}
                onChange={handleChange}
              />
              Tempomat
            </label>
            <label>
              <input
                type="checkbox"
                name="wyposazenie_tempomat_aktywny"
                checked={formData.wyposazenie['tempomat_aktywny'] || false}
                onChange={handleChange}
              />
              Tempomat aktywny
            </label>
            <label>
              <input
                type="checkbox"
                name="wyposazenie_elektryczne_szyby"
                checked={formData.wyposazenie['elektryczne_szyby'] || false}
                onChange={handleChange}
              />
              Elektryczne Szyby
            </label>
            <label>
              <input
                type="checkbox"
                name="wyposazenie_elektryczne_lusterka"
                checked={formData.wyposazenie['elektryczne_lusterka'] || false}
                onChange={handleChange}
              />
              Elektryczne Lusterka
            </label>
            <label>
              <input
                type="checkbox"
                name="wyposazenie_podgrzewane_fotele"
                checked={formData.wyposazenie['podgrzewane_fotele'] || false}
                onChange={handleChange}
              />
              Podgrzewane Fotele
            </label>
            <label>
              <input
                type="checkbox"
                name="wyposazenie_wentylowane_fotele"
                checked={formData.wyposazenie['wentylowane_fotele'] || false}
                onChange={handleChange}
              />
              Wentylowane Fotele
            </label>
            <label>
              <input
                type="checkbox"
                name="wyposazenie_fotele_ze_skory"
                checked={formData.wyposazenie['fotele_ze_skory'] || false}
                onChange={handleChange}
              />
              Fotele Ze Skóry
            </label>
            <label>
              <input
                type="checkbox"
                name="wyposazenie_fotele_sportowe"
                checked={formData.wyposazenie['fotele_sportowe'] || false}
                onChange={handleChange}
              />
              Fotele Sportowe
            </label>
            <label>
              <input
                type="checkbox"
                name="wyposazenie_panoramiczny_dach"
                checked={formData.wyposazenie['panoramiczny_dach'] || false}
                onChange={handleChange}
              />
              Panoramiczny Dach
            </label>
            <label>
              <input
                type="checkbox"
                name="wyposazenie_szyberdach"
                checked={formData.wyposazenie['szyberdach'] || false}
                onChange={handleChange}
              />
              Szyberdach
            </label>
          </div>
          )}
        </div>

        {/* Multimedia */}
        <div className="equipment-category">
          <button
            type="button"
            className="equipment-toggle-button"
            onClick={() => toggleEquipmentCategory('multimedia')}
          >
            <span>Multimedia</span>
            <svg
              className={`toggle-icon ${expandedEquipmentCategories.multimedia ? 'expanded' : ''}`}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          {expandedEquipmentCategories.multimedia && (
            <div className="checkboxes-group">
            <label>
              <input
                type="checkbox"
                name="wyposazenie_radio"
                checked={formData.wyposazenie['radio'] || false}
                onChange={handleChange}
              />
              Radio
            </label>
            <label>
              <input
                type="checkbox"
                name="wyposazenie_bluetooth"
                checked={formData.wyposazenie['bluetooth'] || false}
                onChange={handleChange}
              />
              Bluetooth
            </label>
            <label>
              <input
                type="checkbox"
                name="wyposazenie_android_auto"
                checked={formData.wyposazenie['android_auto'] || false}
                onChange={handleChange}
              />
              Android Auto
            </label>
            <label>
              <input
                type="checkbox"
                name="wyposazenie_apple_carplay"
                checked={formData.wyposazenie['apple_carplay'] || false}
                onChange={handleChange}
              />
              Apple CarPlay
            </label>
            <label>
              <input
                type="checkbox"
                name="wyposazenie_nawigacja"
                checked={formData.wyposazenie['nawigacja'] || false}
                onChange={handleChange}
              />
              Nawigacja GPS
            </label>
            <label>
              <input
                type="checkbox"
                name="wyposazenie_glosniki_premium"
                checked={formData.wyposazenie['glosniki_premium'] || false}
                onChange={handleChange}
              />
              System Audio Premium
            </label>
            <label>
              <input
                type="checkbox"
                name="wyposazenie_ekran_dotykowy"
                checked={formData.wyposazenie['ekran_dotykowy'] || false}
                onChange={handleChange}
              />
              Ekran Dotykowy
            </label>
            <label>
              <input
                type="checkbox"
                name="wyposazenie_ladowanie_indukcyjne"
                checked={formData.wyposazenie['ladowanie_indukcyjne'] || false}
                onChange={handleChange}
              />
              Ładowanie Indukcyjne
            </label>
          </div>
          )}
        </div>

        {/* Oświetlenie */}
        <div className="equipment-category">
          <button
            type="button"
            className="equipment-toggle-button"
            onClick={() => toggleEquipmentCategory('oswietlenie')}
          >
            <span>Oświetlenie</span>
            <svg
              className={`toggle-icon ${expandedEquipmentCategories.oswietlenie ? 'expanded' : ''}`}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          {expandedEquipmentCategories.oswietlenie && (
            <div className="checkboxes-group">
            <label>
              <input
                type="checkbox"
                name="wyposazenie_led"
                checked={formData.wyposazenie['led'] || false}
                onChange={handleChange}
              />
              Reflektory LED
            </label>
            <label>
              <input
                type="checkbox"
                name="wyposazenie_xenon"
                checked={formData.wyposazenie['xenon'] || false}
                onChange={handleChange}
              />
              Reflektory Xenon
            </label>
            <label>
              <input
                type="checkbox"
                name="wyposazenie_swiatla_przeciwmgielne"
                checked={formData.wyposazenie['swiatla_przeciwmgielne'] || false}
                onChange={handleChange}
              />
              Światła Przeciwmgielne
            </label>
            <label>
              <input
                type="checkbox"
                name="wyposazenie_automatyczne_swiatla"
                checked={formData.wyposazenie['automatyczne_swiatla'] || false}
                onChange={handleChange}
              />
              Automatyczne Światła
            </label>
            <label>
              <input
                type="checkbox"
                name="wyposazenie_swiatla_do_jazdy_dziennej"
                checked={formData.wyposazenie['swiatla_do_jazdy_dziennej'] || false}
                onChange={handleChange}
              />
              Światła Do Jazdy Dziennej
            </label>
          </div>
          )}
        </div>

        {/* Inne */}
        <div className="equipment-category">
          <button
            type="button"
            className="equipment-toggle-button"
            onClick={() => toggleEquipmentCategory('inne')}
          >
            <span>Inne</span>
            <svg
              className={`toggle-icon ${expandedEquipmentCategories.inne ? 'expanded' : ''}`}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          {expandedEquipmentCategories.inne && (
            <div className="checkboxes-group">
            <label>
              <input
                type="checkbox"
                name="wyposazenie_alufelgi"
                checked={formData.wyposazenie['alufelgi'] || false}
                onChange={handleChange}
              />
              Alufelgi
            </label>
            <label>
              <input
                type="checkbox"
                name="wyposazenie_hak"
                checked={formData.wyposazenie['hak'] || false}
                onChange={handleChange}
              />
              Hak Holowniczy
            </label>
            <label>
              <input
                type="checkbox"
                name="wyposazenie_relingi_dachowe"
                checked={formData.wyposazenie['relingi_dachowe'] || false}
                onChange={handleChange}
              />
              Relingi Dachowe
            </label>
            <label>
              <input
                type="checkbox"
                name="wyposazenie_alarm"
                checked={formData.wyposazenie['alarm'] || false}
                onChange={handleChange}
              />
              Alarm
            </label>
            <label>
              <input
                type="checkbox"
                name="wyposazenie_immobiliser"
                checked={formData.wyposazenie['immobiliser'] || false}
                onChange={handleChange}
              />
              Immobiliser
            </label>
            <label>
              <input
                type="checkbox"
                name="wyposazenie_komputer_pokladowy"
                checked={formData.wyposazenie['komputer_pokladowy'] || false}
                onChange={handleChange}
              />
              Komputer Pokładowy
            </label>
            <label>
              <input
                type="checkbox"
                name="wyposazenie_head_up_display"
                checked={formData.wyposazenie['head_up_display'] || false}
                onChange={handleChange}
              />
              Head-Up Display
            </label>
            <label>
              <input
                type="checkbox"
                name="wyposazenie_kluczyk_bezdotykowy"
                checked={formData.wyposazenie['kluczyk_bezdotykowy'] || false}
                onChange={handleChange}
              />
              Kluczyk Bezdotykowy
            </label>
            <label>
              <input
                type="checkbox"
                name="wyposazenie_start_stop"
                checked={formData.wyposazenie['start_stop'] || false}
                onChange={handleChange}
              />
              System Start-Stop
            </label>
          </div>
          )}
        </div>
      </section>

      {/* Sekcja zdjęć (przeniesione bliżej końca) */}
      <section className="form-section">
        <h3>Zdjęcia</h3>
        <div className="form-group">
          <label>Dodaj zdjęcia</label>
          <div 
            className={`drop-zone ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('zdjecia')?.click()}
          >
            <div className="drop-zone-content">
              <svg className="drop-zone-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              <p className="drop-zone-text">
                <strong>Kliknij, aby wybrać</strong> lub upuść pliki
              </p>
              <p className="drop-zone-hint">Możesz dodać maksymalnie 10 zdjęć w formatach PNG, JPG, JPEG</p>
            </div>
          </div>
          <input
            type="file"
            id="zdjecia"
            name="zdjecia"
            onChange={handleChange}
            accept="image/*"
            multiple
            style={{ display: 'none' }}
          />
          {photosError && (
            <div className="error-message" style={{ marginTop: 8 }}>
              {photosError}
            </div>
          )}
          <div className="file-preview">
            {formData.zdjecia.map((file, index) => (
              <div key={index} className="preview-item">
                <img src={URL.createObjectURL(file)} alt={`Podgląd ${index + 1}`} />
                <button type="button" onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    zdjecia: prev.zdjecia.filter((_, i) => i !== index)
                  }));
                }}>Usuń</button>
              </div>
            ))}
          </div>
          {createdId && photosError && (
            <div style={{ marginTop: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
              <button type="button" onClick={retryUpload} disabled={isSubmitting}>
                {isSubmitting ? 'Ponawianie...' : 'Spróbuj wysłać zdjęcia ponownie'}
              </button>
              <a href={`/ogloszenie/${createdId}`} style={{ color: '#3498db' }}>Przejdź do ogłoszenia bez zdjęć</a>
            </div>
          )}
        </div>
      </section>

      {/* Sekcja podstawowych informacji (cena) (przeniesiona przed opis) */}
      <section className="form-section">
        <h3>Podstawowe informacje</h3>
        <div className="form-group">
          <label htmlFor="cena">Cena (PLN)</label>
          <input
            type="number"
            id="cena"
            name="cena"
            value={formData.cena}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </div>
      </section>

      {/* Sekcja opisu (na końcu) */}
      <section className="form-section">
        <h3>Opis</h3>
        <div className="form-group">
          <label htmlFor="opis">Opis ogłoszenia</label>
          <textarea
            id="opis"
            name="opis"
            value={formData.opis}
            onChange={handleChange}
            required
            rows={6}
          />
        </div>
      </section>

      <div className="form-actions">
        {!isEditing && (
          <button 
            type="button" 
            className="draft-button" 
            onClick={saveDraft}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Zapisywanie...' : 'Zapisz wersję roboczą'}
          </button>
        )}
        <button type="submit" className="submit-button add-listing-button" disabled={isSubmitting || isLoadingExisting}>
          {isSubmitting ? (isEditing ? 'Aktualizowanie...' : 'Dodawanie...') : (isEditing ? 'Zaktualizuj ogłoszenie' : 'Dodaj ogłoszenie')}
        </button>
      </div>
      </form>
    </div>
  );
};

export default AddListingForm;