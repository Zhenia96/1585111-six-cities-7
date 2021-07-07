import axios from 'axios';

const BASE_URL = 'https://7.react.pages.academy/six-cities';
const TIMEOUT = 5000;

export default function createApi() {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
  });

  return api;
}

