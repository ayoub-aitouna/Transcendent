import Empty from '@/app/ui/dashboard/component/Empty'
import React from 'react'
import apiMock from '@/lib/axios-mock';
import { FriendRequest } from '@/type/auth/user';
import { PendingContainer, RecommendedContainer } from '@/app/ui/dashboard/home/content_area/friends-containers';
import SearchBar from '@/app/ui/dashboard/home/content_area/SearchBar';


export const GetRecommendedAndPendingUsers = async (q: string | null) => {
	let pendingRes = null;
	let recommendedRes = null;
	if (!q || q === '') {
		pendingRes = await apiMock.get("/users/appending-requests/");
		recommendedRes = await apiMock.get("/users/recommended-users/");
	}
	else
		recommendedRes = await apiMock.get(`/users/search-user/?none_friend_only=true&search_query=${q}`)

	console.group(pendingRes?.data)
	return [pendingRes?.data.results as FriendRequest[] || [], recommendedRes?.data.results as FriendRequest[] || []];
};

const Page = async ({
	searchParams,
}: {
	searchParams?: {
		q?: string;
	};
}) => {
	const q = searchParams?.q || null;
	const [pendingResults, recommendedResults] = await GetRecommendedAndPendingUsers(q);
	return (
		<div className='flex items-center justify-center w-full'>
			<div className='p-10 w-[894px] h-[890px]'>
				<SearchBar />
				{recommendedResults.length === 0 ? (
					<div className="flex h-[320px] w-full justify-center items-center">
						<Empty text="No online players are available right now" />
					</div>
				) : (
					<>
						{pendingResults.length > 0 && (
							<>
								<div className='font-bold text-[18px]'>Pending Invitations</div>
								{pendingResults.map((friend, index) => (
									<PendingContainer
										key={index}
										name={friend.username}
										href={friend.image_url}
										number={0}
										accept_fiend_request={friend.accept_fiend_request}
										decline_fiend_request={friend.decline_fiend_request}
										id={friend.id}
										q={q} />
								))}
							</>
						)}
						{recommendedResults.length > 0 && (
							<>
								<div className='font-bold text-[18px] pt-4'>Recommended Users</div>
								{recommendedResults.map((friend, index) => (
									<RecommendedContainer
										key={index}
										name={friend.username}
										href={friend.image_url}
										number={0}
										id={friend.id}
										q={q} />
								))}
							</>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default Page;



