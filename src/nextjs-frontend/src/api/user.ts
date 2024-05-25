import apiMock from "@/lib/axios-mock";
import { PaginationApiResponse } from "@/type";
import { ChangePasswordForm, uploadProfile, user } from "@/type/auth/user";
import { MatchUp, RegisteredPlayer } from "@/type/dashboard/tournament";

export async function getRanking(): Promise<PaginationApiResponse<user>> {
    const Response = await apiMock.get(`/users/ranking`);
    const data: PaginationApiResponse<user> = Response.data;
    return data;
}

export const ProfileData = async (): Promise<user> => {
    const Response = await apiMock.get(`/users/me/`);
    const data: user = Response.data;
    return data;
}

export const UserDetail = async (id: number): Promise<user> => {
    const Response = await apiMock.get(`/users/${id}/`);
    const data: user = Response.data;
    return data;
}

export const MatchHistory = async (id: number): Promise<PaginationApiResponse<MatchUp>> => {
    try {
        const res = await apiMock.get(`/game/match-history/${id}/`)
        const data: PaginationApiResponse<MatchUp> = res.data
        return data;
    } catch (error) {
        return {} as PaginationApiResponse<MatchUp>
    }
}

export const TournamentHistory = async (id: number): Promise<PaginationApiResponse<RegisteredPlayer>> => {
    try {
        const res = await apiMock.get(`/game/tournament-history/${id}/`)
        const data: PaginationApiResponse<RegisteredPlayer> = res.data
        return data;
    } catch (error) {
        return {} as PaginationApiResponse<RegisteredPlayer>
    }
}


export const updateProfile = async (data: Partial<uploadProfile>): Promise<user> => {
    const formData = new FormData();
    if (data.image_file) {
        formData.append("image_file", data.image_file);
    }

    for (const key in data) {
        const value = Object(data)[key];
        if (value)
            formData.append(key, value);

    }
    const Response = await apiMock.put(`/users/me/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    const res: user = Response.data;
    return res;
}

export const UpdatePassword = async (data: ChangePasswordForm): Promise<void> => {
    await apiMock.put(`/users/change-password/`, data);
}