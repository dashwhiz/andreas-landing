const CACHE_TTL = 3600000; // 1 hour
const CACHE_VERSION = 2; // bump to invalidate all user caches
const CACHE_KEY = `translations_de_v${CACHE_VERSION}`;

export async function fetchTranslationsFromLokalise(): Promise<Record<string, unknown> | null> {
  try {
    const res = await fetch('/api/translations/de');
    if (!res.ok) return null;
    const data = await res.json();
    return data.translations || null;
  } catch {
    return null;
  }
}

export function getCachedTranslations(): Record<string, unknown> | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { translations, timestamp } = JSON.parse(raw);
    if (Date.now() - timestamp > CACHE_TTL) return null;
    return translations;
  } catch {
    return null;
  }
}

export function cacheTranslations(translations: Record<string, unknown>) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ translations, timestamp: Date.now() }));
  } catch { /* localStorage full or unavailable */ }
}
