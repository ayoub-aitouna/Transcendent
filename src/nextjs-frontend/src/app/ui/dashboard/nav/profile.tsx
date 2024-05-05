import Image from 'next/image';
import React, { useState } from 'react';

import { SVGProps } from "react"
export const Sttings = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={14}
		height={14}
		fill="none"
		{...props}
	>
		<g
			stroke="#A2A2A2"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			clipPath="url(#a)"
		>
			<path d="m11.87 5.205-.213-.119a1.167 1.167 0 0 1-.457-.422l-.038-.066a1.168 1.168 0 0 1-.175-.674l.004-.248c.007-.397.01-.597-.046-.775a1.165 1.165 0 0 0-.243-.43c-.125-.14-.298-.24-.645-.44l-.288-.165c-.346-.2-.519-.3-.703-.337a1.166 1.166 0 0 0-.492.004c-.182.04-.353.144-.694.348h-.002l-.207.124a1.159 1.159 0 0 1-.595.184l-.075.001h-.076a1.165 1.165 0 0 1-.531-.147l-.065-.039-.208-.124c-.344-.207-.516-.31-.7-.351a1.166 1.166 0 0 0-.493-.004c-.184.039-.357.14-.703.34h-.002l-.284.166-.003.002c-.343.198-.515.299-.639.438-.11.124-.193.27-.242.428-.055.18-.053.379-.046.778l.005.247V4a1.168 1.168 0 0 1-.175.599l-.038.064a1.167 1.167 0 0 1-.394.387l-.065.037-.21.117c-.352.194-.527.291-.654.43a1.167 1.167 0 0 0-.251.426c-.059.18-.059.38-.058.78l.001.329c0 .398.002.597.06.775.053.158.138.302.25.424.127.137.301.234.65.428l.208.116.07.04c.183.11.333.267.432.455l.04.07c.098.186.144.396.134.606l-.005.237c-.007.4-.01.601.047.78.05.159.132.305.243.43.125.14.298.24.645.44l.288.165c.346.2.519.3.702.337.163.034.33.032.492-.004.183-.04.354-.144.697-.349l.206-.123c.178-.115.384-.179.595-.185h.152c.185.005.367.056.53.147l.054.032.22.131c.344.207.515.31.7.35.161.037.33.039.493.005.183-.038.357-.14.703-.34l.289-.167c.343-.2.515-.3.639-.439.11-.124.192-.27.242-.428.055-.178.052-.376.045-.769l-.005-.257c-.011-.237.05-.472.175-.673l.039-.065c.098-.158.233-.291.393-.387l.064-.035.002-.001.21-.117c.351-.195.527-.291.655-.43.113-.123.198-.269.25-.426.058-.178.058-.377.057-.774l-.001-.335c0-.398-.001-.598-.06-.776a1.167 1.167 0 0 0-.25-.423c-.127-.137-.3-.234-.648-.427h-.001Z" />
			<path d="M4.667 7a2.333 2.333 0 1 0 4.666 0 2.333 2.333 0 0 0-4.666 0Z" />
		</g>
		<defs>
			<clipPath id="a">
				<path fill="#fff" d="M0 0h14v14H0z" />
			</clipPath>
		</defs>
	</svg>
)

const LogOut = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={14}
		height={14}
		fill="none"
		{...props}
	>
		<path
			stroke="#A2A2A2"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
			d="M7 7h4.083m0 0-1.75 1.75M11.083 7l-1.75-1.75m1.75-1.75v-.583A1.167 1.167 0 0 0 9.917 1.75H4.083a1.167 1.167 0 0 0-1.166 1.167v8.166a1.167 1.167 0 0 0 1.166 1.167h5.834a1.167 1.167 0 0 0 1.166-1.167V10.5"
		/>
	</svg>
)


export const ProfileIcon = () => {
	const [isClicked, setIsClicked] = useState(false);

	const handleClick = () => {
		setIsClicked(!isClicked);
	};

	const handleViwProfile = () => {
		window.location.href = "/profile";
	};
	const handleLogout = () => {
		window.location.href = "/auth";
	};

	const handleSttings = () => {
		window.location.href = "/";
	};

	return (
		<div className='relative z-50'>
			<button className="flex  flex-row items-center justify-between rounded-md overflow-hidden bg-[#292929] p-1 h-[46.9px] min-w-40 "
				onClick={handleClick} aria-label="Navigate to game">
				<div className="flex items-center">

					<div className="rounded-ful flex items-start ">
						<Image
							className="bg-white  w-10 h-[38.9px] rounded-full"
							src='/assets/images/profile.jpg'
							alt="Profile Image"
							width={40} height={38.9} />
					</div>
					<div className="flex flex-col items-start max-w-[80px]">
						<div className="ml-[5px] text-white truncate font-semibold text-[15px]"> aaitouna</div>
						<div className="ml-[5px] items-start font-normal text-white text-[8px] truncate ">Level 55</div>
					</div>
				</div>
				<div className="ml-2 bg-black rounded-full overflow-hidden w-7 h-7 flex items-center justify-center" onClick={handleClick}>
					{isClicked ?
						<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
							<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7" />
						</svg>
						:
						<svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
							<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1" />
						</svg>
					}
				</div>
			</button >
			{isClicked && (
				<div className="mt-[3px] absolute right-0 top-full bg-[#242424] w-[200px] h-[145px] p-4 rounded-md">
					<div className="flex items-start">
						<div className="rounded-full flex items-start">
							<div className="rounded-full flex items-start w-[30px] h-[30px]">
								<Image
									className="bg-white w-[30px] h-[30px] rounded-full"
									src='/assets/images/profile.jpg'
									alt="Profile Image"
									width={30} height={30}
								/>
							</div>
						</div>
						<div className="flex flex-col items-start ml-[5px]">
							<div className="truncate text-white font-bold text-[14px]">Ayoub Aitouna</div>
							<div className="truncate text-[#A2A2A2] text-[8px]">@aaitouna</div>
							<button className="mt-1 truncate text-[#FD4106] text-[8px]" onClick={handleViwProfile}>View Your Profile</button>
						</div>
					</div>


					<div className=" w-[160px]   mt-2 border-t border-[#363636] pt-2"></div>
					<button className="flex items-center justify-between  flex-row  w-[55px] h-[14px]" onClick={handleSttings}>
						<div className="items-start"><Sttings /></div>
						<div className="items-end text-[8px]">Settings</div>
					</button>
					<button className="pt-4 flex items-center justify-between  flex-row  w-[55px] h-[14px]" onClick={handleLogout}>
						<div className="items-start"><LogOut /></div>
						<div className="items-end text-[8px]" >Sing out</div>
					</button>
				</div>
			)}



		</div>
	);
};

export default ProfileIcon;