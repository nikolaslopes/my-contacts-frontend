import HttpClient from './utils/HttpClient';

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listCategories() {
    return this.httpClient.get('/categosries');
  }
}

export default new CategoriesService();
