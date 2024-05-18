export type PaginationApiResponse<T> = {
	count: number;
	next: string;
	previous: string;
	results: Array<T>;
};
