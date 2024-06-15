import { AllOnlinePlayers } from "@/constant/dashboard";
import Empty from "../../component/Empty";
import SearchIcon from "../../icons/messenger/search";
import { FormEvent, useState, useEffect } from "react";

interface User {
	username: string;
	email: string;
}

export function UsersListWrapper({ children }: {
	children: React.ReactNode;
}) { 
	const [query, setQuery] = useState<string>('');
	const [results, setResults] = useState<User[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const fetchData = async () => {
		setIsLoading(true);
		setError(null);
		try {
			let url = `api/v1/users/search-user/`;
			if (query) {
				url += `?query=${query}`;
			}
			const response = await fetch(url);
			const data = await response.json();
			setResults(data.results);
		} catch (err) {
			setError('Failed to fetch data');
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [query]);

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setQuery(e.target.value);
	};

	return (
		<div className='flex items-center justify-center w-full'>
			<div className='p-10 bg-[#292929] w-[894px] h-[890px]'>
				<div className='pb-6'>
					<div className="flex flex-row items-center justify-between  relative">
						<textarea
							className="flex-row items-center justify-between rounded-lg overflow-hidden p-3 bg-[#474747] pl-10 h-[50px] w-full resize-none outline-none"
							placeholder="Type Name of User"
							value={query}
							onChange={handleChange}
						></textarea>
						<div className="absolute pl-3 top-1/2 transform -translate-y-1/2">
							<SearchIcon />
						</div>
					</div>
				</div>
				{isLoading ? (
					<div className="flex h-[320px] w-full justify-center items-center">
						<p>Loading...</p>
					</div>
				) : error ? (
					<div className="flex h-[320px] w-full justify-center items-center">
						<p>{error}</p>
					</div>
				) : !results.length ? (
					<div className="flex h-[320px] w-full justify-center items-center">
						<Empty text="No online players are available right now" />
					</div>
				) : (
					<div className="h-[750px] overflow-y-scroll hide-scrollbar">
						{children}
					</div>
				)}
			</div>
		</div>
	);
}
