"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TournamentsContainer } from "@/app/ui/dashboard/home/content_area/tournamentContainer";
import { tournamentLinks } from "@/constant/dashboard";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import clsx from "clsx";
import Empty from "@/app/ui/dashboard/Empty";
import { StreamingCard } from "@/app/ui/dashboard/tournament/index";
import {
	StreamingData,
	TopAchievementsList,
	UserInfoList,
} from "@/constant/dashboard";
import { AchievementCard } from "@/app/ui/dashboard/profile/AchievementCard";
import { Achievement } from "@/type/dashboard";
import { useToast } from "@/app/provider/ToastProvider";
const HistoryWrapper = ({
	children,
	title,
}: {
	children?: Readonly<React.ReactNode>;
	title: string;
}) => {
	return (
		<div
			className='flex-1 w-full xl:w-1/3 flex flex-col items-start justify-start gap-3 p-2 min-h-[20rem]
						h-full rounded-lg bg-secondary-400'>
			<h6 className='text-xl font-bold tracking-tight p-2 uppercase'>
				{title}
			</h6>
			<div className='w-full h-ful max-h-full overflow-y-scroll hide-scrollbar p-2'>
				{StreamingData.length !== 0 && (
					<ul className='flex  flex-col gap-3 items-center justify-start w-full h-full'>
						{children}
					</ul>
				)}
				{StreamingData.length === 0 && (
					<Empty text='no Game are available right now' />
				)}
			</div>
		</div>
	);
};

const Cta = ({
	src,
	title,
	visible = true,
	style = "text-secondary-100",
	height = 24,
	width = 24,
}: {
	src: string;
	title: string;
	style?: string;
	visible?: boolean;
	height?: number;
	width?: number;
}) => {
	const { addToast } = useToast();
	const handleClick = () => {
		addToast({
			id: Math.floor(Math.random() * 100),
			title: "Friend Request",
			message: "ooussama invited you into a Ping-pong game",
			icon: "/assets/icons/light_close.png",
			backgroundColor: "bg-blue-500",
		});
	};
	if (!visible) return null;
	return (
		<button
			onClick={() => {
				handleClick();
			}}
			className='w-[200px] h-[44px] bg-[#323232] rounded
											flex flex-row justify-center items-center gap-2 p-3'>
			<Image
				src={src}
				width={height}
				height={width}
				alt='profile background image'
				className='object-cover'
			/>
			<p className={clsx("text-base font-bold tracking-widest", style)}>
				{title}
			</p>
		</button>
	);
};

const UserInfo = ({ src, value }: { src: string; value: string }) => {
	return (
		<li className='flex w-full flex-row items-start justify-start gap-3 px-5 '>
			<Image
				src={src}
				width={24}
				height={24}
				alt='userInfo Icon'
				className='object-cover'
			/>
			<p className='text-secondary-100 text-base font-semibold tracking-tight'>
				{value}
			</p>
		</li>
	);
};

const TopAchievementsItem = ({ achievement }: { achievement: Achievement }) => {
	return (
		<li className='w-[160px] h-[154px] flex flex-col items-center justify-center gap-4 bg-secondary-500/60 px-3 py-5 rounded-xl'>
			<Image
				src={achievement.icon}
				width={80}
				height={80}
				alt='userInfo Icon'
				className='object-cover'
			/>
			<h6 className='text-white text-sm font-bold tracking-tight max-w-full truncate'>
				{achievement.name}
			</h6>
		</li>
	);
};

const page = () => {
	const user = useAppSelector((state) => state.user);
	const pathname = usePathname();
	console.log("User", user.user);
	console.log("pathname", pathname);
	return (
		<div className='flex flex-col justify-start items-start  h-full gap-10'>
			<div className='relative min-h-[21.8rem] w-full rounded-lg overflow-hidden'>
				<Image
					src='/assets/images/profile-bg.jpg'
					fill
					alt='profile background image'
					className='w-full h-full object-cover'
				/>
				<div className='absolute top-0 left-0 w-full h-full bg-secondary-400/80'></div>
				<div className='absolute top-0 left-0 w-full h-full p-3'>
					<div className='flex flex-row gap-5 w-full h-full'>
						<div className='flex flex-col justify-between h-full w-[200px]'>
							<div className='flex-1 flex justify-center items-center overflow-hidden'>
								<div className='relative w-52 aspect-square rounded-full  border border-white '>
									<Image
										src='/assets/images/profile.jpg'
										alt='profile background image'
										fill
										className='w-full h-full object-cover rounded-full'
									/>
								</div>
							</div>
							<div className='flex flex-col gap-3 pb-[2px] justify-between'>
								<div className='flex flex-col px-3'>
									<h6 className='font-black text-xl  text-white'>
										Ayoub Aitouna
									</h6>
									<p className='text-base font-semibold text-secondary-100'>
										@Aaitouna
									</p>
								</div>
								<Cta
									src='/assets/icons/add-fill.png'
									title='Add Friend'
									height={20}
									width={20}
									style='text-white text-sm font-medium tracking-tighter'
									visible={pathname !== "/profile"}
								/>
							</div>
						</div>
						<div className='flex-1 flex flex-row h-full gap-3'>
							<div className='flex-1 h-full flex flex-col gap-3'>
								<div className='flex-1 flex flex-row gap-3'>
									<div className='w-full lg:w-96 h-full flex flex-col rounded-lg bg-secondary-400/80 p-3'>
										<h6 className='text-lg font-black tracking-tighter text-secondary-100'>
											RANK
										</h6>
										<div className='flex-1 w-full flex flex-col gap-3 items-center justify-center'>
											<Image
												src='/assets/icons/Gold_3_Rank.png'
												width={121.13}
												height={150}
												alt='userInfo Icon'
												className='object-cover'
											/>
											<p className='text-[#E5B906] text-lg font-black tracking-widest'>
												GOLD III
											</p>
										</div>
									</div>
									<div className='flex-1 h-full hidden lg:flex flex-col rounded-lg bg-secondary-400/80 p-3'>
										<h6 className='text-lg font-black tracking-tighter text-secondary-100'>
											TOP ACHIEVEMENTS
										</h6>
										<ul className='flex-1 flex flex-row h-full items-center justify-center gap-4 top-achievement-list'>
											{TopAchievementsList.map((item, index) => (
												<TopAchievementsItem key={index} achievement={item} />
											))}
											{TopAchievementsList.length === 0 && (
												<Empty text='No Achievements Are Available Right Now' />
											)}
										</ul>
									</div>
								</div>
								<div className='w-full h-12 relative rounded-md bg-secondary-400 overflow-hidden'>
									<div className='w-[70%] h-full'>
										<div className=' loading-progress-bar h-full rounded-md bg-primary flex justify-center items-center overflow-hidden'>
											<h6 className='font-semibold text-lg text-white uppercase'>
												15,987 XP
											</h6>
										</div>
									</div>

									<div className='absolute right-0 top-0 bottom-0'>
										<div className='h-full grid place-content-center p-2'>
											<h6 className='font-semibold'>70%</h6>
										</div>
									</div>
								</div>
							</div>
							<div className='w-80  h-full hidden xl:flex flex-col bg-secondary-400 rounded-lg p-3 gap-3'>
								<ul className='flex-1 flex flex-col gap-4 justify-center items-center'>
									{UserInfoList.map((item, index) => (
										<UserInfo key={index} src={item.src} value={item.value} />
									))}
								</ul>
								<div className='flex items-center justify-center w-full p-3'>
									<Cta
										src='/assets/icons/fluent_games.png'
										title='Invite'
										visible={pathname !== "/profile"}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='flex-1 flex w-full flex-col xl:flex-row items-center justify-center xl:max-h-[34rem] gap-5'>
				<HistoryWrapper title='tournament History'>
					{tournamentLinks.map((item, index) => (
						<li key={index} className='w-full '>
							<TournamentsContainer
								key={index}
								href={item.href}
								name={item.name}
								followers={item.followers}
								SecName={item.secName}
							/>
						</li>
					))}
				</HistoryWrapper>
				<HistoryWrapper title='Match History'>
					{StreamingData.map((data, index) => (
						<Link
							key={index}
							className='w-full'
							href={`/game?streaming=${index}`}>
							<StreamingCard user1={data.user1} user2={data.user2} />
						</Link>
					))}
				</HistoryWrapper>
				<HistoryWrapper title='Last Achievements'>
					{TopAchievementsList.map((item, index) => (
						<AchievementCard key={index} achievement={item} />
					))}
				</HistoryWrapper>
			</div>
		</div>
	);
};

export default page;
