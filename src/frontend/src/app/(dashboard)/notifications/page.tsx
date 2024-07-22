'use client'
import {
	Notifications,
} from "@/app/ui/dashboard/nav/NavBar";
import NotificationMenu from "@/app/ui/dashboard/nav/notification-menu";
import apiMock from "@/lib/axios-mock";
import { PaginationApiResponse } from "@/type";
import { user } from "@/type/auth/user";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ImageSrc } from "@/lib/ImageSrc";
import Link from "next/link";
import { removeNotification } from "@/api/user";



export function NotificationContent({
	notifications,
	removeSelectedNotification,
}: {
	notifications: Notifications;
	removeSelectedNotification: (id: number) => void;
}) {
	const [client, setClient] = useState(false);
	const truncatedNotification = notifications.description;
	const send_at = new Date(notifications.created_at).toLocaleString();
	useEffect(() => {
		setClient(true);
	}, []);
	if (!client) return null;
	let href = '';
	if (notifications.type === 'friend-request')
		href = `/profile/${notifications.sender.username}`
	else if (notifications.type === 'messenger')
		href = `/messenger?chatroom=${notifications.sender.id}&groupId=${notifications.id}`
	else if (notifications.type === 'invite')
		href = `/match-making?player=${notifications.sender.username}`
	return (
		<div
			className={` p-2 h-[50px] flex  flex-row items-center justify-between rounded-sm my-[3px] min-w-[260px] w-full overflow-hidden ${!notifications.seen ? "bg-[#474747]" : ""
				}`}>

			<Link href={href} className='flex items-center rounded-sm'>
				<div className='rounded-ful flex items-start '>
					<Image
						className='bg-white  w-[35px] h-[35px] rounded-full'
						src={ImageSrc(
							notifications.sender.image_url,
							notifications.sender.username
						)}
						alt='Profile Image'
						width={100}
						height={100}
					/>
				</div>
				<div className='pl-2 flex flex-col items-start '>
					<div className=' text-white font-light text-[12px] overflow-hidden max-h-[300px] '>
						{" "}
						{truncatedNotification}
					</div>
					<div className=' font-normal text-[#878787] text-[10px]  '>
						{send_at}
					</div>
				</div>
			</Link>
			<div className=''>
				<NotificationMenu id={notifications.id} removeSelectedNotification={removeSelectedNotification} />
			</div>
		</div>
	);
}
const GetData = async () => {
	const response = await apiMock.get("/notifications/");
	return response.data;
};
const page = async () => {
	const notifications: PaginationApiResponse<Notifications> = await GetData();
	const removeSelectedNotification = async (id: number) => {
		try {
		  const index = notifications.results.findIndex(notification => notification.id === id);
		  if (index !== -1) {
			await removeNotification(id);
			notifications.results.splice(index, 1);
		  }
		} catch (error) {
		  console.log(error);
		}
	  };

	return (
		<div className='p-2 rounded h-full w-full bg-[#242424] flex flex-col'>
			<div className='font-semibold text-[14px] w-full text-[#666666]'>
				{" "}
				NOTIFICATION
			</div>
			<div className='w-full border-t-[2px] border-[#363636] pt-3 mt-3'></div>
			<div className='flex h-full w-full flex-col items-center'>
				<div className='w-full h-full overflow-y-scroll hide-scrollbar '>
					{notifications?.results.map((item, index) => (
						<div
							key={index}
							className={`flex flex-col justify-between items-center relative w-full`}>
							<NotificationContent notifications={item} removeSelectedNotification={removeSelectedNotification}/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default page;
