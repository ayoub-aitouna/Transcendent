'use client'

import React, { useState, useEffect } from "react";
import { FilterBtn } from './content_area/filterBtn';
import Image from 'next/image';
import styles from '@/app/ui/dashboard/nav/nav.module.css'
import ViewAll from './content_area/viewAll';
import { AllOnlinePlayers } from "@/constant/dashboard";
import Empty from "../Empty";


export const InviteIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={16}
		height={15}
		fill="none"
	>
		<g clipPath="url(#a)">
			<path
				fill="#F8F8F8"
				d="M12.375 10.625v1.25h-7.5v-1.25s0-2.5 3.75-2.5 3.75 2.5 3.75 2.5ZM10.5 5a1.875 1.875 0 1 0-3.75 0 1.875 1.875 0 0 0 3.75 0Zm2 3.162a3.5 3.5 0 0 1 1.125 2.463v1.25H15.5v-1.25s0-2.156-3-2.463Zm-.75-5.037c-.189 0-.377.03-.556.087a3.125 3.125 0 0 1 0 3.575c.18.058.367.088.556.088a1.875 1.875 0 1 0 0-3.75ZM5.5 6.25H3.625V4.375h-1.25V6.25H.5V7.5h1.875v1.875h1.25V7.5H5.5V6.25Z"
			/>
		</g>
		<defs>
			<clipPath id="a">
				<path fill="#fff" d="M.5 0h15v15H.5z" />
			</clipPath>
		</defs>
	</svg>
)



export function PlayersContainer({ name, href, number }: {
	name: string;
	href: string;
	number: Number;
}) {
	const handleClick = () => {
		window.location.href = href;
	};
	return (
		<button
			className={`mt-2 w-[341px] h-[69px] flex items-center justify-between rounded-lg
			 overflow-hidden  p-2 mb-[10px]`}
			onClick={handleClick}
			aria-label="Navigate to game">
			<div className='flex items-center justify-between '>
				<Image className="bg-white  w-[53px] h-[53px] rounded-full" src={href} alt="Profile Image" width={53} height={53} />
				<div />
				<div className="flex items-start flex-col max-w-[80px]">
					<div className="ml-[10px]  text-white truncate text-[18px] font-bold">{name}</div>
					<div className={`ml-[10px]  text-[#878787] text-[12px] truncate font-medium`}>Level {String(number)}</div>
				</div>
			</div>
			{number && (
				<div
					className={`flex-row items-center rounded-[4px]  bg-[#FF3D00] w-[87px] h-[27px]`}>
					<div className='flex items-center justify-between ml-2 mx-auto text-white text-[16px] font-medium"'> <InviteIcon /> <div />
						<div className=" flex items-center justify-between mx-auto text-white text-[16px] font-medium"> Invite </div>
					</div>
				</div>

			)}

		</button>
	);
};
function OnlinePlayers() {
	const [ViewALlClicked, setViewALlClicked] = useState(false);
	const handleViewAll = () => {
		setViewALlClicked(!ViewALlClicked);
	};
	return (
		<div className='relative h-full' >
			<FilterBtn name='Online Players' />
			{!AllOnlinePlayers.length ? 
				<div className="flex h-[320px] w-full justify-center items-center">
					<Empty text="no Online Players are available right now"/>
				</div> 
				:
				<div className={`${ViewALlClicked
					? "h-[308px] overflow-y-scroll hide-scrollbar"
					: "h-[308px] "
					}`}>
					{AllOnlinePlayers.map((item, index) => (
						<div>
							<PlayersContainer
								key={index}
								name={item.name}
								href={item.href}
								number={item.number}
							/>
						</div>
					)).slice(0, ViewALlClicked ? AllOnlinePlayers.length : 4)}
					{AllOnlinePlayers.length > 4 && (
					<div className="w-full absolute bottom-0" onClick={handleViewAll}>
						<div className="w-full grid place-content-center">
							<div className='flex flex-row items-center justify-center'>
								<button className="flex  flex-row  rounded-[4px] bg-[#444444] p-2 h-[28px] min-w-[73px] ">
									<div className="flex flex-row max-w-[80px] items-center justify-between mx-auto">
										<div className="font-semibold text-[#A5A5A5] tracking-[.025] text-[10px]">{ViewALlClicked ? "SHOW LESS" : "VIEW ALL"}</div>
									</div>
								</button>
							</div>
						</div>
					</div>
				)}
				</div>
			}
		</div>
	);
}

export default OnlinePlayers;
