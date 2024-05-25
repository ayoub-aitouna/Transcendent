'use client'

import Image from 'next/image';
import Link from 'next/link';
import RightArrow from '@/app/ui/dashboard/icons/content_area/RightArrow';
import { UsersListWrapper } from '@/app/ui/dashboard/home/content_area/user-list-wrapper';
import Messages from '@/app/ui/dashboard/icons/content_area/messages';
import { useAppSelector } from '@/redux/store';
import { useEffect, useState } from 'react';
import SearchIcon from '@/app/ui/dashboard/icons/messenger/search';
import Empty from '@/app/ui/dashboard/component/Empty';
import apiMock from '@/lib/axios-mock';

export function FriendContainer({ name, href, number, id }: {
	name: string;
	href: string;
	number: number;
	id: number;
}) {
	return (
		<button
			className={`mt-2 w-full h-[69px] flex items-center justify-between rounded bg-[#373737] p-4 mb-3`}
		>
			<Link href={`/profile/${id}`} className='flex items-center justify-between '>
				<Image className="bg-white  w-[53px] h-[53px] rounded-full" src={href} alt="Profile Image" width={53} height={53} />
				<div />
				<div className="flex items-start flex-col max-w-[80px]">
					<div className="ml-[10px]  text-white truncate text-[18px] font-bold">{name}</div>
					<div className={`ml-[10px]  text-[#878787] text-[12px] truncate font-medium`}>Level {String(number)}</div>
				</div>
			</Link>
			<div className={`flex  items-center justify-center `}>
				<Link href={'/messenger'} className=" flex items-center justify-between mx-auto text-white text-[16px] font-medium"> <RightArrow /> </Link>
			</div>
		</button>
	);
}


interface User {
	username: string;
	email: string;
}

const page = () => {
	const { friends } = useAppSelector((state) => state.user.user);
	const [query, setQuery] = useState<string>('');
	const [results, setResults] = useState<User[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const fetchData = async () => {
		setIsLoading(true);
		setError(null);
		try {
			let url = "/users/search-user/?none_friend_only=false";
			const response = await apiMock.get(url);
			setResults(response.data);
		} catch (err) {
			setError("Failed to fetch data");
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

	const filteredFriends = query
		? friends.filter((friend) =>
			friend.username.toLowerCase().includes(query.toLowerCase())
		)
		: friends;


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
				) : (
					<div className="h-[750px] overflow-y-scroll hide-scrollbar">
						{filteredFriends.map((friend, index) => (
							<div key={index}>
								<FriendContainer
									name={friend.username}
									href={friend.image_url}
									number={friend.level}
									id={friend.id}
								/>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default page;