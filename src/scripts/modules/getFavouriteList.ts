import axios from 'axios';

export default async function getFavouriteList(): Promise<number[]> {
  const favouriteBtnResponse = await axios.get(
    `http://localhost:3003/favourite-list/`
  );
  const favouritesProducts = favouriteBtnResponse.data as Array<number>;
  return favouritesProducts;
}
