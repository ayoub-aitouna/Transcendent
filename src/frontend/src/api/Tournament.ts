import { apiMock } from "@/lib/axios-mock";
import { PaginationApiResponse } from "@/type";
import { Tournament } from "@/type/dashboard/tournament";

export const GetTournaments = async (): Promise<
	Partial<PaginationApiResponse<Tournament>>
> => {
	try {
		const Response = await apiMock.get(`/game/Tournament`);
		const data: Partial<PaginationApiResponse<Tournament>> = Response.data;
		return data;
	} catch (error) {
		return [] as Partial<PaginationApiResponse<Tournament>>;
	}
};

export const GetPrivateTournaments = async (): Promise<
	Partial<PaginationApiResponse<Tournament>>
> => {
	try {
		const Response = await apiMock.get(`/game/private-tournaments/`);
		const data: Partial<PaginationApiResponse<Tournament>> = Response.data;
		return data;
	} catch (error) {
		return [] as Partial<PaginationApiResponse<Tournament>>;
	}
};

export const GetTournamentDetails = async (id: number): Promise<Tournament> => {
	const Response = await apiMock.get(`/game/Tournament/detail/${id}/`);
	const data: Tournament = Response.data;
	return data;
};

export const RegisterTournament = async (id: number): Promise<Tournament> => {
	const Response = await apiMock.post(`/game/Tournament/register/${id}/`);
	const data: Tournament = Response.data;
	return data;
}

export const CreateTournament = async (
	icon_file: File | null,
	tournament: Tournament
): Promise<Tournament> => {
	const formData = new FormData();
	if (icon_file) formData.append("icon_file", icon_file);
	formData.append("name", tournament.name);
	formData.append("description", tournament.description);
	formData.append("max_players", tournament.max_players.toString());
	formData.append("start_date", tournament.start_date.toString());
	const Response = await apiMock.post(`/game/Tournament`, tournament);
	const data: Tournament = Response.data;
	return data;
};

export const GetAnnouncedTournaments = async (): Promise<Tournament[]> => {
	const Response = await apiMock.get('/game/Tournament-announcements/');
	const data: Tournament[] = Response.data.results;
	return data;
};
