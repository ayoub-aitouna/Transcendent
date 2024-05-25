
'use client'
import Image from 'next/image';
import { Rank } from '../icons/content_area/rank';
import Coins from '../icons/content_area/coins';
import Messages from '../icons/content_area/messages';
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import Link from 'next/link';
import Empty from '../component/Empty';
import ChartComponent from './content_area/chartComponent';




function TeamLeader() {
	const handleClick = () => {
		window.location.href = "/profile";
	};
	return (
		<div className='' >
			<div className="pt-4 flex items-center" onClick={handleClick} aria-label="Navigate to profile">
				<div className="rounded-full overflow-hidden bg-white w-[62px] h-[62px]">
					<Image src="/assets/images/profile.jpg" alt="Profile Image" width={62} height={62} />
				</div>
				<div className="flex flex-col ml-5">
					<div className=" text-white  font-bold text-[18px] tracking-tight	">Ayoub Aitouna </div>
					<div className="font-light mt-[2px] text-[#A1A1A1] text-[14px]">Team Leader </div>
				</div>
			</div >
			<div className=' mt-10 h-[12px] text-white font-light text-sx flex justify-between">'>
				<div className=' text-[10px] font-light'>My Level</div>
				<div className="ml-auto text-[10px] font-light">7.9000/9000</div>
			</div>
			<div className='mt-5 h-[161px] w-full'>
				<ChartComponent />
			</div >
			<div className='mt-5'>
				<div className='flex flex-row justify-between items-center'>
					<div
						className={` flex items-center justify-between rounded w-1/2 overflow-hidden  bg-[#323232] p-2 h-[44px] mb-[10px]`}>
						<div className='flex items-center justify-between  '> <Rank /> <div />
							<div className="flex items-center justify-between ml-2">
								<div className="text-white  text-[12px] font-medium">Rank</div>
							</div>
						</div>
						<div className="flex items-center justify-end">
							<div className="bg-[#434343] rounded dark:text-white">
								<div className="ml-3 mr-3 font-medium text-[12px]">1564</div>
							</div>
						</div>

					</div>
					<div
						className={` flex items-center justify-between rounded w-1/2 overflow-hidden bg-[#323232] p-2 ml-2 h-[44px] mb-[10px]`}>
						<div className='flex items-center justify-between  '> <Coins /> <div />
							<div className="flex items-center justify-between">
								<div className="text-white text-[12px] font-medium ml-2">Coins</div>
							</div>
						</div>
						<div className="flex items-center justify-end">
							<div className="bg-[#434343] rounded dark:text-white">
								<div className="ml-3 mr-3 font-medium  text-[12px]">421</div>
							</div>
						</div>

					</div>
				</div>
				<Link href="/messenger"
					className={` flex items-center justify-between rounded w-full overflow-hidden bg-[#323232] p-2 h-[44px] mb-[10px]`}>
					<div className='flex items-center justify-between'> <Messages /> <div />
						<div className="text-white  text-[12px] font-medium ml-2">Messages</div>
					</div>
					<div className="flex items-center justify-end">
						<div className="bg-[#434343] rounded dark:text-white">
							<div className="ml-3 mr-3 font-medium  text-[12px]">15</div>
						</div>
					</div>

				</Link>
			</div>
			<div>

			</div>
		</div>
	);
}

export default TeamLeader;
