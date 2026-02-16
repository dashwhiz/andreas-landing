const CACHE_MAX_AGE = 3600000; // 1 hour
const CACHE_VERSION = '2.0';

export async function fetchTranslationsFromLokalise(locale = 'de') {
  try {
    const response = await fetch(`/api/translations/${locale}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (data.error) throw new Error(data.error);
    return data.translations || null;
  } catch {
    return null;
  }
}

export function cacheTranslations(locale: string, translations: Record<string, unknown>) {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(
      `translations_${locale}`,
      JSON.stringify({ translations, timestamp: Date.now(), version: CACHE_VERSION })
    );
  } catch { /* ignore */ }
}

export function getCachedTranslations(locale: string): Record<string, unknown> | null {
  try {
    if (typeof window === 'undefined') return null;
    const cached = localStorage.getItem(`translations_${locale}`);
    if (!cached) return null;
    const data = JSON.parse(cached);
    if (data.version !== CACHE_VERSION) {
      localStorage.removeItem(`translations_${locale}`);
      return null;
    }
    if (Date.now() - data.timestamp > CACHE_MAX_AGE) return null;
    return data.translations;
  } catch {
    return null;
  }
}

export function clearTranslationCache() {
  try {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('translations_de');
  } catch { /* ignore */ }
}
