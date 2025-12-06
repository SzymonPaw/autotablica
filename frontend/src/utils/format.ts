export function formatNumber(value: number, opts?: Intl.NumberFormatOptions) {
  if (value === null || value === undefined || isNaN(value as any)) return '';
  const options: Intl.NumberFormatOptions = { ...opts };
  return new Intl.NumberFormat('pl-PL', options).format(value);
}

export function formatMileage(km?: number | null) {
  if (km === null || km === undefined) return '—';
  return `${formatNumber(km)} km`;
}

export function formatPrice(pln?: number | null) {
  if (pln === null || pln === undefined) return '—';
  return `${formatNumber(pln)} PLN`;
}

export function formatPowerKMkW(km?: number | null) {
  if (km === null || km === undefined) return '—';
  const kw = Math.round(km * 0.7355);
  return `${formatNumber(km)} KM (${formatNumber(kw)} kW)`;
}

function formatLiters(value: number) {
  // Pokaż z maks. 1 miejscem po przecinku, bez zbędnych zer
  const hasFraction = Math.abs(value % 1) > 1e-6;
  return value.toLocaleString('pl-PL', {
    minimumFractionDigits: hasFraction ? 1 : 0,
    maximumFractionDigits: 1,
  });
}

export function formatEngineCapacity(liters?: number | null) {
  if (liters === null || liters === undefined || isNaN(liters)) return '—';
  const cm3 = Math.round(liters * 1000);
  return `${formatLiters(liters)} l (${formatNumber(cm3)} cm³)`;
}

export function formatDatePL(dateStr?: string | null) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr; // fallback
  return d.toLocaleDateString('pl-PL');
}

export function formatBoolean(value?: boolean | null) {
  if (value === null || value === undefined) return '—';
  return value ? 'Tak' : 'Nie';
}

export function capitalizeFirst(s?: string | null) {
  if (!s) return '—';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function mapFuel(s?: string | null) {
  if (!s) return '—';
  const key = s.toLowerCase();
  const map: Record<string, string> = {
    benzyna: 'Benzyna',
    diesel: 'Diesel',
    lpg: 'LPG',
    elektryczny: 'Elektryczny',
    hybryda: 'Hybryda',
  };
  return map[key] ?? capitalizeFirst(s);
}

export function mapDrive(s?: string | null) {
  if (!s) return '—';
  const key = s.toLowerCase();
  const map: Record<string, string> = {
    przedni: 'Przedni',
    tylny: 'Tylny',
    '4x4': '4x4',
    awd: 'AWD',
  };
  return map[key] ?? capitalizeFirst(s);
}

export function mapGearbox(s?: string | null) {
  if (!s) return '—';
  const key = s.toLowerCase();
  const map: Record<string, string> = {
    manualna: 'Manualna',
    automatyczna: 'Automatyczna',
    polautomatyczna: 'Półautomatyczna',
    'e-cvt': 'E-CVT',
  };
  return map[key] ?? capitalizeFirst(s);
}
