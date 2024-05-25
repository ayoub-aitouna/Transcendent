'use client'

import Empty from '@/app/ui/dashboard/component/Empty'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { AllOnlinePlayers } from '@/constant/dashboard';
import Link from 'next/link';
import Clock from '@/app/ui/dashboard/icons/content_area/clock';
import Add from '@/app/ui/dashboard/icons/content_area/add';
import { UsersListWrapper } from '@/app/ui/dashboard/home/content_area/user-list-wrapper';
import { useAppSelector } from '@/redux/store';
import SearchIcon from '@/app/ui/dashboard/icons/messenger/search';
import apiMock from '@/lib/axios-mock';
import { PaginationApiResponse } from '@/type';
import { Player } from '@/type/dashboard/players';
import { Friend } from '@/type/auth/user';
import axios from 'axios';




export function FriendContainer({ name, href, number, id }: {
	name: string;
	href: string;
	number: number;
	id: number;
}) {
	const { friend_requests } = useAppSelector((state) => state.user.user);
    const [clicked, setClicked] = useState(false);
	const requestUrl = "http://localhost:8000/api/v1/users/send-friend-request/${id}/";
	const isFriendRequestSent = friend_requests.some(request => requestUrl  === friend_requests[id].url);
    const handleClicked = async () => {
		console.log("request is sended : " , isFriendRequestSent, "and is :", friend_requests[id]?.url);
		if (isFriendRequestSent) {
			try {
				const response = await apiMock.post(``);
				if (response.status === 201) {
					setClicked(true);
				} else {
					console.error('Failed to send friend request');
				}
			} catch (error) {
				console.error('Error sending friend request:', error);
			}
		}
		else
			setClicked(true);
    };
	return (
		<button
			className={`mt-2 w-full h-[69px] flex items-center justify-between rounded bg-[#373737] p-4 mb-3`}
		>
			<div className='flex items-center justify-between '>
				<Image className="bg-white  w-[53px] h-[53px] rounded-full" src={href} alt="Profile Image" width={53} height={53} />
				<div />
				<div className="flex items-start flex-col max-w-[80px]">
					<div className="ml-[10px]  text-white truncate text-[18px] font-bold">{name}</div>
					<div className={`ml-[10px]  text-[#878787] text-[12px] truncate font-medium`}>Level {String(number)}</div>
				</div>
			</div>
			<div className={`flex  items-center justify-center rounded-[4px]`} onClick={() => handleClicked()}>
				{clicked ?
					<div className={` flex flex-row  items-center justify-center rounded-[4px] bg-[#878787] w-[180px] h-[35px]`}>
						<div className="pr-2"> <Clock /> </div>
						<div className="  text-[#e2e2e2] text-[12px] font-medium"> Request sent </div>
					</div>

					:
					<div className={`flex  items-center justify-center rounded-[4px]  bg-[#FD4106] w-[180px] h-[35px]`}>
						<div className="pr-2"> <Add /> </div>
						<div className="  text-white text-[12px] font-medium"> Add Friend </div>
					</div>

				}
			</div>

		</button>
	);
}


const page = () => {
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<Friend[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await apiMock.get("/users/search-user/?none_friend_only=true");
            if (response.status === 200) {
                setResults(response.data.results);
            } else {
                throw new Error("Failed to fetch data");
            }
        } catch (err) {
            setError("Failed to fetch data");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setQuery(e.target.value);
    };

    const filteredFriends = query
        ? results.filter((friend) =>
            friend.username.toLowerCase().includes(query.toLowerCase())
        )
        : results;

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
