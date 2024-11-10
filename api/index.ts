import axios, {AxiosInstance} from 'axios';

const jsonApi: AxiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

jsonApi.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

jsonApi.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  },
);

export default jsonApi;
