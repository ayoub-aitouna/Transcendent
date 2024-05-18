import { user } from "@/type/auth/user";

export type Tournament = {
	id: number;
	icon?: string;
	name: string;
	description: string;
	start_date: Date;
	max_players: number;
	is_public: boolean;
	is_monetized: boolean;
	registered_users: Array<user>;
	tournament_bracket: Array<Brackets>;
	streams: Array<streams>;
	created_at: Date;
	updated_at: Date;
	url?: string;
	register?: string;
};

export type streams = {
	stream_url: string;
	player1: user;
	player2: user;
};

export type Brackets = {
	round_number: number;
	player: Partial<user>;
};
