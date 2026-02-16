export function formatThousands(value: number): string {
  if (!isFinite(value)) return '—';
  return new Intl.NumberFormat('de-DE', {
    maximumFractionDigits: 2,
  }).format(value);
}

export function parseDeNumber(raw: string): number {
  const cleaned = raw.replace(/\./g, '').replace(',', '.');
  return cleaned === '' ? 0 : parseFloat(cleaned);
}
