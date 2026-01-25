'use client';

import React, { createContext, useContext, ReactNode } from 'react';
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

export function TranslationProvider({ children }: { children: ReactNode }) {
  const t = (key: string): string => {
    const value = getNestedValue(de as Record<string, unknown>, key);
    if (typeof value === 'string') {
      return value;
    }
    console.warn(`Translation key "${key}" not found or is not a string`);
    return key;
  };

  const tObject = <T = unknown>(key: string): T => {
    const value = getNestedValue(de as Record<string, unknown>, key);
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
