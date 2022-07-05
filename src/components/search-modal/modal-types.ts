export enum ITEMS {
  HISTORY = 'history',
  SEARCH = 'search',
  HOT = 'hot',
}

export type TItem = {
  title: string;
  url: string;
};

export type TItemHistory = TItem & {
  id: number;
};

export type TItemSearch = TItem & {
  subtitle: string;
};

export type TItemHot = TItem & {
  brand: string;
};

export type SearchItem =
  | SearchItemGen<ITEMS.HISTORY, TItemHistory>
  | SearchItemGen<ITEMS.SEARCH, TItemSearch>
  | SearchItemGen<ITEMS.HOT, TItemHot>;

export type SearchItemGen<Type = keyof typeof ITEMS, ArrayItemType = any> = {
  type: Type;
  items: Array<ArrayItemType>;
};
