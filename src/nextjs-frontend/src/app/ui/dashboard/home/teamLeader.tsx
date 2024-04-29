
'use client'
import React from 'react';
import Image from 'next/image';
import { Rank } from '../icons/content_area/rank';
import Coins from '../icons/content_area/coins';
import Messages from '../icons/content_area/messages';
import { ContentBtn } from './content_area/contentBtn';

export const SvgComponent = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={340}
		height={161}

		fill="none"
	>
		<path
			fill="url(#a)"
			d="M39.888 60.407 0 41.624V262h340V6.599l-4.749-1.523-25.642 30.965-10.447-3.046-32.29 28.934-3.799 2.538-32.766-34.01-9.972 5.584-18.044-30.965h-3.325l-20.893 25.381h-2.375l-14.245 19.29-16.621 22.842-4.273 3.046-9.498-11.675-19.944-59.9L106.369 0l-7.598 4.06L85 37.057l-5.224 4.569-10.446-7.107-9.498 2.538-19.944 23.35Z"
		/>
		<defs>
			<linearGradient
				id="a"
				x1={170}
				x2={170}
				y1={0}
				y2={149.714}
				gradientUnits="userSpaceOnUse"
			>
				<stop offset={0.062} stopColor="#FD4106" stopOpacity={0.28} />
				<stop offset={1} stopColor="#FD4106" stopOpacity={0} />
			</linearGradient>
		</defs>
	</svg>
)



function TeamLeader() {
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
			<div className='mt-5'>
				<SvgComponent />
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
