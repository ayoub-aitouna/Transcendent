import React from "react";
import Image from "next/image";
import Link from "next/link";
import { user } from "@/type/auth/user";
import clsx from "clsx";
import Empty from "@/app/ui/dashboard/Empty";
import {
	ProfileImage,
	UserDetails,
	StreamingCard,
} from "@/app/ui/dashboard/tournament/index";
import { GetTournamentDetails } from "@/api/Tournament";
import { Brackets, Tournament } from "@/type/dashboard/tournament";
import { CountDownTimerButton } from "@/app/ui/dashboard/tournament/count-down-btn";
import { Bracket } from "@/app/ui/dashboard/tournament/bracket-board";

const getData = async (id: number): Promise<Tournament> => {
	const res = await GetTournamentDetails(id);
	return res;
};

const FilterButton = () => {
	return (
		<button className='bg-secondary-200 rounded-md px-2 py-1'>
			<div className='flex flex-row items-center justify-start gap-3'>
				<Image
					src='/assets/icons/Filter.svg'
					alt='filter'
					className='w-6 aspect-square'
					width={20}
					height={20}
				/>
				<p className='uppercase text-sm tracking-[5%] font-semibold'>filter</p>
			</div>
		</button>
	);
};

function StatusTable() {
	return (
		<div className='w-full overflow-x-scroll hide-scrollbar'>
			<table className='table-auto w-full  '>
				<thead>
					<tr className='border-b border-b-secondary-200 text-[#A2A2A2]'>
						<th className='text-start px-2 py-3'>Players</th>
						<th className='text-start px-2 py-3'>Score</th>
						<th className='text-start px-2 py-3'>Start date</th>
						<th className='text-start px-2 py-3'>Finish date</th>
						<th className='text-start px-2 py-3'>Winner</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className='text-start px-2 py-3'>
							<div className='flex flex-row gap-2 items-center'>
								<div className='flex flex-row items-center justify-center flex-nowrap'>
									<ProfileImage
										image_url='/assets/images/profile.jpg'
										className='relative w-12 h-12  rounded-full border border-[#A2A2A2] overflow-hidden '
									/>
									<ProfileImage
										image_url='/assets/images/profile.jpg'
										className='relative w-12 h-12 ml-[-20px] rounded-full border border-[#A2A2A2] overflow-hidden'
									/>
								</div>
								<UserDetails name={"Aaitouna"} level={30} />
								<p className='text-md font-bold'>VS</p>
								<UserDetails name={"ooussama"} level={150} />
							</div>
						</td>
						<td className='text-start px-2 py-3'>12 : 08</td>
						<td className='text-start px-2 py-3'>
							{new Date().toLocaleString()}
						</td>
						<td className='text-start px-2 py-3'>
							{new Date().toLocaleString()}
						</td>
						<td className='text-start px-2 py-3'>
							<div className='flex flex-row gap-2 items-center'>
								<div className='flex flex-row items-center justify-center flex-nowrap'>
									<ProfileImage
										image_url='/assets/images/profile.jpg'
										className='relative w-12 h-12  rounded-full border border-[#A2A2A2] overflow-hidden '
									/>
								</div>
								<UserDetails name={"Aaitouna"} level={30} />
							</div>
						</td>
					</tr>
					<tr>
						<td className='text-start px-2 py-3'>
							<div className='flex flex-row gap-2 items-center'>
								<div className='flex flex-row items-center justify-center flex-nowrap'>
									<ProfileImage
										image_url='/assets/images/profile.jpg'
										className='relative w-12 h-12  rounded-full border border-[#A2A2A2] overflow-hidden '
									/>
									<ProfileImage
										image_url='/assets/images/profile.jpg'
										className='relative w-12 h-12 ml-[-20px] rounded-full border border-[#A2A2A2] overflow-hidden'
									/>
								</div>
								<UserDetails name={"Aaitouna"} level={30} />
								<p className='text-md font-bold'>VS</p>
								<UserDetails name={"ooussama"} level={150} />
							</div>
						</td>
						<td className='text-start px-2 py-3'>12 : 08</td>
						<td className='text-start px-2 py-3'>
							{new Date().toLocaleString()}
						</td>
						<td className='text-start px-2 py-3'>
							{new Date().toLocaleString()}
						</td>
						<td className='text-start px-2 py-3'>
							<div className='flex flex-row gap-2 items-center'>
								<div className='flex flex-row items-center justify-center flex-nowrap'>
									<ProfileImage
										image_url='/assets/images/profile.jpg'
										className='relative w-12 h-12  rounded-full border border-[#A2A2A2] overflow-hidden '
									/>
								</div>
								<UserDetails name={"Aaitouna"} level={30} />
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

const page = async ({ params }: any) => {
	const { id } = params;
	const result = await getData(id);
	return (
		<div className='h-full w-full flex flex-col gap-5'>
			<div className='w-full rounded-xl bg-secondary-400 h-24 flex flex-row items-center justify-between p-3'>
				<div className='flex flex-row gap-4'>
					<Image
						className='rounded-md overflow-hidden'
						src={result.icon || "https://via.placeholder.com/150/92c952.png"}
						alt={`icon of ${result.name}`}
						width={73}
						height={73}
					/>
					<div className='w-full flex flex-col items-start justify-center '>
						<div className='font-bold text-lg tracking-tight'>
							{result.name}
						</div>
						<div className='text-secondary-100 text-sm truncate font-normal tracking-tight'>
							{result.description}
						</div>
					</div>
				</div>
				<div className='flex flex-col items-start justify-center '>
					<div className='font-bold text-lg tracking-tight'>
						{result.max_players}
					</div>
					<div className='text-secondary-100 text-sm truncate font-normal tracking-tight'>
						Max Players
					</div>
				</div>
			</div>
			<div className='w-full xl:h-[28.5rem] flex flex-col xl:flex-row gap-5  '>
				<Bracket
					data={result.tournament_bracket}
					max_players={result.max_players}
				/>
				<div className='rounded-xl bg-secondary-400 w-full xl:w-96 p-3 flex flex-col gap-5 '>
					<div className='flex flex-row items-center justify-between w-full'>
						<h6 className='text-lg font-bold text-white'>Streaming</h6>
						<FilterButton />
					</div>
					{result.streams.length !== 0 && (
						<ul className='flex flex-col items-center justify-start w-full gap-4 overflow-y-scroll hide-scrollbar'>
							{result.streams.map((data, index) => (
								<Link
									key={index}
									className='w-full'
									href={`/game?streaming=${index}`}>
									<StreamingCard user1={data.player1} user2={data.player2} />
								</Link>
							))}
						</ul>
					)}
					{result.streams.length === 0 && (
						<Empty text='no Game are available right now' />
					)}
					<CountDownTimerButton targetDate={result.start_date} />
				</div>
			</div>
			<div className='rounded-xl bg-secondary-400 flex-1 max-h-[30rem] flex flex-col items-start justify-start px-6 pt-10 pb-4'>
				<div className='w-full'>
					<h6 className='text-lg font-bold'>States</h6>
				</div>
				{/* <Empty /> */}
				<StatusTable />
			</div>
		</div>
	);
};

export default page;
