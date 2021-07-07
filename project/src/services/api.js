import { create } from 'axios';

export default function createApi() {
  const api = create({
    baseURL: 'https://7.react.pages.academy/six-cities',
    timeout: 5000,
  });
}

