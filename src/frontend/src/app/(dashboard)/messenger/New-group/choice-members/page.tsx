// app/messenger/New-group/choice-members.tsx
"use client"; // Ensure this component is treated as a Client Component

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RightArrow from '@/app/ui/dashboard/icons/content_area/RightArrow';
import Empty from '@/app/ui/dashboard/component/Empty';
import SearchBar from '@/app/ui/dashboard/home/content_area/SearchBar';
import { Key } from 'react';
import { GetFriendsData } from '@/api/user';
import Error from "@/app/ui/dashboard/component/Error";
import GroupsContainer from '@/app/ui/dashboard/messenger/Group-container';
import { useUserContext } from '@/app/ui/dashboard/messenger/context/UserContext';
import { useRouter } from 'next/navigation';

const ChoiceMembersPage = ({ searchParams }: { searchParams?: { q?: string } }) => {
    const [filteredFriends, setFilteredFriends] = useState([]);
    const { users } = useUserContext();
    const router = useRouter();
    const q = searchParams?.q || null;

	console.log(" users : -- > ", users);
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

    const handleDoneClick = () => {
        if (users.length >= 2) {
            router.back();
        } else {
            alert('Please select at least 2 friends.');
        }
    };

    if (filteredFriends.length === 0) {
        return (
            <Error
                title='Friend not found'
                desc='The Friend you are looking for does not exist.'
            />
        );
    }

    return (
        <div className="flex items-center justify-center w-full">
            <button onClick={handleDoneClick}>
                Done
            </button>
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
                        <div className='font-bold text-[18px] pb-2'>Choose at least 2 friends</div>
                        {filteredFriends.map((friend: { username: string; image_url: string; level: number; id: number; }, index: Key | null | undefined) => (
                            <GroupsContainer
                                key={index}
                                username={friend.username}
                                image_url={friend.image_url}
                                level={friend.level}
                                id={friend.id}
                            />
                        ))}
                        <div className='mt-4'>
                            <h3 className='font-bold text-[16px]'>Selected Users:</h3>
                            <ul>
                                {users.map(user => (
                                    <li key={user.id}>{user.username}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
                <div className='flex justify-end mt-4'>
                    <button
                        onClick={handleDoneClick}
                        className='bg-gray-800 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-700'
                    >
                        <span className='mr-2'>Done</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChoiceMembersPage;
