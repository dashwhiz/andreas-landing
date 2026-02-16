import { NextResponse } from 'next/server';

function setNestedValue(obj: Record<string, unknown>, path: string, value: unknown) {
  const keys = path.split('.');
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key] as Record<string, unknown>;
  }

  // Handle array indices: if key is numeric, ensure parent is an array
  const finalKey = keys[keys.length - 1];
  current[finalKey] = value;

  // Convert numeric-keyed objects to arrays where appropriate
  return obj;
}

function convertNumericKeysToArrays(obj: unknown): unknown {
  if (typeof obj !== 'object' || obj === null) return obj;
  if (Array.isArray(obj)) return obj.map(convertNumericKeysToArrays);

  const record = obj as Record<string, unknown>;
  const keys = Object.keys(record);

  // Check if all keys are sequential numeric indices
  const isArrayLike =
    keys.length > 0 &&
    keys.every((k) => /^\d+$/.test(k)) &&
    keys.map(Number).sort((a, b) => a - b).every((n, i) => n === i);

  if (isArrayLike) {
    return keys
      .sort((a, b) => Number(a) - Number(b))
      .map((k) => convertNumericKeysToArrays(record[k]));
  }

  const result: Record<string, unknown> = {};
  for (const key of keys) {
    result[key] = convertNumericKeysToArrays(record[key]);
  }
  return result;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  try {
    const { locale } = await params;

    const supportedLocales = ['de'];
    if (!supportedLocales.includes(locale)) {
      return NextResponse.json(
        { error: `Unsupported locale: ${locale}` },
        { status: 400 }
      );
    }

    const projectId = process.env.NEXT_PUBLIC_LOKALISE_PROJECT_ID;
    const apiKey = process.env.LOKALISE_API_KEY;

    if (!projectId || !apiKey) {
      console.warn('Lokalise not configured - using local fallback');
      return await localFallback(locale);
    }

    try {
      const keysResponse = await fetch(
        `https://api.lokalise.com/api2/projects/${projectId}/keys?include_translations=1&limit=5000&disable_references=1`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Api-Token': apiKey,
          },
        }
      );

      if (keysResponse.ok) {
        const keysData = await keysResponse.json();
        const translations: Record<string, unknown> = {};

        if (keysData.keys && keysData.keys.length > 0) {
          for (const key of keysData.keys) {
            const translation = key.translations?.find(
              (t: { language_iso: string }) => t.language_iso === locale
            );

            if (translation?.translation) {
              let keyPath = key.key_name.web || key.key_name;
              if (typeof keyPath === 'object') {
                keyPath = keyPath.web || keyPath.other || Object.values(keyPath)[0];
              }
              keyPath = (keyPath as string).replace(/::/g, '.');

              // Try to parse JSON values (for arrays/objects stored as JSON strings)
              let value: unknown = translation.translation;
              if (typeof value === 'string' && (value.startsWith('[') || value.startsWith('{'))) {
                try {
                  value = JSON.parse(value);
                } catch { /* keep as string */ }
              }

              setNestedValue(translations, keyPath as string, value);
            }
          }
        }

        if (Object.keys(translations).length > 0) {
          const converted = convertNumericKeysToArrays(translations);
          return NextResponse.json({
            translations: converted,
            source: 'lokalise',
            timestamp: new Date().toISOString(),
            locale,
          });
        }
      }
    } catch (e) {
      console.error('Lokalise API error:', e);
    }

    return await localFallback(locale);
  } catch (error) {
    console.error('Translation API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function localFallback(locale: string) {
  try {
    const mod = await import(`@/locales/${locale}.json`);
    return NextResponse.json({
      translations: mod.default,
      source: 'local-fallback',
      timestamp: new Date().toISOString(),
      locale,
    });
  } catch {
    return NextResponse.json(
      { error: `No translations available for: ${locale}` },
      { status: 500 }
    );
  }
}
