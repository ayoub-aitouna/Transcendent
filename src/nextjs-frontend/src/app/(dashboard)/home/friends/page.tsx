
import Image from 'next/image';
import Link from 'next/link';
import RightArrow from '@/app/ui/dashboard/icons/content_area/RightArrow';
import Empty from '@/app/ui/dashboard/component/Empty';
import SearchBar from '@/app/ui/dashboard/home/content_area/SearchBar';
import { Key } from 'react';
import { GetFriendsData } from '@/api/user';
import Error from "@/app/ui/dashboard/component/Error";



export function FriendContainer({ name, href, number, id }: { name: string; href: string; number: number; id: number }) {
	return (
		<div className="mt-2 w-full h-[69px] flex items-center justify-between rounded bg-[#373737] p-4 mb-3">
			<Link href={`/profile/${id}`} className="flex items-center justify-between">
				<Image className="bg-white w-[53px] h-[53px] rounded-full" src={href} alt="Profile Image" width={53} height={53} />
				<div />
				<div className="flex items-start flex-col max-w-[80px]">
					<div className="ml-[10px] text-white truncate text-[18px] font-bold">{name}</div>
					<div className="ml-[10px] text-[#878787] text-[12px] truncate font-medium">Level {String(number)}</div>
				</div>
			</Link>
			<div className="flex items-center justify-center">
				<Link href="/messenger" className="flex items-center justify-between mx-auto text-white text-[16px] font-medium">
					<RightArrow />
				</Link>
			</div>
		</div>
	);
}



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
						<div className='font-bold text-[18px] pb-2'>All Friends</div>
						{filteredFriends.map((friend: { username: string; image_url: string; level: number; id: number; }, index: Key | null | undefined) => (
							<FriendContainer
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
