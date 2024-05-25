import axios from 'axios';
import { BACKEND_API_URL } from '@/constant/api'
import { destroyCookie, parseCookies, setCookie } from 'nookies'

const getAccessTokens = async () => {
    const isServer = typeof window === 'undefined';
    if (isServer) {
        const { cookies } = await import('next/headers');
        let access = cookies().get('access')?.value;
        let refresh = cookies().get('refresh')?.value;
        return { access, refresh }
    }
    const nookies = parseCookies()
    const access = nookies.access
    const refresh = nookies.refresh
    return { access, refresh }
}

const setAccessTokens = async (access: string) => {
    const isServer = typeof window === 'undefined';
    // if (isServer) {
    //     const { cookies } = await import('next/headers');
    //     cookies().set('access', access as string, { maxAge: 30 * 24 * 60 * 60, path: '/' })
    //     return;
    // }
    setCookie(null, 'access', access as string, { maxAge: 30 * 24 * 60 * 60, path: '/' })
    return;
}

export const apiMock = axios.create({
    baseURL: BACKEND_API_URL,
    headers: {	
        'Content-Type': 'application/json',
    },
    withCredentials: false,
});


apiMock.defaults.withCredentials = false;

apiMock.interceptors.request.use(async function (config) {
    const { access } = await getAccessTokens()
    if (config.headers && access) {
        console.log('\n--- request-interceptors ---\n access', access)
        config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
});

apiMock.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;
        const { refresh } = await getAccessTokens()
        if (error.response.status === 403 && !originalRequest._retry) {
            console.log('error.response.status === 403 && !originalRequest._retry')
            originalRequest._retry = true;
            return axios.post(BACKEND_API_URL + '/auth/token/refresh/', {
                refresh: refresh
            }).then(res => {
                console.log('res ', res)
                if (res.status === 200) {
                    originalRequest.headers['Authorization'] = `Bearer ${res.data.access}`;
                    setAccessTokens(res.data.access)
                    return apiMock(originalRequest);
                } else {
                    destroyCookie(null, 'access')
                    destroyCookie(null, 'refresh')
                }
            })
        }
        return Promise.reject(error);
    })

export default apiMock;