import axios from 'axios';
import { ResponseStatus } from '../constant.js';

const BASE_URL = 'https://7.react.pages.academy/six-cities';
const TIMEOUT = 5000;

const token = localStorage.getItem('token') ?? '';

export default function createApi(onUnauthorized, onError) {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    headers: {
      'X-Token': token,
    },
  });

  function onSuccess(response) {
    return response;
  }

  function onFail(err) {
    const { response } = err;
    if (response.status === ResponseStatus.NO_AUTH) {
      onUnauthorized();
    } else {
      onError(response.statusText);
    }
    return err;
  }

  api.interceptors.response.use(onSuccess, onFail);

  return api;
}
