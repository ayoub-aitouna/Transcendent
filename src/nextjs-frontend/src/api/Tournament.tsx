import { apiMock } from "@/lib/axios-mock";
import { PaginationApiResponse } from "@/type";
import { Tournament } from "@/type/dashboard/tournament";

export const GetTournaments = async (): Promise<
	Partial<PaginationApiResponse<Tournament>>
> => {
	const Response = await apiMock.get(`/game/Tournament`);
	const data: Partial<PaginationApiResponse<Tournament>> = Response.data;
	return data;
};

export const GetTournamentDetails = async (
	id: number
): Promise<Tournament> => {
	const Response = await apiMock.get(`/game/Tournament/detail/${id}`);
	const data: Tournament = Response.data;
	return data;
};
