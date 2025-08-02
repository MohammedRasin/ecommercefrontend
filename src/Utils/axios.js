import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8001/api/',
  timeout: 10000,
  headers: { Authorization: `bearer ${localStorage.getItem('TOKEN')}` },
});

export default instance;
