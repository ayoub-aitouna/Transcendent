
export interface Player {
	id: number;
	username: string;
	image_url: string;
	level: number;
}

export interface TournamentType {
	icon: string;
	name: string;
	max_players: number;
	description: string;
	
}
