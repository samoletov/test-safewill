import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

export async function getItem(id) {
  return await axios.get(`/item/${id}`);
}

export async function getList() {
  return await axios.get('/list');
}
