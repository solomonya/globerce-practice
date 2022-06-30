export enum ITEMS {
  HISTORY = 'history',
  SEARCH = 'search',
  HOT = 'hot',
}

export type TItem = {
  id: number;
  title: string;
  subtitle?: string;
  url: string;
};

export type HistoryItem = {
  type: ITEMS.HISTORY;
  items: Array<TItem>;
};
