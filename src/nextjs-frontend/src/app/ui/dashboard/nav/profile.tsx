import Image from 'next/image';
import * as React from "react";

export const ProfileIcon = () => {
	const handleClick = () => {
		// Handle button click event to navigate to the game
		window.location.href = "/kmahdi.jpg";
	};

	return (
		<button className="flex  flex-row items-center justify-between rounded-md overflow-hidden bg-[#292929] p-1 h-[46.9px] min-w-40 "
			onClick={handleClick} aria-label="Navigate to game">
			<div className="flex items-center">

				<div className="rounded-ful flex items-start ">
					<Image className="bg-white  w-10 h-[38.9px] rounded-full" src="/aaitouna.png" alt="Profile Image" width={40} height={38.9} />
				</div>
				<div className="flex flex-col max-w-[80px]">
					<div className="ml-[5px] font-medium text-white truncate ">kmahdi</div>
					<div className="font-[200] text-white text-xs truncate ">Level 55</div>
				</div>
			</div>
			<div className="ml-2 bg-black rounded-full overflow-hidden w-7 h-7 flex items-center justify-center">
				<svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
					<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1" />
				</svg>
			</div>
		</button>
	);
};

export default ProfileIcon;
