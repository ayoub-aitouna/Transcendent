

import { apiMock } from '@/lib/axios-mock';
import { ApiResponse } from '@/type/auth/auth';
import { setCookie, parseCookies } from 'nookies'


export const RegisterEmail = async (credentials: { email: string }): Promise<Partial<ApiResponse>> => {
    const Response = await apiMock.post(`/auth/register-email/`, credentials);
    const data: Partial<ApiResponse> = Response.data;
    if (Response.status != 200)
        throw new Error(data.details || "Failed To Register Email");
    return data;
}

export const VerifyEmail = async (credentials: { email: string, code: string }): Promise<Partial<ApiResponse>> => {
    const Response = await apiMock.post(`/auth/verify-email/`, credentials);
    const data: Partial<ApiResponse> = Response.data;
    if (Response.status != 200)
        throw new Error(data.details || "Failed To Verify Email");
    return data;
}

export const RegisterUser = async (credentials: { email: string, password: string, image_url: string, username: string, first_name: string, last_name: string, }): Promise<Partial<ApiResponse>> => {
    const Response = await apiMock.post(`/auth/register-user/`, credentials);
    const data: Partial<ApiResponse> = Response.data;
    if (Response.status != 201)
        throw new Error(data.details || "Failed To Register User");
    return data;
}

export const LoginUser = async (credentials: { email: string, password: string }): Promise<Partial<ApiResponse>> => {
    console.log('login user')

    const Response = await apiMock.post(`/auth/token/`, credentials);
    const data: Partial<ApiResponse> = Response.data;
    if (Response.status != 200)
        throw new Error(data.details || "Failed To Login User");
    setCookie(null, 'access', data.access as string, { maxAge: 30 * 24 * 60 * 60, path: '/' })
    setCookie(null, 'refresh', data.refresh as string, { maxAge: 30 * 24 * 60 * 60, path: '/' })
    return data;
}

export const HandleSocialAuth = async ({ provider, params }: { provider: string, params: string }): Promise<Partial<ApiResponse>> => {
    const Response = await apiMock.get(`/auth/${provider}${params}`);
    const data: Partial<ApiResponse> = Response.data;
    if (Response.status != 200)
        throw new Error(data.details || "Failed To Handle Social Auth");
    return data;
}

export const GetMe = async (): Promise<Partial<ApiResponse>> => {
    const Response = await apiMock.get(`/auth/me/`);
    const data: Partial<ApiResponse> = Response.data;
    if (Response.status != 200)
        throw new Error(data.details || "Failed To Get Me");
    return data;
}