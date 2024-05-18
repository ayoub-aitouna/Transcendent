"use client";
import { useDragToScroll } from "@/hooks/drag-to-scroll";
import { user } from "@/type/auth/user";
import { Brackets } from "@/type/dashboard/tournament";
import clsx from "clsx";
import Image from "next/image";
import { useRef } from "react";
const RoundList = (
	list: Brackets[],
	size: number,
	round_number?: number
): Brackets[] => {
	if (!list) list = [];
	for (let i = list.length; i < size; i++) {
		list.push({
			player: {},
			round_number: round_number || -1,
		});
	}
	return list;
};

const get_max_round = (max_player: number) => {
	let count = 0;
	let result = max_player;
	while (true) {
		result = result / 2;
		count++;
		if (result < 1) return count;
	}
};

const processBracketData = (
	data: Brackets[],
	max_players: number
): Brackets[][] => {
	data = RoundList(data, max_players, 1);
	const result: Brackets[][] = [];
	for (let i = 0; i < data.length; i++) {
		const index = (data[i]?.round_number || 1) - 1;
		if (!result[index]) result[index] = [];
		result.at(index)?.push(data[i]);
	}
	for (let i = 1; i < get_max_round(max_players); i++)
		result[i] = RoundList(result[i], max_players / Math.pow(2, i));
	return result;
};

const BracketCard = ({
	player1,
	onLeft = false,
}: {
	player1?: Partial<user>;
	onLeft?: boolean;
}) => {
	if (!player1?.username)
		return (
			<div
				className={clsx(
					"h-10 w-28 bg-secondary-500 rounded-bl-sm rounded-br-sm",
					{
						"rounded-tl-sm rounded-tr-lg": onLeft,
						"rounded-tl-lg rounded-tr-sm": !onLeft,
					}
				)}></div>
		);
	return (
		<>
			<div
				className={clsx(
					"h-10 w-28 bg-secondary-500 rounded-bl-sm rounded-br-sm px-2 py-3 flex flex-row items-center justify-start gap-2",
					{
						"rounded-tl-sm rounded-tr-lg": onLeft,
						"rounded-tl-lg rounded-tr-sm": !onLeft,
					}
				)}>
				<div
					className={
						"relative w-7 h-7  rounded-full border border-[#A2A2A2] overflow-hidden "
					}>
					<Image
						src={player1?.image_url || "/assets/images/profile.jpg"}
						alt='profile'
						layout='fill'
						className='object-cover'
					/>
				</div>
				<div className=''>
					<div
						className='font-bold text-sm tracking-tight max-w-20 truncate'
						title={player1?.username || "User"}>
						{player1?.username || "User"}
					</div>
					<div className='text-secondary-100 text-xs truncate font-normal tracking-tight'>
						Level <span>{player1?.level}</span>
					</div>
				</div>
			</div>
		</>
	);
};

export const Bracket = ({
	data,
	max_players,
}: {
	data?: Brackets[];
	max_players: number;
}) => {
	const ref = useDragToScroll();
	const BracketData = processBracketData(data || [], max_players);
	return (
		<div
			ref={ref}
			className='rounded-xl bg-secondary-400 flex-1 max-h-full tournament-board hide-scrollbar'>
			<div className='flex flex-row justify-between items-center min-h-full gap-4 p-3'>
				<div className='flex-1 h-full flex flex-row gap-6'>
					{BracketData.map((data, index) => (
						<ul
							key={index}
							className='flex-1 w-28 flex flex-col items-start justify-around gap-4 lead-to-parent'>
							{data.map((item, index) => (
								<li
									key={index}
									className='w-full min-w-24 grid place-content-center relative lead lead-to'>
									<BracketCard onLeft player1={item.player} />
								</li>
							))}
						</ul>
					))}
				</div>
				<div className='h-full grid place-content-center'>
					<h6 className='text-xl font-bold'>VS</h6>
				</div>
				<div className='flex-1 h-full flex flex-row-reverse gap-6'>
					{BracketData.map((data, index) => (
						<ul
							key={index}
							className='flex-1 w-28 flex flex-col items-start justify-around gap-4 lead-to-parent'>
							{data.map((item, index) => (
								<li
									key={index}
									className='w-full grid place-content-center relative lead lead-to-left'>
									<BracketCard player1={item.player} />
								</li>
							))}
						</ul>
					))}
				</div>
			</div>
		</div>
	);
};
