import apiMock from "@/lib/axios-mock";
import { PaginationApiResponse } from "@/type";
import { ChangePasswordForm, uploadProfile, user, InviteMessage ,RankLogs} from "@/type/auth/user";
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


export const UserDetailByUsername = async (username: string): Promise<user> => {
    const Response = await apiMock.get(`/users/${username}/`);
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


export const InvitePlayer = async (id: number): Promise<InviteMessage> => {
    const res = await apiMock.get(`/users/invite-player/${id}`)
    const data: InviteMessage = res.data
    return data;
}

export const SendFriendRequest = async (id: number): Promise<void> => {
    await apiMock.post(`/users/send-friend-request/${id}/`)
}

export const RemoveFriendRequest = async (id: number): Promise<void> => {
    await apiMock.delete(`/users/remove-friend-request/${id}/`)
}

export const DeclineFriendRequest = async (id: number): Promise<void> => {
    await apiMock.delete(`/users/decline-friend-request/${id}/`)
}

export const AcceptFriendRequest = async (id: number): Promise<void> => {
    await apiMock.post(`/users/accept-friend-request/${id}/`)
}

export const getRankLogs = async() : Promise<RankLogs[]> =>{
	const res = await apiMock.get('/users/rank-logs/');
	return res.data as RankLogs[]
}
export const removeTournament = async(id:number) =>{
	await apiMock.delete(`/game/Tournament/detail/${id}/`);
}

export const removeNotification = async(id:number) =>{
	await apiMock.delete(`/notifications/${id}/`);
}

export const seenNotification = async(id:number) =>{
	await apiMock.put(`/notifications/${id}/`);
}