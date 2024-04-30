"use client";

import NavBtn from "@/app/ui/dashboard/nav/NavBtn";
import NavBtnR from "@/app/ui/dashboard/nav/NavBtnRight";
import ProfileIcon from "@/app/ui/dashboard/nav/profile";
import styles from "@/app/ui/dashboard/nav/nav.module.css";
import { navLinks, Notifications, socialLinks } from "@/constant/dashboard";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PlayNowIcon = () => {
	const pathname = usePathname();
	if (pathname === "/game") return null;
	return (
		<Link
			href='/game'
			className={`${styles.play_now_button} h-9 w-36 grid place-content-center text-sm font-semibold`}>
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
		notification.length > 70
			? `${notification.substring(0, 70)}...`
			: notification;
	return (
		<div
			className={`p-2 min-h-[30px] flex  flex-row items-center justify-between rounded-md  w-[206px] overflow-hidden`}>
			<div className='flex items-center rounded-sm'>
				<div className='rounded-ful flex items-start'>
					<Image
						className=' w-[25px] h-[25px] '
						src='/aaitouna.png'
						alt='Profile Image'
						width={25}
						height={25}
					/>
				</div>
				<div className='pl-2 flex flex-col items-start w-[153px] '>
					<div className=' text-white font-light text-[8px] overflow-hidden max-h-[30px] '>
						{" "}
						{truncatedNotification}
					</div>
					<div className=' font-normal text-[#878787] text-[5px]  '>{time}</div>
				</div>
			</div>
		</div>
	);
}

const NavBar = () => {
	const [clickedIndex, setClickedIndex] = useState(false);
	const [ViewALlClicked, setViewALlClicked] = useState(false);
	const [NotificationClicked, setNotificationClicked] = useState<number | null>(
		null
	);

	const handleIconClick = (href: string) => {
		if (href === "") setClickedIndex(!clickedIndex);
	};

	const handleViewAll = () => {
		setViewALlClicked(!ViewALlClicked);
	};

	const handleNotificationClicked = (index: number) => {
		setNotificationClicked(index === NotificationClicked ? null : index);
	};
	// const calculateMaxNotifications = () => {
	// 	let totalHeight = 0;
	// 	let count = 0;
	// 	const notificationHeight = 30;
	// 	while (totalHeight < 190 && count < Notifications.length) {
	// 		totalHeight += notificationHeight;
	// 		count++;
	// 	}
	// 	return count;
	// };
	// const maxNotifications = calculateMaxNotifications();
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
									className={`rounded-full ${
										clickedIndex && item.href === ""
											? "bg-[#111111]"
											: "bg-[#303030]"
									} h-[40px] w-[40px] aspect-square`}>
									<NavBtnR href={item.href} Icon={item.Icon} />
									{item.href === "" && clickedIndex ? (
										<div
											className='mt-[3px] absolute top-full right-0 bg-[#242424] w-[226px] p-2 rounded-md flex flex-col'
											onClick={(e) => e.stopPropagation()}>
											<div className='font-semibold text-[12px] text-[#666666]'>
												{" "}
												NOTIFICATION
											</div>
											<div className='w-[206px] border-t border-[#363636] pt-2'></div>
											<div className='flex flex-col items-center'>
												<div
													className={`${
														ViewALlClicked
															? "max-h-[250px] overflow-y-auto pl-2 "
															: "max-h-[250px]"
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
														ViewALlClicked ? Notifications.length : 6
													)}
												</div>
												{Notifications.length > 6 && (
													<button
														className='justify-center mt-2 flex flex-row items-center rounded-[2px] h-[11px] w-[38px]'
														onClick={handleViewAll}
														aria-label='Navigate to game'>
														<div className='flex flex-row items-center justify-between mx-auto'>
															<div className='font-medium items-center text-[#A5A5A5] tracking-[.025] text-[6px]'>
																{ViewALlClicked ? "SHOW LESS" : "VIEW ALL"}
															</div>
														</div>
													</button>
												)}
											</div>
										</div>
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
