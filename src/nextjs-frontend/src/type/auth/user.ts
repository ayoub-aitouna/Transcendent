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
    registration_method: string;
    coins: number;
    status: string;
    rank: Rank;
    current_xp: number;
    rankProgressPercentage: number;
    friends: Friend[];
    friend_requests: FriendRequest[];
    achievements: any[];
    ranking_logs: any[];
    send_request: string;
	level: number;
}

export interface uploadProfile extends user {
    image_file: File;
}

export type FriendRequest = {
    username: string;
    fullname: string;
    image_url: string;
    url: string;
    accept_fiend_request: string;
    decline_fiend_request: string;
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
