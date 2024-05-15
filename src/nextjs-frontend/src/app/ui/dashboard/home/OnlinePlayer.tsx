'use client'

import React, { useState, useEffect } from "react";
import { FilterBtn } from './content_area/filterBtn';
import Image from 'next/image';
import styles from '@/app/ui/dashboard/nav/nav.module.css'
import ViewAll from './content_area/viewAll';
import { AllOnlinePlayers } from "@/constant/dashboard";
import Empty from "../Empty";
import InviteIcon from "../icons/invite";
import Link from "next/link";



export function PlayersContainer({ name, href, number }: {
	name: string;
	href: string;
	number: Number;
}) {


	return (
		<button
			className={`mt-2 w-[341px] h-[69px] flex items-center justify-between rounded-lg bg-[#373737] overflow-hidden  p-2 mb-[10px]`}>
			<div className='flex items-center justify-between '>
				<Image className="bg-white  w-[53px] h-[53px] rounded-full" src={href} alt="Profile Image" width={53} height={53} />
				<div />
				<div className="flex items-start flex-col max-w-[80px]">
					<div className="ml-[10px]  text-white truncate text-[18px] font-bold">{name}</div>
					<div className={`ml-[10px]  text-[#878787] text-[12px] truncate font-medium`}>Level {String(number)}</div>
				</div>
			</div>

			<Link href={`/making-machine?player=${name}`}
				className={`flex-row items-center rounded-[4px]  bg-[#FF3D00] w-[87px] h-[27px]`}>
				<div className='flex items-center justify-between ml-2 mx-auto text-white text-[16px] font-medium"'> <InviteIcon /> <div />
					<div className=" flex items-center justify-between mx-auto text-white text-[16px] font-medium"> Invite </div>
				</div>
			</Link>

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
					<Empty text="no Online Players are available right now" />
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
											<div className="font-semibold text-[#A5A5A5] tracking-[.025] text-[10px]">{ViewALlClicked ? "SHOW LESS" : "VIEW MORE"}</div>
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
