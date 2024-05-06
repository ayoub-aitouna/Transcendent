import React from "react";
import Image from "next/image";
import Link from "next/link";
import { user } from "@/type/auth/user";
import clsx from "clsx";
import { BracketData, StreamingData } from "@/constant/dashboard";
import Empty from "@/app/ui/dashboard/Empty";
import {
	ProfileImage,
	UserDetails,
	StreamingCard,
} from "@/app/ui/dashboard/tournament/index";

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

const BracketCard = ({
	player1,
	player2,
	lefted = false,
}: {
	player1?: Partial<user>;
	player2?: Partial<user> | null;
	lefted?: boolean;
}) => {
	return (
		<>
			<div
				className={clsx(
					"h-10 w-fit bg-secondary-500 rounded-bl-sm rounded-br-sm px-2 py-3 flex flex-row items-center justify-start gap-2",
					{
						"rounded-tl-sm rounded-tr-lg": lefted,
						"rounded-tl-lg rounded-tr-sm": !lefted,
					}
				)}>
				<div
					className={
						"relative w-7 h-7  rounded-full border border-[#A2A2A2] overflow-hidden "
					}>
					<Image
						src={player1?.image_url || ""}
						alt='profile'
						layout='fill'
						className='object-cover'
					/>
				</div>
				<div className=''>
					<div
						className='font-bold text-sm tracking-tight max-w-20 truncate'
						title={player1?.username}>
						{player1?.username}
					</div>
					<div className='text-secondary-100 text-xs truncate font-normal tracking-tight'>
						Level <span>{player1?.level}</span>
					</div>
				</div>
			</div>
		</>
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

const Bracket = () => {
	return (
		<div className='flex flex-row justify-between items-center min-h-full gap-4 p-3 '>
			<div className='flex-1 h-full flex flex-row gap-4'>
				{BracketData.map((data, index) => (
					<ul className='flex-1 flex flex-col items-start justify-around gap-4 lead-to-parent'>
						{data.map((_, index) => (
							<li
								key={index}
								className='w-full grid place-content-center relative lead lead-to'>
								<BracketCard
									lefted
									player1={{
										image_url: "/assets/images/profile.jpg",
										username: "aaitouna",
										level: 50,
									}}
								/>
							</li>
						))}
					</ul>
				))}
			</div>
			<div className='h-full grid place-content-center'>
				<h6 className='text-xl font-bold'>VS</h6>
			</div>
			<div className='flex-1 h-full flex flex-row-reverse gap-4'>
				{BracketData.map((data, index) => (
					<ul className='flex-1 flex flex-col items-start justify-around gap-4 lead-to-parent'>
						{data.map((_, index) => (
							<li
								key={index}
								className='w-full grid place-content-center relative lead lead-to-left'>
								<BracketCard
									player1={{
										image_url: "/assets/images/profile.jpg",
										username: "aaitouna",
										level: 50,
									}}
								/>
							</li>
						))}
					</ul>
				))}
			</div>
		</div>
	);
};

const page = () => {
	return (
		<div className='h-full w-full flex flex-col gap-5'>
			<div className='w-full rounded-xl bg-secondary-400 h-24 flex flex-row items-center justify-between p-3'>
				<div className='flex flex-row gap-4'>
					<Image
						className='rounded-md overflow-hidden'
						src={"/assets/images/valorantlogo.png"}
						alt='tournement Image'
						width={73}
						height={73}
					/>
					<div className='w-full flex flex-col items-start justify-center '>
						<div className='font-bold text-lg tracking-tight'>
							Valorant VCT cup 2024
						</div>
						<div className='text-secondary-100 text-sm truncate font-normal tracking-tight'>
							Valorant
						</div>
					</div>
				</div>
				<div className='flex flex-col items-start justify-center '>
					<div className='font-bold text-lg tracking-tight'>64.9k</div>
					<div className='text-secondary-100 text-sm truncate font-normal tracking-tight'>
						Online Players
					</div>
				</div>
			</div>
			<div className='w-full xl:h-[28.5rem] flex flex-col xl:flex-row gap-5  '>
				<div className='rounded-xl bg-secondary-400 flex-1 max-h-full  overflow-scroll  hide-scrollbar'>
					<Bracket />
				</div>
				<div className='rounded-xl bg-secondary-400 w-full xl:w-96 p-3 flex flex-col gap-5 '>
					<div className='flex flex-row items-center justify-between w-full'>
						<h6 className='text-lg font-bold text-white'>Streaming</h6>
						<FilterButton />
					</div>
					{StreamingData.length !== 0 && (
						<ul className='flex flex-col items-center justify-start w-full gap-4 overflow-y-scroll hide-scrollbar'>
							{StreamingData.map((data, index) => (
								<Link
									key={index}
									className='w-full'
									href={`/game?streaming=${index}`}>
									<StreamingCard user1={data.user1} user2={data.user2} />
								</Link>
							))}
						</ul>
					)}
					{StreamingData.length === 0 && (
						<Empty text='no Game are available right now' />
					)}
					<button className='self-center h-10 bg-primary px-3 py-2 rounded-sm'>
						<p className='flex flex-row uppercase'>
							Register Now - <span className='ml-1 lowercase'> 1h32m</span>
						</p>
					</button>
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
