
'use client'
import Image from 'next/image';
import { Rank } from '../icons/content_area/rank';
import Coins from '../icons/content_area/coins';
import Messages from '../icons/content_area/messages';
import { ContentBtn } from './content_area/contentBtn';
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export const ChartComponent = () => {
	return (
	  <div style={{ width: '340px', height: '162px', position: 'relative', overflow: 'hidden' }}>
	  </div>
	);
  };
  
	
function TeamLeader() {
	const playerData = [70, 75, 79, 62, 80, 90, 82, 80, 75, 100];
	const handleClick = () => {
		window.location.href = "/profile";
	};
	return (
		<div className='' >
			<div className="pt-4 flex items-center" onClick={handleClick} aria-label="Navigate to profile">
				<div className="rounded-full overflow-hidden bg-white w-[62px] h-[62px]">
					<Image src="/aaitouna.png" alt="Profile Image" width={62} height={62} />
				</div>
				<div className="flex flex-col ml-5">
					<div className=" text-white  font-bold text-base tracking-tight	">Ayoub Aitouna </div>
					<div className="font-light mt-[2px] text-[#A1A1A1] text-xs">Team Leader </div>
				</div>
			</div >
			<div className=' mt-10 h-[12px] text-white font-light text-sx flex justify-between">'>
				<div className=' text-sx font-light'>My Level</div>
				<div className="ml-auto">7.9000/9000</div>
			</div>
			<div className='mt-5 h-[161px] w-[340px]'>
			<ChartComponent/>
			</div >
			<div className='mt-5'>
				<div className='container  flex flex-row justify-between items-center'>
					<ContentBtn
						name={"Rank"}
						href={"/ranking"}
						Icon={Rank}
						number={'4561'}
					/>
					<ContentBtn
						name={"Coins"}
						href={"/ranking"}
						Icon={Coins}
						number={'345'}
					/>
				</div>
				<ContentBtn
					name={"Messages"}
					href={"/messenger"}
					Icon={Messages}
					number={'15'}
				/>
			</div>
			<div>

			</div>
		</div>
	);
}

export default TeamLeader;
