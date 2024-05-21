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
	games_states: Array<MatchUp>;
	match_ups: Array<MatchUp>;
	created_at: Date;
	updated_at: Date;
	url?: string;
	register?: string;
};
export type RegisteredPlayer = {
	id: number;
	user: user;
	tournament: Tournament;
	created_at: Date;
	updated_at: Date;
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

export type MatchUp = {
	game: any;
	first_player: user;
	second_player: user;
	tournament: Tournament[] | null;
	Winner: user | null;
	game_over: boolean;
	first_player_score: boolean;
	second_player_score: boolean;
};
