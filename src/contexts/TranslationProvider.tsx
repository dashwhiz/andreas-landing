'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchTranslationsFromLokalise, getCachedTranslations, cacheTranslations } from '@/utils/lokalise';
import de from '@/locales/de.json';

interface TranslationContextType {
  t: (key: string) => string;
  tObject: <T = unknown>(key: string) => T;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const localDe = de as Record<string, unknown>;

/** Walk a dot-separated path to get a nested value */
function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  let current: unknown = obj;
  for (const key of path.split('.')) {
    if (current === null || current === undefined || typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return current;
}

/**
 * Deep-merge overlay on top of base.
 * - Both objects → recurse
 * - Same type → overlay wins (Lokalise can override strings)
 * - Type mismatch → base wins (local structure changed, stale cache can't break it)
 */
function deepMerge(base: Record<string, unknown>, overlay: Record<string, unknown>): Record<string, unknown> {
  const result = { ...base };
  for (const key of Object.keys(overlay)) {
    const b = base[key];
    const o = overlay[key];

    if (
      o && typeof o === 'object' && !Array.isArray(o) &&
      b && typeof b === 'object' && !Array.isArray(b)
    ) {
      result[key] = deepMerge(b as Record<string, unknown>, o as Record<string, unknown>);
    } else if (b !== undefined && typeof b !== typeof o) {
      // Type mismatch — keep base (local de.json structure wins)
    } else {
      result[key] = o;
    }
  }
  return result;
}

export function TranslationProvider({ children }: { children: ReactNode }) {
  // Always start with local de.json to match server render (no hydration mismatch)
  const [translations, setTranslations] = useState<Record<string, unknown>>(localDe);

  useEffect(() => {
    const cached = getCachedTranslations();
    if (cached) {
      setTranslations(deepMerge(localDe, cached));
      return;
    }
    // No valid cache — fetch from Lokalise in background
    fetchTranslationsFromLokalise().then((fresh) => {
      if (fresh) {
        setTranslations(deepMerge(localDe, fresh));
        cacheTranslations(fresh);
      }
    });
  }, []);

  const t = (key: string): string => {
    const value = getNestedValue(translations, key);
    if (typeof value === 'string') return value;
    console.warn(`Translation key "${key}" not found or is not a string`);
    return key;
  };

  const tObject = <T = unknown>(key: string): T => {
    return getNestedValue(translations, key) as T;
  };

  return (
    <TranslationContext.Provider value={{ t, tObject }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslations() {
  const context = useContext(TranslationContext);
  if (!context) throw new Error('useTranslations must be used within a TranslationProvider');
  return context;
}
