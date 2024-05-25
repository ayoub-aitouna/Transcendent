"use client";

import React from "react";
import Image from "next/image";
import clsx from "clsx";
import Empty from "@/app/ui/dashboard/component/Empty";
import Link from "next/link";
import { Achievement } from "@/type/dashboard";
import { useToast } from "@/app/provider/ToastProvider";
import { user } from "@/type/auth/user";

const Cta = ({
	src,
	title,
	visible = true,
	style = "text-secondary-100",
	height = 24,
	width = 24,
	onClick,
}: {
	src: string;
	title: string;
	style?: string;
	visible?: boolean;
	height?: number;
	width?: number;
	onClick?: () => void;
}) => {
	if (!visible) return null;
	return (
		<button
			onClick={onClick}
			className='w-[200px] h-[44px] bg-[#323232] rounded flex flex-row justify-center
					items-center gap-2 p-3'>
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

const UserInfoContainer = ({
	isOtherUser,
	data,
}: {
	isOtherUser: boolean;
	data: user;
}) => {
	const UserInfoList = [
		{
			src: "/assets/icons/fluent_games.png",
			value: "Unavailable",
		},
		{
			src: "/assets/icons/email.png",
			value: data.email,
		},
		{
			src: "/assets/icons/money-recive.svg",
			value: `${data.coins} Coins`,
		},
		{
			src: "/assets/icons/connected.png",
			value: data.status,
		},
	];

	return (
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
					visible={data.is_friend}
				/>
			</div>
		</div>
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

const Header = ({
	data,
	isOtherUser,
}: {
	data: user;
	isOtherUser: boolean;
}) => {
	const { addToast } = useToast();
	function handleAddFriend() {
		addToast({
			id: Math.floor(Math.random() * 100),
			title: "Friend Request Sent",
			message: "you Have sent a friend request to " + data.username,
			icon: "/assets/icons/light_close.png",
			backgroundColor: "bg-blue-500",
		});
	}

	return (
		<div className='relative min-h-[21.8rem] w-full rounded-lg overflow-hidden'>
			<Image
				src={data.image_url || "/assets/images/profile.jpg"}
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
									src={data.image_url || "/assets/images/profile.jpg"}
									alt='profile background image'
									fill
									className='w-full h-full object-cover rounded-full'
								/>
							</div>
						</div>
						<div className='flex flex-col gap-3 pb-[2px] justify-between'>
							<div className='flex flex-col px-3'>
								<h6 className='font-black text-xl  text-white'>
									{data.fullname ? data.fullname : data.username}
								</h6>
								<p className='text-base font-semibold text-secondary-100'>
									@{data.username}
								</p>
							</div>
							{data.is_friend && (
								<Link href={`/messenger?chatroom=${data.id}`}>
									<Cta
										src={"/assets/icons/message-filled.svg"}
										title={"Send Message"}
										height={20}
										width={20}
										style='text-secondary-100 text-sm font-medium tracking-tighter'
										visible
									/>
								</Link>
							)}
							{!data.is_friend && isOtherUser && (
								<Cta
									src='/assets/icons/add-fill.svg'
									title={"Add Friend"}
									height={20}
									onClick={() => {
										handleAddFriend();
									}}
									width={20}
									style='text-secondary-100 text-sm font-medium tracking-tighter'
									visible
								/>
							)}
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
											src={data.rank?.icon || "/assets/icons/unranked.png"}
											width={121.13}
											height={150}
											alt={`${data.rank?.name} Icon`}
											className='object-cover'
										/>
										<p
											className={clsx("text-lg font-black tracking-widest", {
												"text-secondary-100": !data?.rank,
												"text-primary": data?.rank,
											})}>
											{data.rank?.name || "Unranked"}
										</p>
									</div>
								</div>
								<div className='flex-1 h-full hidden lg:flex flex-col rounded-lg bg-secondary-400/80 p-3'>
									<h6 className='text-lg font-black tracking-tighter text-secondary-100'>
										TOP ACHIEVEMENTS
									</h6>
									<ul className='flex-1 flex flex-row h-full items-center justify-center gap-4 top-achievement-list'>
										{data.achievements?.slice(0, 3).map((item, index) => (
											<TopAchievementsItem key={index} achievement={item} />
										))}
										{!data.achievements?.length && (
											<Empty text='No Achievements Are Available Right Now' />
										)}
									</ul>
								</div>
							</div>
							<div className='w-full h-12 relative rounded-md bg-secondary-400 overflow-hidden'>
								<div
									className='h-full'
									style={{
										width: `${data.rankProgressPercentage}%`,
									}}>
									<div className=' loading-progress-bar h-full rounded-md bg-primary flex justify-center items-center overflow-hidden'>
										<h6 className='font-semibold text-lg text-white uppercase'>
											{data.rankProgressPercentage}%
										</h6>
									</div>
								</div>

								<div className='absolute right-0 top-0 bottom-0'>
									<div className='h-full grid place-content-center p-2'>
										<h6 className='font-semibold'>{data.current_xp} XP</h6>
									</div>
								</div>
							</div>
						</div>
						<UserInfoContainer isOtherUser={isOtherUser} data={data} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
