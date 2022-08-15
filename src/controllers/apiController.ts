import { FAVORITE_LIST_URL } from './api-routes';
import axios from 'axios';

export const getFavoriteList = (): Promise<string[]> => {
  return axios
    .get<string[]>(`${FAVORITE_LIST_URL}`)
    .then((response) => response.data);
};

export const toggleFavoriteList = (id: string): Promise<string[]> => {
  return axios.post(`${FAVORITE_LIST_URL}/processing/${id}`);
};
