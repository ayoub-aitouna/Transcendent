'use client'

import apiMock from "@/lib/axios-mock";
import { useAppSelector } from "@/redux/store";
import Link from "next/link";
import { useState } from "react";
import Clock from "../../icons/content_area/clock";
import Add from "../../icons/content_area/add";
import Image from 'next/image';

export function RecommendedContainer({ name, href, number, id, status }: {
	name: string;
	href: string;
	number: number;
	id: number;
	status: string;
}) {
	const { friend_requests } = useAppSelector((state) => state.user.user);
	const [clicked, setClicked] = useState(false);
	const requestUrl = `/users/send-friend-request/${id}/`;
	const isFriendRequestSent = friend_requests.some(request => requestUrl === friend_requests[id].url);
	const handleClicked = async () => {
		console.log("request is sended : ", isFriendRequestSent, "and is :", friend_requests[id]?.url);
		try {
			const response = await apiMock.post(requestUrl);
			if (response.status === 201) {
				setClicked(true);
			} else {
				console.error('Failed to send friend request');
			}
		} catch (error) {
			console.error('Error sending friend request:', error);
		}
	};

	return (
		<button
			className={`mt-2 w-full h-[69px] flex items-center justify-between rounded bg-[#292929] p-4 mb-3`}
		>
			<Link href={`/profile/${id}`} className='flex items-center justify-between '>
				<Image className="bg-white  w-[53px] h-[53px] rounded-full" src={href} alt="Profile Image" width={53} height={53} />
				<div />
				<div className="flex items-start flex-col max-w-[80px]">
					<div className="ml-[10px]  text-white truncate text-[18px] font-bold">{name}</div>
					<div className={`ml-[10px]  text-[#878787] text-[12px] truncate font-medium`}>Level {String(number)}</div>
				</div>
			</Link>
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

export function PendingContainer({ name, href, number, id, status }: {
	name: string;
	href: string;
	number: number;
	id: number;
	status: string;
}) {
	const { friend_requests } = useAppSelector((state) => state.user.user);
	const [accept, setAccept] = useState(false);
	const requestUrl = `/users/send-friend-request/${id}/`;
	const isFriendRequestSent = friend_requests.some(request => requestUrl === friend_requests[id].url);
	const handleAccept = async () => {
		const response = await apiMock.post(requestUrl);
		setAccept(true);
	};
	return (
		<div
			className={`mt-2 w-full h-[69px] flex items-center justify-between rounded bg-[#292929] p-4 mb-3`}
		>
			<Link href={`/profile/${id}`} className='flex items-center justify-between '>
				<Image className="bg-white  w-[53px] h-[53px] rounded-full" src={href} alt="Profile Image" width={53} height={53} />
				<div />
				<div className="flex items-start flex-col max-w-[80px]">
					<div className="ml-[10px]  text-white truncate text-[18px] font-bold">{name}</div>
					<div className={`ml-[10px]  text-[#878787] text-[12px] truncate font-medium`}>Level {String(number)}</div>
				</div>
			</Link>
			<div className={`flex  items-center justify-center rounded-[4px] gap-2`} onClick={() => handleAccept()}>
				<button className={` flex flex-row  items-center justify-center rounded-[4px] bg-[#FD4106] w-[100px] h-[35px] p-2`}>
					<div className="  text-[#e2e2e2] text-[12px] font-medium"> Accept </div>
				</button >
				<button className={` flex flex-row  items-center justify-center rounded-[4px] bg-[#878787] w-[80px] h-[35px]`}>
						<div className="  text-[#e2e2e2] text-[12px] font-medium"> Decline </div>
				</button>
			</div>

		</div>
	);
}