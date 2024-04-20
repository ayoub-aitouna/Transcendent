import axios from 'axios';
import { BACKEND_API_URL, jwt_access, jwt_refresh } from '@/constant/api'
// import Cookies from 'universal-cookie';
// const cookies = new Cookies(null, { path: '/' });

export const apiMock = axios.create({
    baseURL: BACKEND_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false,
});

apiMock.defaults.withCredentials = false;

apiMock.interceptors.request.use(function (config) {
    // const token = cookies.get(jwt_cockies_name);
    const token = null;
    if (config.headers) {
        config.headers.Authorization = token ? `Bearer ${token}` : '';
    }
    return config;
});

export default apiMock;