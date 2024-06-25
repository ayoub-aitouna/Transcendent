
import Image from 'next/image';
import Link from 'next/link';
import RightArrow from '@/app/ui/dashboard/icons/content_area/RightArrow';
import Empty from '@/app/ui/dashboard/component/Empty';
import SearchBar from '@/app/ui/dashboard/home/content_area/SearchBar';
import { Key } from 'react';
import { GetFriendsData } from '@/api/user';
import Error from "@/app/ui/dashboard/component/Error";
import { ImageSrc } from '@/lib/ImageSrc';
import { GroupsContainer } from '@/app/ui/dashboard/messenger/Group-container';



const Page = async ({ searchParams }: { searchParams?: { q?: string } }) => {
	const q = searchParams?.q || null;
	let filteredFriends = null;
	try {
		filteredFriends = await await GetFriendsData(q);
	} catch (e) {
		return (
			<Error
				title='Friend not found'
				desc='The Friend you are looking for does not exist.'
			/>
		);
	}

	return (
		<div className="flex items-center justify-center w-full">
			<div className="p-10  w-[894px] h-[890px]">
				<div className="pb-1">
					<SearchBar />
				</div>
				{filteredFriends.length === 0 ? (
					<div className="flex h-[320px] w-full justify-center items-center">
						<Empty text="no Online Players are available right now" />
					</div>
				) : (
					<div className="h-[750px] overflow-y-scroll hide-scrollbar">
						<div className='font-bold text-[18px] pb-2'>Choice at less 2 friends</div>
						{filteredFriends.map((friend: { username: string; image_url: string; level: number; id: number; }, index: Key | null | undefined) => (
							<GroupsContainer
								key={index}
								name={friend.username}
								href={friend.image_url}
								number={friend.level}
								id={friend.id}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Page;
