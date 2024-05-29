'use client'

import apiMock from "@/lib/axios-mock";
import { useAppSelector } from "@/redux/store";
import Link from "next/link";
import { useState } from "react";
import Clock from "../../icons/content_area/clock";
import Add from "../../icons/content_area/add";
import Image from 'next/image';
import RightArrow from "../../icons/content_area/right-arrow";

export function RecommendedContainer({ name, href, number, id, q }: {
	name: string;
	href: string;
	q: string | null;
	number: number;
	id: number;
}) {
	const { friend_requests } = useAppSelector((state) => state.user.user);
	const [clicked, setClicked] = useState(false);
	const requestUrl = `/users/send-friend-request/${id}/`;
	const handleClicked = async () => {
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
		<div className="mt-2 w-full h-[69px] flex items-center justify-between rounded bg-[#292929] p-4 mb-3">
			<Link href={`/profile/${id}`} className="flex items-center justify-between">
				<Image className="bg-white w-[53px] h-[53px] rounded-full" src={href} alt="Profile Image" width={53} height={53} />
				<div className="flex items-start flex-col max-w-[80px] ml-[10px]">
					<div className="text-white truncate text-[18px] font-bold">{name}</div>
					<div className="text-[#878787] text-[12px] truncate font-medium">Level {String(id)}</div>
				</div>
			</Link>
			<div className="flex items-center justify-center rounded-[4px]" onClick={handleClicked}>
				{!q ? (
					clicked ? (
						<button className="flex flex-row items-center justify-center rounded-[4px] bg-[#474747] w-[180px] h-[35px]">
							<div className="pr-2">
								<Clock />
							</div>
							<div className="text-[#e2e2e2] text-[12px] font-medium">Request sent</div>
						</button>
					) : (
						<button className="flex items-center justify-center rounded-[4px] bg-[#FD4106] w-[180px] h-[35px]">
							<div className="pr-2">
								<Add />
							</div>
							<div className="text-white text-[12px] font-medium">Add Friend</div>
						</button>
					)
				) : (
					<Link href={`/profile/${id}`} className="flex items-center justify-between mx-auto text-white text-[16px] font-medium">
						<RightArrow />
					</Link>
				)}
			</div>
		</div>
	);
};

export function PendingContainer({ name, href, number, id, q, accept_fiend_request, decline_fiend_request }: {
	name: string;
	href: string;
	number: number;
	id: number;
	q: string | null;
	accept_fiend_request: string;
	decline_fiend_request: string;
}) {
	const [accept, setAccept] = useState(false);
	const [decline, setDecline] = useState(false);
	const handleAccept = async () => {
		try {
			console.log(accept_fiend_request)
			const response = await apiMock.put(accept_fiend_request);
			console.log(response)
			setAccept(true)
		} catch (err: any) {
			console.error('Failed to send friend request', err);
		}
	};
	const handleDecline = async () => {
		try {
			const response = await apiMock.delete(decline_fiend_request);
			setDecline(true)
		}
		catch (err: any) {
			console.error('Failed to send friend request');
		}
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
					<div className={`ml-[10px]  text-[#878787] text-[12px] truncate font-medium`}>Level {id}</div>
				</div>
			</Link>
			{
				!q ?
					<div className={`flex items-center justify-center rounded-[4px] gap-2`}>
						{!accept ? (
							<button className={`flex flex-row items-center justify-center rounded-[4px] bg-[#FD4106] w-[100px] h-[35px] p-2`} onClick={handleAccept}>
								<div className="text-[#e2e2e2] text-[12px] font-medium"> Accept </div>
							</button>
						) : (
							<Link href={`profile/${id}/`} passHref>
								<div className="flex items-end justify-end text-white text-[16px] font-medium">
									<RightArrow />
								</div>
							</Link>
						)}

						{!decline ? (
							<button className={`flex flex-row items-center justify-center rounded-[4px] bg-[#474747] w-[80px] h-[35px]`} onClick={handleDecline}>
								<div className="text-[#e2e2e2] text-[12px] font-medium"> Decline </div>
							</button>
						) : (
							<Link href={`profile/${id}/`} passHref>
								<div className="flex items-end justify-end text-white text-[16px] font-medium">
									<RightArrow />
								</div>
							</Link>
						)}
					</div>
					:
					<Link href={'/messenger'} className=" flex items-center justify-between mx-auto text-white text-[16px] font-medium"> <RightArrow /> </Link>
			}

		</div>
	);
}

export function BlocksContainer({ name, href, number, id }: {
	name: string;
	href: string;
	number: number;
	id: number;
}) {
	const [clicked, setClicked] = useState(false);

	const handleClicked = () => {
		setClicked(!clicked);
	};
	return (
		<button
			className={`mt-2 w-full h-[69px] flex items-center justify-between rounded bg-[#292929] p-4 mb-5`}
		>
			<div className='flex items-center justify-between '>
				<Image className="bg-white  w-[53px] h-[53px] rounded-full" src={href} alt="Profile Image" width={53} height={53} />
				<div />
				<div className="flex items-start flex-col max-w-[80px]">
					<div className="ml-[10px]  text-white truncate text-[18px] font-bold">{name}</div>
					<div className={`ml-[10px]  text-[#878787] text-[12px] truncate font-medium`}>Level {String(number)}</div>
				</div>
			</div>
			{clicked ?
				<Link href={'/home'} className=" flex items-end justify-end  text-white text-[16px] font-medium"> <RightArrow /> </Link>
				:
				<div className={`flex  items-center justify-center rounded-[4px]  bg-[#FD4106] w-[108px] h-[27px]`} onClick={() => handleClicked()}>
					<div className=" flex items-center   justify-between mx-auto text-white text-[12px] font-medium"> Unblock </div>
				</div>
			}

		</button>
	);
}