export const API_BASE_URL = process.env.REACT_APP_API_URL ?? 'http://localhost:8000/api';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  token?: string;
  token_type?: string;
  raw?: any;
}

interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<ApiResponse<T>> {
  const url = path.startsWith('http') ? path : `${API_BASE_URL}${path}`;
  
  // Get token from localStorage
  const token = localStorage.getItem('autotablica_token');

  try {
    const response = await fetch(url, {
      ...init,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...init.headers,
      },
      credentials: 'include',
    });

    // Try to parse JSON body. If empty, set to null.
    let parsed: any = null;
    try {
      parsed = await response.json();
    } catch (e) {
      parsed = null;
    }

    if (!response.ok) {
      const error = (parsed as ApiError) || { message: `Żądanie zakończyło się kodem ${response.status}` };
      throw new Error(error.message || `Żądanie zakończyło się kodem ${response.status}`);
    }

    // Normalize response shape: backend may return { data: ... } or raw object like { token: ..., data: ... }.
    const normalized: ApiResponse<T> = {
      data: (parsed && (parsed.data !== undefined ? parsed.data : parsed)) as T,
      message: parsed?.message,
      token: parsed?.token,
      token_type: parsed?.token_type,
      raw: parsed,
    };

    // If backend returned a token at the root (e.g. { token, data }), make sure it's accessible
    // under normalized.data.token to keep existing consumers working.
    if (parsed && parsed.token) {
      try {
        // Ensure data is an object we can attach token to
        if (normalized.data && typeof normalized.data === 'object') {
          (normalized.data as any).token = parsed.token;
        } else {
          // If data is not an object (e.g. null), create an object containing token
          normalized.data = { token: parsed.token } as unknown as T;
        }
      } catch (e) {
        // ignore if we can't attach
      }
    }

    return normalized;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Wystąpił nieoczekiwany błąd podczas komunikacji z API.');
  }
}

export interface PaginatedResponse<T> {
  data: T[];
  links?: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta?: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface FavoritesResponse<T> extends PaginatedResponse<T> {
  filters?: Record<string, any>;
  sort?: string[];
}

export async function fetchListings(params?: Record<string, any>): Promise<PaginatedResponse<any>> {
  const searchParams = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value != null) {
        searchParams.append(key, String(value));
      }
    });
  }

  const response = await apiRequest<PaginatedResponse<any>>(`/ogloszenia${searchParams.toString() ? `?${searchParams}` : ''}`);
  return response.data;
}

export async function fetchListingById(id: number | string): Promise<any> {
  if (id == null) throw new Error('Missing id');
  const response = await apiRequest<any>(`/ogloszenia/${id}`);
  return response.data;
}

export async function fetchFavoriteListings(params?: Record<string, any>): Promise<FavoritesResponse<any>> {
  const searchParams = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value != null && value !== '') {
        searchParams.append(key, String(value));
      }
    });
  }

  const query = searchParams.toString();
  const response = await apiRequest<any>(`/ulubione${query ? `?${query}` : ''}`);

  const raw = response.raw;
  if (raw && typeof raw === 'object' && Array.isArray(raw.data)) {
    return {
      data: raw.data,
      links: raw.links,
      meta: raw.meta,
      filters: raw.filters,
      sort: raw.sort,
    };
  }

  const fallbackData = Array.isArray(response.data) ? response.data : [];
  return {
    data: fallbackData,
  };
}

export async function addListingToFavorites(listingId: number | string): Promise<void> {
  if (listingId == null) {
    throw new Error('Brak ID ogłoszenia.');
  }

  await apiRequest(`/ogloszenia/${listingId}/ulubione`, {
    method: 'POST',
    body: JSON.stringify({}),
  });
}

export async function removeListingFromFavorites(listingId: number | string): Promise<void> {
  if (listingId == null) {
    throw new Error('Brak ID ogłoszenia.');
  }

  await apiRequest(`/ogloszenia/${listingId}/ulubione`, {
    method: 'DELETE',
  });
}

export type CreateListingPayload = {
  tytul: string;
  opis: string;
  cena: number;
  marka_id: number;
  model_id: number;
  rok_produkcji?: number | null;
  vin: string;
  numer_rejestracyjny: string;
  data_pierwszej_rej: string; // YYYY-MM-DD
  przebieg: number;
  moc_silnika?: number | null;
  naped?: string | null;
  liczba_drzwi?: number | null;
  liczba_miejsc?: number | null;
  kolor?: string | null;
  metalik?: boolean | null;
  stan?: string | null;
  wypadkowy?: boolean | null;
  zarejestrowany_w_polsce?: boolean | null;
  pierwszy_wlasciciel?: boolean | null;
  serwisowany_w_aso?: boolean | null;
  bezwypadkowy?: boolean | null;
  rodzaj_paliwa: string;
  skrzynia_biegow: string;
  pojemnosc_silnika?: number | null;
  status: string;
};

export async function createListing(payload: CreateListingPayload): Promise<any> {
  const response = await apiRequest<any>(`/ogloszenia`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return response.data;
}

export async function uploadListingPhotos(listingId: number | string, files: File[]): Promise<any> {
  if (!listingId) throw new Error('Brak ID ogłoszenia');
  if (!Array.isArray(files) || files.length === 0) return [];

  const url = `${API_BASE_URL}/ogloszenia/${listingId}/zdjecia`;
  const form = new FormData();
  for (const f of files) {
    // Użyj klucza 'photos[]' aby PHP/Laravel poprawnie sparsował tablicę plików do $request->file('photos')
    form.append('photos[]', f);
  }

  const token = localStorage.getItem('autotablica_token');
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: form,
    credentials: 'include',
  });

  const json = await res.json().catch(() => null);
  if (!res.ok) {
    // Zbuduj czytelny komunikat walidacyjny, jeśli dostępny
    let details = '';
    const errors = (json && (json.errors || json.error)) as any;
    if (errors) {
      const flat = Object.values(errors).flat().filter(Boolean) as string[];
      if (flat.length) {
        details = ': ' + flat.join(' ');
      }
    }
    const msg = (json?.message ? `${json.message}${details}` : `Upload zdjęć nie powiódł się (${res.status})${details}`).trim();
    throw new Error(msg);
  }
  return json?.data ?? json ?? [];
}

// Słowniki
export interface MarkaDto { id: number; nazwa: string }
export interface ModelDto { id: number; marka_id: number; nazwa: string }

function normalizeDictionaryResponse<T>(payload: any): T[] {
  const data = (payload?.data ?? payload);
  return Array.isArray(data) ? data : [];
}

export async function fetchBrands(): Promise<MarkaDto[]> {
  const res = await apiRequest<MarkaDto[]>(`/slowniki/marki`);
  return normalizeDictionaryResponse<MarkaDto>(res.data);
}

export async function fetchModels(markaId?: number | string): Promise<ModelDto[]> {
  const qs = markaId ? `?marka_id=${markaId}` : '';
  const res = await apiRequest<ModelDto[]>(`/slowniki/modele${qs}`);
  return normalizeDictionaryResponse<ModelDto>(res.data);
}
