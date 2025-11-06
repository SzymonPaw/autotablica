import React, { useEffect, useMemo, useState } from 'react';
import { createListing, uploadListingPhotos, fetchBrands, fetchModels, MarkaDto, ModelDto } from '../../api/client';
import './AddListingForm.css';

interface AddListingFormProps {
  onSuccess: (createdId: number) => void;
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
}

const AddListingForm: React.FC<AddListingFormProps> = ({ onSuccess }) => {
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
    zdjecia: []
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photosError, setPhotosError] = useState<string | null>(null);
  const [createdId, setCreatedId] = useState<number | null>(null);
  const [brands, setBrands] = useState<MarkaDto[]>([]);
  const [models, setModels] = useState<ModelDto[]>([]);
  const [brandsError, setBrandsError] = useState<string | null>(null);
  const [modelsError, setModelsError] = useState<string | null>(null);

  // Load brands on mount
  useEffect(() => {
    let mounted = true;
    fetchBrands()
      .then((list) => { if (mounted) { setBrands(list); setBrandsError(null); }})
      .catch((e) => { if (mounted) setBrandsError(e?.message || 'Nie udało się pobrać marek.'); });
    return () => { mounted = false; };
  }, []);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Przelicz pojemność silnika: jeśli użytkownik podał w cm³ (np. 2500),
      // zamieniamy na litry (2.5), bo backend trzyma decimal(5,2) w litrach.
      const rawCap = formData.pojemnosc_silnika ? Number(formData.pojemnosc_silnika) : 0;
      const pojemnoscLitry = rawCap > 50 ? Math.round((rawCap / 1000) * 100) / 100 : rawCap; // zaokrąglij do 2 miejsc

      const payload = {
        tytul: computedTitle || 'Ogłoszenie',
        opis: formData.opis.trim(),
        cena: Number(formData.cena),
        marka_id: Number(formData.marka_id),
        model_id: Number(formData.model_id),
        rok_produkcji: formData.rok_produkcji ? Number(formData.rok_produkcji) : null,
        vin: formData.vin.trim(),
        numer_rejestracyjny: formData.numer_rejestracyjny.trim(),
        data_pierwszej_rej: formData.data_pierwszej_rej, // oczekiwany format YYYY-MM-DD
        przebieg: Number(formData.przebieg),
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
        // Kolumna w DB nie jest nullable, zapisujemy w litrach (np. 2.5)
        pojemnosc_silnika: pojemnoscLitry,
        status: 'aktywny',
      } as const;

      const created = await createListing(payload);
      const newId = Number(created?.id ?? 0);
      if (newId > 0) setCreatedId(newId);

      if (newId > 0 && formData.zdjecia.length > 0) {
        try {
          await uploadListingPhotos(newId, formData.zdjecia);
          setPhotosError(null);
          onSuccess(newId);
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
      onSuccess(newId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd podczas dodawania ogłoszenia.');
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
    <form onSubmit={handleSubmit} className="add-listing-form">
      <h2>Dodaj nowe ogłoszenie</h2>

      {error && <div className="error-message">{error}</div>}

      {/* Sekcja podstawowych informacji (cena) */}
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

      {/* Sekcja zdjęć */}
      <section className="form-section">
        <h3>Zdjęcia</h3>
        <div className="form-group">
          <label htmlFor="zdjecia">Dodaj zdjęcia (max. 10)</label>
          <input
            type="file"
            id="zdjecia"
            name="zdjecia"
            onChange={handleChange}
            accept="image/*"
            multiple
            max="10"
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

      {/* Sekcja informacji o pojeździe */}
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
            <input
              type="number"
              id="rok_produkcji"
              name="rok_produkcji"
              value={formData.rok_produkcji}
              onChange={handleChange}
              required
              min="1900"
              max={new Date().getFullYear()}
            />
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

      {/* Sekcja dodatkowych informacji */}
      <section className="form-section">
        <h3>Dodatkowe informacje</h3>
        
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

      <button type="submit" className="submit-button" disabled={isSubmitting}>
        {isSubmitting ? 'Dodawanie...' : 'Dodaj ogłoszenie'}
      </button>
    </form>
  );
};

export default AddListingForm;