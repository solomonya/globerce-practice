import { FC, useState } from 'react';
import { useFavoriteContext } from '../../utils/FavoriteContext';

const FavoriteBtn: FC<{ id: string }> = ({ id }) => {
  const context = useFavoriteContext();

  const [isFavorite, setIsFavorite] = useState<boolean>(
    context?.isFavorite(id) as boolean
  );

  const handleFavorite = (): void => {
    context?.toggleFavorite(id);
    setIsFavorite(context?.isFavorite(id) as boolean);
  };

  return (
    <button onClick={handleFavorite}>
      <span>{isFavorite.toString()}</span>
    </button>
  );
};

export default FavoriteBtn;
