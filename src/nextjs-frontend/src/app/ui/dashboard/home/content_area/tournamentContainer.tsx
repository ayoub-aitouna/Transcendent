"use client";
import Image from "next/image";
import RightArrow from "../../icons/content_area/right-arrow";
import { TournamentType } from "@/type/dashboard/players";
import { Tournament } from "@/type/dashboard/tournament";


export function TournamentsContainer(Tournaments: Partial<Tournament>) {
	return (
		<div
			className={` w-full bg-[#373737] h-[97px] flex items-center justify-between rounded-lg overflow-hidden  p-2 cursor-pointer`}
			aria-label='Navigate to game'>
			<div className='flex items-center justify-between w-full '>
				<Image
					className=''
					src={Tournaments.icon || "https://placehold.co/400x400.png"}
					alt='Profile Image'
					width={73}
					height={73}
				/>
				<div />
				<div className='w-full flex items-start flex-col'>
					<div className='pl-[15px]  font-bold text-[18px] w-[300px] truncate '>{Tournaments.name}</div>
					<div
						className={`pl-[15px] text-[#878787] w-[300px] text-xs truncate font-normal`}>
						{Tournaments.description}
					</div>
				</div>
			</div>
			<div className='flex flex-row'>
				<div className='flex flex-row justify-end w-full h-10'>
					<div className={`flex flex-col items-start pr-12`}>
						<div className='font-bold text-[18px]'>{Tournaments.max_players || 0}</div>
						<div className={`text-[#878787] text-xs truncate font-normal`}>
							{" "}
							Max Players
						</div>
					</div>
					<div className='flex flex-row items-center justify-center'>
						<RightArrow />
					</div>
				</div>
			</div>
		</div>
	);
}
