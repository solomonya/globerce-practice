const BASE_URL = 'http://localhost:3003';

export const CATEGORIES_URL = `${BASE_URL}/categories/`;

export const RECENTLY_WATCH_URL = `${BASE_URL}/recently-watch/`;

export function getBannersUrl(type: string) {
  return `${BASE_URL}/banners/?q=${type}`;
}
