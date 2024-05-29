const isServer = typeof window === 'undefined';

const Host = isServer ? 'http://172.17.0.1:8000' : 'http://localhost:8000';
export const BACKEND_API_URL = `${Host}/api/v1`