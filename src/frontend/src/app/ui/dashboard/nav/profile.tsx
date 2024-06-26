"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Settings from "../icons/content_area/settings";
import LogOut from "../icons/content_area/logout";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { Logout } from "@/redux/slices/userslice";
import { clearCookies } from "@/api/auth";
import { ImageSrc } from "@/lib/ImageSrc";
import { Links, SocialPanel } from "./NavBar";
import { navLinks, socialLinks } from "@/constant/dashboard";

export const ProfileIcon = () => {
	const [isClicked, setIsClicked] = useState(false);
	const dispatch = useAppDispatch();
	const handleClick = () => {
		setIsClicked(!isClicked);
	};
	const user = useAppSelector((state) => state.user);
	const { fullname, username, image_url, level } = user.user;
	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			const panel = document.getElementById("profile-panel");
			const button = document.getElementById("profile-icon");

			if (
				panel &&
				!panel.contains(target) &&
				(!button || !button.contains(target))
			) {
				setIsClicked(false);
			}
		};

		document.addEventListener("mousedown", handleOutsideClick);

		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, []);

	function handleLogout(): void {
		clearCookies();
		dispatch(Logout());
		setIsClicked(false);
	}

	return (
		<div className='relative z-50'>
			<button
				className='flex  flex-row items-center justify-between rounded-md overflow-hidden bg-[#292929] p-1 h-[46.9px] min-w-40 '
				aria-label='Navigate to game'>
				<div className='flex items-center'>
					<div className='rounded-ful flex items-start '>
						<Image
							className='bg-white  w-10 h-[38.9px] rounded-full'
							src={ImageSrc(image_url, username)}
							alt='Profile Image'
							width={40}
							height={38.9}
						/>
					</div>
					<div className='flex flex-col items-start max-w-[80px]'>
						<div className='ml-[5px] text-white truncate w-[60px] font-semibold text-[15px]'>
							{" "}
							{username}
						</div>
						<div className='ml-[5px] items-start font-normal text-white text-[8px] truncate '>
							Level {level}
						</div>
					</div>
				</div>
				<div
					id='profile-icon'
					className='ml-2 bg-black rounded-full overflow-hidden w-7 h-7 flex items-center justify-center'
					onClick={handleClick}>
					{isClicked ? (
						<svg
							className='w-4 h-4 text-gray-800 dark:text-white'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 14 8'>
							<path
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='1.52'
								d='M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7'
							/>
						</svg>
					) : (
						<svg
							className='w-4 h-4 text-gray-800 dark:text-white'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 14 8'>
							<path
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='1.52'
								d='m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1'
							/>
						</svg>
					)}
				</div>
			</button>
			{isClicked && (
				<div
					id='profile-panel'
					className='mt-[3px] absolute right-0 top-full bg-[#242424] w-[200px] min-h-[145px] p-4 rounded-md'>
					<div className='flex items-start'>
						<div className='rounded-full flex items-start'>
							<div className='rounded-full flex items-start w-[30px] h-[30px]'>
								<Image
									className='bg-white w-[30px] h-[30px] rounded-full'
									src={ImageSrc(image_url, username)}
									alt='Profile Image'
									width={30}
									height={30}
								/>
							</div>
						</div>
						<div className='flex flex-col items-start ml-[5px]'>
							<div className='truncate text-white font-bold text-[14px]'>
								{fullname}
							</div>
							<div className='truncate text-[#A2A2A2] text-[8px]'>
								@{username}
							</div>
							<Link
								href='/profile'
								className='mt-1 truncate text-[#FD4106] text-[8px]'
								onClick={() => setIsClicked(false)}>
								View Your Profile
							</Link>
						</div>
					</div>

					<div className=' w-[160px]   mt-2 border-t border-[#363636] pt-2'></div>
					<div className='block lg:hidden'>
						<Links navLinks={navLinks} />
					</div>

					<div className=' w-[160px]   mt-2 border-t border-[#363636] pt-2'></div>

					<Link
						href='/settings'
						className='flex items-center justify-between  flex-row  w-[55px] h-[14px]'>
						<div className='items-start'>
							<Settings />
						</div>
						<div
							className='items-end text-[8px]'
							onClick={() => setIsClicked(false)}>
							Settings
						</div>
					</Link>
					<Link
						href='/auth'
						className='pt-4 flex items-center justify-between  flex-row  w-[55px] h-[14px]'>
						<div className='items-start'>
							<LogOut />
						</div>
						<div
							className='items-end text-[8px]'
							onClick={() => handleLogout()}>
							Sing out
						</div>
					</Link>
					<div className=' w-[160px] mt-4 border-t border-[#363636] pt-2'></div>
					<div className='block lg:hidden '>
						<SocialPanel socialLinks={socialLinks} fullscreen={false} />
					</div>
				</div>
			)}
		</div>
	);
};

export default ProfileIcon;
