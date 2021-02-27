import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

export async function getItem(slug) {
  return await axios.get(`/item/${slug}`);
}

export async function getList() {
  return await axios.get('/list');
}
