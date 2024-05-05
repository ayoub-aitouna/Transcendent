"use client";

import NavBtn from "@/app/ui/dashboard/nav/NavBtn";
import NavBtnR from "@/app/ui/dashboard/nav/NavBtnRight";
import ProfileIcon from "@/app/ui/dashboard/nav/profile";
import styles from "@/app/ui/dashboard/nav/nav.module.css";
import { navLinks, Notifications, socialLinks } from "@/constant/dashboard";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const PlayNowIcon = () => {
	const pathname = usePathname();
	if (pathname.startsWith('/game')) return;
	return (
		<Link
			href='/game'
			className={`${styles.play_now_button}  h-9 w-36 grid place-content-center text-sm font-semibold`}>
			Play Now{" "}
		</Link>
	);
};

function NotificationContent({
	notification,
	time,
}: {
	notification: string;
	time: string;
}) {
	const truncatedNotification =
		notification.length > 60
			? `${notification.substring(0, 60)}...`
			: notification;
	return (
		<div
			className={`p-2 h-[60px] flex  flex-row items-center justify-between rounded-md  w-[256px] overflow-hidden`}>
			<div className='flex items-center rounded-sm'>
			<div className="rounded-ful flex items-start ">
						<Image
							className="bg-white  w-[35px] h-[35px] rounded-full"
							src='/assets/images/profile.jpg'
							alt="Profile Image"
							width={35} height={35} />
					</div>
				<div className='pl-2 flex flex-col items-start w-[203px] '>
					<div className=' text-white font-light text-[12px] overflow-hidden max-h-[80px] '>
						{" "}
						{truncatedNotification}
					</div>
					<div className=' font-normal text-[#878787] text-[10px]  '>{time}</div>
				</div>
			</div>
		</div>
	);
}

function NotificationPanel(){
	const [ViewALlClicked, setViewALlClicked] = useState(false);
	const [NotificationClicked, setNotificationClicked] = useState<number | null>(
		null
	);

	const handleViewAll = () => {
		setViewALlClicked(!ViewALlClicked);
	};

	const handleNotificationClicked = (index: number) => {
		setNotificationClicked(index === NotificationClicked ? null : index);
	};
	return (
		<div
		id="notification-panel"
		className=' z-50 mt-[3px] absolute top-full right-0 bg-[#242424] w-[276px] p-2 rounded-md flex flex-col'
		onClick={(e) => e.stopPropagation()}>
		<div className='font-semibold text-[14px] text-[#666666]'>
			{" "}
			NOTIFICATION
		</div>
		<div className='w-[256px] border-t-[2px] border-[#363636] pt-3 mt-3'></div>
		<div className='flex flex-col items-center'>
			<div
				className={`${ViewALlClicked
						? "h-[300px] overflow-y-scroll hide-scrollbar pl-2 "
						: "h-[300px]"
					}`}>
				{Notifications.map((item, index) => (
					<div
						key={index}
						className={`container flex flex-col justify-between items-center 
						${index === NotificationClicked ? "bg-[#3D3D3D] rounded-sm" : ""}`}
						onClick={() => handleNotificationClicked(index)}>
						<NotificationContent
							notification={item.notification}
							time={item.time}
						/>
					</div>
				)).slice(
					0,
					ViewALlClicked ? Notifications.length : 5
				)}
			</div>
			{Notifications.length > 5 && (
				<button
					className='justify-center flex flex-row items-center rounded-[2px] h-[20px] w-[90px]'
					onClick={handleViewAll}
					aria-label='Navigate to game'>
					<div className='flex flex-row items-center justify-between mx-auto '>
						<div className='font-medium  items-center text-[#A5A5A5]  text-[10px]'>
							{ViewALlClicked ? "SHOW LESS" : "VIEW ALL"}
						</div>
					</div>
				</button>
			)}
		</div>
	</div>
	)
}
const NavBar = () => {
	const [clickedIndex, setClickedIndex] = useState(false);

	const handleIconClick = (href: string) => {
		if (href === "") setClickedIndex(!clickedIndex);
	};

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
		  const target = event.target as HTMLElement;
		  const panel = document.getElementById('notification-panel'); // Replace with your actual panel ID
	
		  if (panel && !panel.contains(target)) {
			setClickedIndex(false);
		  }
		};
	
		document.addEventListener('mousedown', handleOutsideClick);
	
		return () => {
		  document.removeEventListener('mousedown', handleOutsideClick);
		};
	  }, []);

	return (
		<div className='w-full mt-[40px] mb-[40px] flex flex-row justify-between items-center mx-auto max-w-[100vw]'>
			<div className='text-white font-semibold flex flex-row gap-16 items-center justify-center'>
				<PlayNowIcon />
				<ul className='flex flex-row gap-8 justify-center items-center'>
					{navLinks.map((item, index) => (
						<li key={index}>
							<NavBtn
								key={index}
								href={item.href}
								name={item.name}
								Icon={item.Icon}
							/>
						</li>
					))}
				</ul>
			</div>
			<div className='flex items-center space-x-2'>
				{socialLinks.map((item, index) => {
					return (
						<div key={index} className='relative'>
							<div className={``} onClick={() => handleIconClick(item.href)}>
								<div
									className={`rounded-full ${clickedIndex && item.href === ""
											? "bg-[#111111]"
											: "bg-[#303030]"
										} h-[40px] w-[40px] aspect-square`}>
									<NavBtnR href={item.href} Icon={item.Icon} />
									{item.href === "" && clickedIndex ? (
											<NotificationPanel/>
									) : null}
								</div>
							</div>
						</div>
					);
				})}
				<ProfileIcon />
			</div>
		</div>
	);
};

export default NavBar;
