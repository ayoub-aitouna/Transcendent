const isServer = typeof window === 'undefined';

const Host = isServer ? 'http://10.32.118.90:8000' : 'http://localhost:8000';
export const BACKEND_API_URL = `${Host}/api/v1`
