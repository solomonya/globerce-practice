const BASE_URL = 'http://localhost:3003';

export const CATEGORIES_URL = `${BASE_URL}/categories/`;

export const getProductsUrl = (amount: number) =>
  `${BASE_URL}/products/?amount=${amount}`;

export const getBannersUrl = (type: string) => `${BASE_URL}/banners/?q=${type}`;

export const BRANDS_URL = `${BASE_URL}/brands/`;

export const getSearchUrl = (queryString: string) =>
  `${BASE_URL}/search-suggest/?q=${queryString}`;

export const FAVORITE_LIST_URL = `${BASE_URL}/favourite-list`;
