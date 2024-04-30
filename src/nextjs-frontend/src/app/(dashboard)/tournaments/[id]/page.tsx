import React from "react";
import Image from "next/image";
import Link from "next/link";
import { user } from "@/type/auth/user";
import clsx from "clsx";

const BracketData = [
	[
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "aaitouna",
				level: 50,
			},
		},
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "ooussama",
				level: 100,
			},
		},
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "aaitouna",
				level: 50,
			},
		},
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "ooussama",
				level: 100,
			},
		},
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "aaitouna",
				level: 50,
			},
		},
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "ooussama",
				level: 100,
			},
		},
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "aaitouna",
				level: 50,
			},
		},
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "ooussama",
				level: 100,
			},
		},
	],
	[
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "aaitouna",
				level: 50,
			},
		},
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "ooussama",
				level: 100,
			},
		},
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "aaitouna",
				level: 50,
			},
		},
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "ooussama",
				level: 100,
			},
		},
	],
	[
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "aaitouna",
				level: 50,
			},
		},
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "ooussama",
				level: 100,
			},
		},
	],
	[
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "aaitouna",
				level: 50,
			},
		},
	],
	[
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "aaitouna",
				level: 50,
			},
		},
	],
	[
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "aaitouna",
				level: 50,
			},
		},
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "ooussama",
				level: 100,
			},
		},
	],
	[
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "aaitouna",
				level: 50,
			},
		},
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "ooussama",
				level: 100,
			},
		},
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "aaitouna",
				level: 50,
			},
		},
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "ooussama",
				level: 100,
			},
		},
	],
	[
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "aaitouna",
				level: 50,
			},
		},
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "ooussama",
				level: 100,
			},
		},
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "aaitouna",
				level: 50,
			},
		},
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "ooussama",
				level: 100,
			},
		},
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "aaitouna",
				level: 50,
			},
		},
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "ooussama",
				level: 100,
			},
		},
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "aaitouna",
				level: 50,
			},
		},
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "ooussama",
				level: 100,
			},
		},
	],
];

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

const StreamingCard = ({
	user1,
	user2,
}: {
	user1: Partial<user>;
	user2: Partial<user>;
}) => {
	const ProfileImage = ({
		className,
		image_url,
	}: {
		className?: string;
		image_url?: string;
	}) => {
		return (
			<div className={className}>
				<Image
					src={image_url || ""}
					alt='profile'
					layout='fill'
					objectFit='cover'
				/>
			</div>
		);
	};

	const UserDetails = ({ name, level }: { name?: string; level?: number }) => {
		return (
			<div className='flex flex-col items-start justify-center capitalize max-w-20'>
				<div
					className='font-bold text-lg tracking-tight max-w-20 truncate'
					title={name}>
					{name}
				</div>
				<div className='text-secondary-100 text-sm truncate font-normal tracking-tight'>
					Level <span>{level}</span>
				</div>
			</div>
		);
	};
	return (
		<div className='flex flex-row items-center justify-between w-full h-20 px-3 py-4 bg-secondary-300 rounded-lg'>
			<div className='flex flex-row gap-2 items-center'>
				<div className='flex flex-row items-center justify-center flex-nowrap'>
					<ProfileImage
						image_url={user1.image_url}
						className='relative w-12 h-12  rounded-full border border-[#A2A2A2] overflow-hidden '
					/>
					<ProfileImage
						image_url={user2.image_url}
						className='relative w-12 h-12 ml-[-20px] rounded-full border border-[#A2A2A2] overflow-hidden'
					/>
				</div>
				<UserDetails name={user1.username} level={user1.level} />
				<p className='text-md font-bold'>VS</p>
				<UserDetails name={user2.username} level={user2.level} />
			</div>
			<Image
				src='/assets/icons/ArrowRight.svg'
				alt='play'
				className='w-5 aspect-square'
				width={20}
				height={20}
			/>
		</div>
	);
};

function StateTable() {
	return <></>;
}

const Bracket = () => {
	const BracketCard = ({
		player1,
		player2,
		lefted = true,
	}: {
		player1?: Partial<user>;
		player2?: Partial<user> | null;
		lefted?: boolean;
	}) => {
		return (
			<>
				<div
					className={clsx(
						"h-10 bg-secondary-500 rounded-bl-sm rounded-br-sm px-2 py-3 flex flex-row items-center justify-start gap-2",
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
							objectFit='cover'
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
	return (
		<div className='flex flex-row gap-4 p-3 overflow-scroll max-h-full hide-scrollbar'>
			{BracketData.map((data, index) => (
				<ul className='flex-1 flex flex-col items-start justify-center gap-4'>
					{data.map((_, index) => (
						<BracketCard
							player1={{
								image_url: "/assets/images/profile.jpg",
								username: "aaitouna",
								level: 50,
							}}
						/>
					))}
				</ul>
			))}
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
			<div className='w-full h-[28.5rem] flex flex-row gap-5'>
				<div className='rounded-xl bg-secondary-400 flex-1 '>
					<Bracket />
				</div>
				<div className='rounded-xl bg-secondary-400 w-96 p-3 flex flex-col gap-5'>
					<div className='flex flex-row items-center justify-between w-full'>
						<h6 className='text-lg font-bold text-white'>Streaming</h6>
						<FilterButton />
					</div>
					<ul className='flex flex-col items-center justify-start w-full gap-4 overflow-y-scroll hide-scrollbar'>
						{Array.from({ length: 5 }).map((_, index) => (
							<Link className='w-full' href={`/game?streaming=${index}`}>
								<StreamingCard
									user1={{
										image_url: "/assets/images/profile.jpg",
										username: "aaitouna",
										level: 50,
									}}
									user2={{
										image_url: "/assets/images/profile.jpg",
										username: "ooussama",
										level: 100,
									}}
								/>
							</Link>
						))}
					</ul>
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
				<div className='w-full flex-1 flex flex-col justify-center items-center gap-5'>
					<Image
						src='/assets/icons/empty.svg'
						alt='empty'
						width={50}
						height={50}
					/>
					<p className='capitalize text-xs text-secondary-100'>
						no Game are available right now
					</p>
				</div>
				<StateTable />
			</div>
		</div>
	);
};

export default page;
