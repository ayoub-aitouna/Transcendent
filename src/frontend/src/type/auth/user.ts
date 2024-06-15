
export enum FriendRequestState {
    NONE = 'NONE',
    SENT = 'SENT',
    RECEIVED = 'RECEIVED'
}

export type user = {
    id: number;
    fullname: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string,
    image_url: string;
    is_friend: boolean;
    is_blocked: boolean;
    is_my_profile: boolean;
    friend_request_state: FriendRequestState;
    registration_method: string;
    coins: number;
    status: string;
    rank: Rank;
    current_xp: number;
    rankProgressPercentage: number;
    achievements: any[];
    ranking_logs: any[];
    send_request: string;
    enabled_2fa: boolean;
    level: number;
}

export type tournament = {
	name :string,
	description :string,
	startDate :string,
	maxPlayers:number,
	isPublic:boolean,
	isMonetized:boolean,
}

export interface uploadProfile extends user {
    image_file: File;
}

export interface uploadTournamentProfile extends tournament {
    image_file: File;
}

export type ChangePasswordForm = {
    old_password: string;
    new_password: string;
}

export type FriendRequest = {
	id: number;
    username: string;
    fullname: string;
    image_url: string;
    url: string;
    manage_friend_request: string;
}

export type RankLogs = {
	id: number;
    point: number;
    achieved_at: string;
}

export type Friend = {
    image_url: string;
    fullname: string;
    username: string;
    url: string;
    unfriend: string;
    block: string;
    message: string;
    level: number;
    id: number;
}

export type Rank = {
    id: number;
    icon: string;
    name: string;
    hierarchy_order: number;
    xp_required: number;
    created_at: Date;
    updated_at: Date;
}

export type InviteMessage = {
    game_room_id: string;
    message: string
}

export enum useManageFRAction {
    Remove,
    Add,
    Accept,
}