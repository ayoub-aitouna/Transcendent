"use client";

import Image from "next/image";
import { Rank } from "../icons/content_area/rank";
import Coins from "../icons/content_area/coins";
import Messages from "../icons/content_area/messages";
import Link from "next/link";
import ChartComponent from "./content_area/chartComponent";
import { useAppSelector } from "@/redux/store";

import { RankLogs } from "@/type/auth/user";
import { getRankLogs } from "@/api/user";
import { useEffect, useState } from "react";
import Empty from "../component/Empty";
import { ImageSrc } from "@/lib/ImageSrc";
import { GetChatRoomsData, roomItem } from "@/api/chat";

function TeamLeader() {
	const user = useAppSelector((state) => state.user);
	const { fullname, username, image_url, current_xp, rank, coins } = user.user;
	const [charData, setChartData] = useState<RankLogs[]>([]);
	const [rooms, setRooms] = useState<roomItem[]>([]);

	const getPlayerProgress = async () => {
		try {
			const data = await getRankLogs();
			setChartData(data);
		} catch (error) {}
	};
	useEffect(() => {
		getPlayerProgress();
	}, []);

	useEffect(() => {
		const fetchRooms = async () => {
			try {
				const room = await GetChatRoomsData("", false);
				setRooms(room);
			} catch (e) {
				console.log("ERROR in fetching rooms data: ", e);
			}
		};
		fetchRooms();
	}, []);
	return (
		<div className=''>
			<Link href={"/profile"} className='pt-4 flex items-center'>
				<Image
					className='rounded-full overflow-hidden bg-white w-[62px] h-[62px]'
					src={ImageSrc(image_url, username)}
					alt='Profile Image'
					width={150}
					height={150}
					quality={100}
					loading='lazy'
				/>
				<div className='flex flex-col ml-5'>
					<div className=' text-white  font-bold text-[18px] tracking-tight	'>
						{fullname || username}
					</div>
					<div className='font-light mt-[2px] text-[#A1A1A1] text-[14px]'>
						Your Status{" "}
					</div>
				</div>
			</Link>
			<div className=' mt-10 h-[12px] text-white font-light text-sx flex justify-between">'>
				<div className=' text-[10px] font-light'>{rank?.name}</div>
				<div className='ml-auto text-[10px] font-light'>
					{current_xp}/{rank?.xp_required}
				</div>
			</div>
			<div className='mt-5 h-[161px] w-full flex justify-center items-center'>
				{charData.length === 0 && (
					<Empty text="you don't have progress data Yet !" />
				)}
				{charData.length !== 0 && <ChartComponent inputData={charData} />}
			</div>
			<div className='mt-5'>
				<div className='flex flex-row justify-between items-center'>
					<div
						className={` flex items-center justify-between rounded w-1/2 overflow-hidden  bg-[#323232] p-2 h-[44px] mb-[10px]`}>
						<div className='flex items-center justify-between  '>
							{" "}
							<Rank /> <div />
							<div className='flex items-center justify-between ml-2'>
								<div className='text-white  text-[12px] font-medium'>Rank</div>
							</div>
						</div>
						<div className='flex items-center justify-end'>
							<div className='bg-[#434343] rounded dark:text-white'>
								<div className='ml-3 mr-3 font-medium text-[12px]'>
									{rank?.hierarchy_order || 0}
								</div>
							</div>
						</div>
					</div>
					<div
						className={` flex items-center justify-between rounded w-1/2 overflow-hidden bg-[#323232] p-2 ml-2 h-[44px] mb-[10px]`}>
						<div className='flex items-center justify-between  '>
							{" "}
							<Coins /> <div />
							<div className='flex items-center justify-between'>
								<div className='text-white text-[12px] font-medium ml-2'>
									Coins
								</div>
							</div>
						</div>
						<div className='flex items-center justify-end'>
							<div className='bg-[#434343] rounded dark:text-white'>
								<div className='ml-3 mr-3 font-medium  text-[12px]'>
									{coins || 0}
								</div>
							</div>
						</div>
					</div>
				</div>
				<Link
					href='/messenger'
					className={` flex items-center justify-between rounded w-full overflow-hidden bg-[#323232] p-2 h-[44px] mb-[10px]`}>
					<div className='flex items-center justify-between'>
						{" "}
						<Messages /> <div />
						<div className='text-white  text-[12px] font-medium ml-2'>
							Messages
						</div>
					</div>
					<div className='flex items-center justify-end'>
						<div className='bg-[#434343] rounded dark:text-white'>
							<div className='ml-3 mr-3 font-medium  text-[12px]'>
								{(rooms && rooms[0] && rooms[0].all_messages_count) || 0}
							</div>
						</div>
					</div>
				</Link>
			</div>
			<div></div>
		</div>
	);
}

export default TeamLeader;
