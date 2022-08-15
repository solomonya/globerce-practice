import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  FC,
  PropsWithChildren,
  useContext,
} from 'react';
import IFavoriteContext from '../@types/favorite';
import {
  getFavoriteList,
  toggleFavoriteList,
} from '../controllers/apiController';

const FavoriteContext = createContext<IFavoriteContext | null>(null);

const FavoriteProvider: FC<PropsWithChildren<{ children: ReactNode }>> = ({
  children,
}) => {
  const [favoriteList, setFavoriteList] = useState<string[]>([]);

  useEffect(() => {
    getFavoriteList().then((favoriteList) => setFavoriteList(favoriteList));
  }, [favoriteList.length]);

  const add = (id: string) => {
    setFavoriteList([...favoriteList, id]);
  };

  const remove = (id: string) => {
    const copy = [...favoriteList];
    const index = copy.indexOf(id);
    copy.splice(index, 1);
    setFavoriteList(copy);
  };

  const isFavorite = (id: string): boolean => {
    console.log(favoriteList);
    return favoriteList.includes(id);
  };

  const toggleFavorite = (id: string): void => {
    isFavorite(id) ? remove(id) : add(id);
    toggleFavoriteList(id);
  };

  const favoriteContex: IFavoriteContext = {
    favoriteList,
    toggleFavorite,
    isFavorite,
  };

  return (
    <FavoriteContext.Provider value={favoriteContex}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavoriteContext = () => useContext(FavoriteContext);

export default FavoriteProvider;
