'use client'

import NavBtn from "@/app/ui/dashboard/nav/NavBtn";
import NavBtnR from "@/app/ui/dashboard/nav/NavBtnRight";
import ProfileIcon from "@/app/ui/dashboard/nav/profile"
import styles from '@/app/ui/dashboard/nav/nav.module.css'
import { navLinks, Notifications, socialLinks } from "@/constant/dashboard";
import React, { useState } from 'react';
import Image from 'next/image';
import { string } from "yup";


const PlayNowIcon = () => {
	const handleClick = () => {
		window.location.href = "/game";
	};

	return (
		<button className={`${styles.play_now_button} h-9 w-36`} onClick={handleClick}> Play Now </button>
	);
};

function NotificationContent({ notification, time }: {
	notification: string;
	time: string
}) {
	return (
		<div className={`pt-2 flex  flex-row items-center justify-between rounded-md  w-[206px] overflow-hidden`}>
				<div className=" flex items-center rounded-sm">
					<div className="rounded-ful flex items-start">
						<Image className="ml-2 w-[25px] h-[25px] " src="/aaitouna.png" alt="Profile Image" width={25} height={25} />
					</div>
					<div className="pl-2 flex flex-col items-start w-[153px] h-full">
						<div className=" text-white font-light text-[8px]"> {notification}</div>
						<div className=" font-normal text-[#878787] text-[5px]  ">{time}</div>
					</div>
				</div>
		</div>
	);
};


const NavBar = () => {
	const [clickedIndex, setClickedIndex] = useState<number | null>(null);
	const [isClicked, setIsClicked] = useState(false);

	const handleIconClick = (index: number, href: string) => {
		if (href === '') {
			setClickedIndex(prevIndex => prevIndex === index ? null : index);
		}
	};

	const handleClick = () => {
		setIsClicked(!isClicked);
	};

	Notification
	return (
		<div className='w-full mt-[40px] mb-[40px] flex flex-row justify-between items-center mx-auto max-w-[100vw]'>
			<div className="text-white font-semibold flex flex-row gap-16 items-center justify-center">
				<PlayNowIcon />
				<ul className="flex flex-row gap-8 justify-center items-center">
					{navLinks.map((item, index) => (
						<NavBtn
							key={index}
							href={item.href}
							name={item.name}
							Icon={item.Icon}
						/>
					))}
				</ul>
			</div>
			<div className="flex items-center space-x-2">
				{socialLinks.map((item, index) => (
					<div key={index} className={`relative rounded-full ${clickedIndex === index && item.href === '' ? 'bg-[#111111]' : 'bg-[#303030]'} h-[40px] w-[40px] aspect-square`} onClick={() => handleIconClick(index, item.href)}>
						<NavBtnR
							href={item.href}
							Icon={item.Icon}
						/>
						{clickedIndex === index && (
							<div className="mt-[3px] absolute top-full right-0 bg-[#242424] w-[226px] h-[290px] p-2 rounded-md flex flex-col">
								<div className="font-semibold text-[12px] text-[#666666]"> NOTIFICATION</div>
								<div className="w-[206px] mt-2 border-t border-[#363636] pt-2"></div>
								<div className="flex items-center flex-col">
									{Notifications.map((item, index) => (
										<div key={index} className="container flex flex-col justify-between items-center">
											<NotificationContent
												notification={item.notification}
												time={item.time}
											/>
										</div>
									))}
								</div>
							</div>
						)}

					</div>
				))}
				<ProfileIcon />
			</div>
		</div>
	);
};






export default NavBar;

