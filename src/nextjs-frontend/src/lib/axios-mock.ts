import axios from 'axios';
import { BACKEND_API_URL } from '@/constant/api'
import { parseCookies } from 'nookies'

export const apiMock = axios.create({
    baseURL: BACKEND_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false,
});

apiMock.defaults.withCredentials = false;

apiMock.interceptors.request.use(function (config) {
    const cookies = parseCookies()
    const token = cookies.access
    if (config.headers && token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiMock;