interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

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

export function getPaginationInfo(res: any, currentPage: number): { items: Ogloszenie[]; more: boolean } {
  let items: Ogloszenie[] = [];
  let more = false;

  if (Array.isArray(res)) {
    items = res;
    more = items.length > 0;
  } else if (res && typeof res === 'object' && 'data' in res) {
    items = res.data;
    if ('meta' in res && res.meta && typeof res.meta === 'object') {
      const meta = res.meta as PaginationMeta;
      const current = meta.current_page ?? currentPage;
      const last = meta.last_page ?? null;
      more = last ? current < last : items.length > 0;
    } else {
      more = items.length > 0;
    }
  }

  return { items, more };
}