'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  fetchTranslationsFromLokalise,
  getCachedTranslations,
  cacheTranslations,
} from '@/utils/lokalise';
import de from '@/locales/de.json';

type TranslationValue = string | Record<string, unknown> | unknown[];

interface TranslationContextType {
  t: (key: string) => string;
  tObject: <T = unknown>(key: string) => T;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

function getNestedValue(obj: Record<string, unknown>, path: string): TranslationValue | undefined {
  const keys = path.split('.');
  let current: unknown = obj;

  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return undefined;
    }
    current = (current as Record<string, unknown>)[key];
  }

  return current as TranslationValue;
}

function deepMerge(base: Record<string, unknown>, overlay: Record<string, unknown>): Record<string, unknown> {
  const result = { ...base };
  for (const key of Object.keys(overlay)) {
    if (
      overlay[key] &&
      typeof overlay[key] === 'object' &&
      !Array.isArray(overlay[key]) &&
      base[key] &&
      typeof base[key] === 'object' &&
      !Array.isArray(base[key])
    ) {
      result[key] = deepMerge(
        base[key] as Record<string, unknown>,
        overlay[key] as Record<string, unknown>
      );
    } else {
      result[key] = overlay[key];
    }
  }
  return result;
}

const localDe = de as Record<string, unknown>;

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [translations, setTranslations] = useState<Record<string, unknown>>(localDe);

  useEffect(() => {
    const load = async () => {
      // Try cache first
      const cached = getCachedTranslations('de');
      if (cached) {
        setTranslations(deepMerge(localDe, cached));
        return;
      }

      // Fetch from Lokalise
      const fresh = await fetchTranslationsFromLokalise('de');
      if (fresh) {
        const merged = deepMerge(localDe, fresh as Record<string, unknown>);
        setTranslations(merged);
        cacheTranslations('de', fresh as Record<string, unknown>);
      }
      // If fetch fails, we already have the local de.json as initial state
    };

    load();
  }, []);

  const t = (key: string): string => {
    const value = getNestedValue(translations, key);
    if (typeof value === 'string') {
      return value;
    }
    console.warn(`Translation key "${key}" not found or is not a string`);
    return key;
  };

  const tObject = <T = unknown>(key: string): T => {
    const value = getNestedValue(translations, key);
    return value as T;
  };

  return (
    <TranslationContext.Provider value={{ t, tObject }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslations() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslations must be used within a TranslationProvider');
  }
  return context;
}
