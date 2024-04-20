
import { apiMock } from '@/lib/axios-mock';
import { ApiResponse } from '@/type/auth';

export const RegisterEmail = async (credentials: { email: string }): Promise<Partial<ApiResponse> | null> => {
    const Response = await apiMock.post(`/auth/register-email/`, credentials);
    const data: Partial<ApiResponse> = Response.data;
    if (Response.status != 200)
        throw new Error(data.details || "Failed To Register Email");
    return data;
}

export const VerifyEmail = async (credentials: { email: string, code: string }): Promise<Partial<ApiResponse> | null> => {
    const Response = await apiMock.post(`/auth/verify-email/`, credentials);
    const data: Partial<ApiResponse> = Response.data;
    if (Response.status != 200)
        throw new Error(data.details || "Failed To Verify Email");
    return data;
}


export const RegisterUser = async (credentials: { email: string, password: string, image_url: string, username: string, first_name: string, last_name: string, }): Promise<Partial<ApiResponse> | null> => {
    const Response = await apiMock.post(`/auth/register-user/`, credentials);
    const data: Partial<ApiResponse> = Response.data;
    if (Response.status != 201)
        throw new Error(data.details || "Failed To Register User");

    // cookies.set(jwt_cockies_name, data.AccessToken);
    // cookies.set(Jwt_Refresh_Cockies_Name, data.RefreshToken);
    return data;
}


export const LoginUser = async (credentials: { email: string, password: string }): Promise<Partial<ApiResponse> | null> => {
    const Response = await apiMock.post(`/auth/token/`, credentials);
    const data: Partial<ApiResponse> = Response.data;
    if (Response.status != 200)
        throw new Error(data.details || "Failed To Login User");
    // cookies.set(jwt_cockies_name, data.AccessToken);
    // cookies.set(Jwt_Refresh_Cockies_Name, data.RefreshToken);
    return data;
}