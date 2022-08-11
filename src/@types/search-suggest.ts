export type TSearchItem = {
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
