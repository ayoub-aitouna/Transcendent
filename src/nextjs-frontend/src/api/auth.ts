

import { apiMock } from '@/lib/axios-mock';
import { AuthApiResponse } from '@/type/auth/auth';
import { setCookie, destroyCookie } from 'nookies'


export const RegisterEmail = async (credentials: { email: string }): Promise<Partial<AuthApiResponse>> => {
    const Response = await apiMock.post(`/auth/register-email/`, credentials);
    const data: Partial<AuthApiResponse> = Response.data;
    if (Response.status != 200)
        throw new Error(data.details || "Failed To Register Email");
    return data;
}

export const VerifyEmail = async (credentials: { email: string, code: string }): Promise<Partial<AuthApiResponse>> => {
    const Response = await apiMock.post(`/auth/verify-email/`, credentials);
    const data: Partial<AuthApiResponse> = Response.data;
    if (Response.status != 200)
        throw new Error(data.details || "Failed To Verify Email");
    return data;
}

export const RegisterUser = async (credentials: { email: string, password: string, image_url: string, username: string, first_name: string, last_name: string, }): Promise<Partial<AuthApiResponse>> => {
    const Response = await apiMock.post(`/auth/register-user/`, credentials);
    const data: Partial<AuthApiResponse> = Response.data;
    if (Response.status != 201)
        throw new Error(data.details || "Failed To Register User");
    return data;
}

export const LoginUser = async (credentials: { email: string, password: string }): Promise<Partial<AuthApiResponse>> => {
    const Response = await apiMock.post(`/auth/token/`, credentials);
    const data: Partial<AuthApiResponse> = Response.data;
    if (Response.status != 200)
        throw new Error(data.details || "Failed To Login User");
    setCookies(data);
    return data;
}

export const HandleSocialAuth = async ({ provider, params }: { provider: string, params: string }): Promise<Partial<AuthApiResponse>> => {
    const Response = await apiMock.get(`/auth/${provider}${params}`);
    const data: Partial<AuthApiResponse> = Response.data;
    if (Response.status != 200)
        throw new Error(data.details || "Failed To Handle Social Auth");
    setCookies(data);
    return data;
}

export const GetMe = async (): Promise<Partial<AuthApiResponse>> => {
    const Response = await apiMock.get(`/auth/me/`);
    const data: Partial<AuthApiResponse> = Response.data;
    if (Response.status != 200)
        throw new Error(data.details || "Failed To Get Me");
    return data;
}

const setCookies = (data: Partial<AuthApiResponse>) => {
    setCookie(null, 'access', data.access_token  as string, { maxAge: 30 * 24 * 60 * 60, path: '/' })
    setCookie(null, 'refresh', data.refresh_token as string, { maxAge: 30 * 24 * 60 * 60, path: '/' })
}

export const clearCookies = () => {
    destroyCookie(null, 'access')
    destroyCookie(null, 'refresh')
}