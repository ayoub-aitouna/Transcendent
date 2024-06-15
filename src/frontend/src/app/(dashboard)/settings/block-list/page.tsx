
import React, { Key, useState } from 'react'
import SearchBar from '@/app/ui/dashboard/home/content_area/SearchBar';
import Empty from '@/app/ui/dashboard/component/Empty';
import apiMock from '@/lib/axios-mock';
import { BlocksContainer } from '@/app/ui/dashboard/home/content_area/friends-containers';
import { FriendRequest } from '@/type/auth/user';
import { PaginationApiResponse } from '@/type';


export const GetData = async (q: string | null) => {
	let response = null;
	if (!q || q === '') {
		response = await apiMock.get(`/users/blocked-list/`);

	} else {
		response = await apiMock.get(`/users/search-user/?none_friend_only=false&search_query=${q}`);
	}
	return response?.data as PaginationApiResponse<FriendRequest>;
};

const page = async ({ searchParams }: { searchParams?: { q?: string } }) => {
	const q = searchParams?.q || null;
	const filteredFriends = await GetData(q);

	return (
		<div className="flex items-center justify-center w-full">
			<div className="p-10  w-[894px] h-[890px]">
				<div className="pb-1">
					<SearchBar />
				</div>
				{filteredFriends.count === 0 ? (
					<div className="flex h-[320px] w-full justify-center items-center">
						<Empty text="no Online Players are available right now" />
					</div>
				) : (
					<div className="h-[750px] overflow-y-scroll hide-scrollbar">
						<div className='font-bold text-[18px] pb-2'>Blocks list</div>
						{filteredFriends.results.map((friend: FriendRequest, index) => (
							<BlocksContainer
								key={index}
								user={friend}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default page