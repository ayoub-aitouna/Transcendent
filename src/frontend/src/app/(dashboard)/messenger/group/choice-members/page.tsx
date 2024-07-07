// app/messenger/group/choice-members.tsx
"use client";

import React, { use, useEffect, useState } from 'react';
import Empty from '@/app/ui/dashboard/component/Empty';
import SearchBar from '@/app/ui/dashboard/home/content_area/SearchBar';
import { Key } from 'react';
import { GetFriendsData } from '@/api/user';
import Error from "@/app/ui/dashboard/component/Error";
import GroupsContainer from '@/app/ui/dashboard/messenger/Group-container';
import { useRouter } from 'next/navigation';
import { useUserContext } from '../../context/UserContext';
import { useAppSelector } from '@/redux/store';
import styles from "@/app/ui/dashboard/nav/nav.module.css";;
import { Friend } from '@/type/auth/user';


const ChoiceMembersPage = ({ searchParams }: { searchParams?: { q?: string}}) => {
	const [filteredFriends, setFilteredFriends] = useState<Friend[]>([]);
	const { users, removeUser } = useUserContext();
	const { id } = useAppSelector((state) => state.user.user);
	const router = useRouter();

	const q = searchParams?.q || null;;
	const handleCancel = () => {
		users.forEach((user) => {
			removeUser(user.id);
		})
		router.back();
	}
	useEffect(() => {
		const fetchFriends = async () => {
			try {
				const friends = await GetFriendsData(q);
				setFilteredFriends(friends);
			} catch (e) {
				console.error('Error fetching friends:', e);
			}
		};
		fetchFriends();
	}, [q]);

	if (filteredFriends.length === 0) {
		return (
			<Empty text="you don't have any friends you are so only person hahahahaha" />
		);
	}

	return (
		<div className="flex items-center justify-center w-full">
			<div className="p-10 w-[894px] h-[890px]">
				<div className="pb-1">
					<SearchBar />
				</div>
				{filteredFriends.length === 0 ? (
					<div className="flex h-[320px] w-full justify-center items-center">
						<Empty text="No online players are available right now" />
					</div>
				) : (
					<div className="h-[750px] overflow-y-scroll hide-scrollbar">
						<div className='font-bold text-[18px] pb-2'>
							Choose friends too add to the your group
						</div>
						{filteredFriends.map((friend: { username: string; image_url: string; level: number; id: number; }, index: Key | null | undefined) => (
							<GroupsContainer
								key={index}
								username={friend.username}
								image_url={friend.image_url}
								level={friend.level}
								id={friend.id}
							/>
						))}
						<div className='flex flex-row justify-end items-end space-x-2 ml-auto mt-6'>
							<button className='bg-[#363636] w-[100px] h-[37px] rounded-[5px]' onClick={handleCancel}>
								Cancel
							</button>
							<button className={`${styles.play_now_button} bg-[#363636] w-[140px] h-[37px] rounded-[5px] font-semibold `} onClick={() => { router.back() }
							}>
								Select
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ChoiceMembersPage;
