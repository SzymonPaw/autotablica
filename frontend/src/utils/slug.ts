export function toSlug(value: string | number | null | undefined): string {
  if (value === null || value === undefined) {
    return '';
  }

  const normalized = String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  return normalized
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/--+/g, '-');
}

export function slugEquals(
  source: string | number | null | undefined,
  slug: string | number | null | undefined
): boolean {
  const normalizedSource = toSlug(source);
  const normalizedSlug = toSlug(slug);
  if (!normalizedSource || !normalizedSlug) {
    return false;
  }
  return normalizedSource === normalizedSlug;
}
