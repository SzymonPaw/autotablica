export function cleanTitle(title?: string | null): string {
  if (!title) return '';
  // Usuń słowo "sprzedam" (niezależnie od wielkości liter) oraz ewentualne znaki interpunkcyjne/spacje wokół
  // 1) na początku tytułu
  let t = title.replace(/^\s*sprzedam[\s,.:;\-–—]*?/i, '');
  // 2) w dalszej części (jako osobne słowo)
  t = t.replace(/\bsprzedam\b[\s,.:;\-–—]*/gi, '');
  // Porządkuj wielokrotne spacje/znaki i przytnij
  t = t.replace(/[\s,.;:–—-]{2,}/g, ' ');
  t = t.replace(/\s{2,}/g, ' ');
  return t.trim();
}

export function titleFromBrandModel(
  marka?: { nazwa?: string | null } | null,
  model?: { nazwa?: string | null } | null,
  fallback?: string | null
): string {
  const parts = [marka?.nazwa, model?.nazwa].filter(Boolean) as string[];
  if (parts.length > 0) return parts.join(' ');
  return cleanTitle(fallback ?? '');
}
