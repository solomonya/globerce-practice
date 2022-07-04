export enum ITEMS {
  HISTORY = 'history',
  SEARCH = 'search',
  HOT = 'hot',
}

export type TItem = {
  id: number;
  title: string;
  subtitle?: string;
  brand?: string;
  url: string;
};

export type SearchItems = {
  type: ITEMS;
  items: Array<TItem>;
};
