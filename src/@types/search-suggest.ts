export type TSearchItem = {
  type: 'history' | 'search' | 'hot';
  title: string;
  url: string;
  subtitle?: string;
  brand?: string;
};

type TSearchSuggest = {
  type: 'history' | 'search' | 'hot';
  items: TSearchItem[];
};

export default TSearchSuggest;
