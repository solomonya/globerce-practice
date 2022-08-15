export default interface IFavoriteContext {
  favoriteList: string[];
  toggleFavorite(id: string): void;
  isFavorite(id: string): boolean;
}
