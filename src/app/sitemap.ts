import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.financial-lifestyle.de';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, lastModified: new Date(), priority: 1.0 },
    { url: `${BASE_URL}/rendite`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/gmp`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/vermoegen`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/ki`, lastModified: new Date(), priority: 0.7 },
    { url: `${BASE_URL}/impressum`, lastModified: new Date(), priority: 0.3 },
    { url: `${BASE_URL}/datenschutz`, lastModified: new Date(), priority: 0.3 },
  ];
}
