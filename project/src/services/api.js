import axios from 'axios';

const BASE_URL = 'https://7.react.pages.academy/six-cities';
const TIMEOUT = 5000;

const token = localStorage.getItem('token') ?? '';

export default function createApi() {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    headers: {
      'X-Token': token,
    },
  });

  return api;
}
