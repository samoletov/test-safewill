import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

export async function getItem(slug) {
  return await axios.get(`/item/${slug}`);
}

export async function getSuggestions(slug) {
  return await axios.get(`/item/${slug}/suggested`);
}

export async function getList() {
  return await axios.get('/list');
}

export async function getSearch(filter) {
  return await axios.get('/search', { params: { searchTerm: filter } });
}
