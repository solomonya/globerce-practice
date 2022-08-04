import { BANNERS_URL, CATEGORIES_URL } from './api-routes';
import axios from 'axios';

export default class ApiController {
  public async getBanners() {
    return axios.get(BANNERS_URL);
  }

  public async getCategories() {
    return axios.get(CATEGORIES_URL);
  }
}
