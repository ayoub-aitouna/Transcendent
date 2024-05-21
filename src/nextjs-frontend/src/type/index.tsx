export type PaginationApiResponse<T> = {
	count: number;
	next: string;
	previous: string;
	results: Array<T>;
};

export type inputProps = {
	type: string;
	placeholder: string;
	title: string;
	name: string;
	error: boolean;
	helperText?: string | null;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	register: any;
	additionalStyles?: string;
	props?: any;
};