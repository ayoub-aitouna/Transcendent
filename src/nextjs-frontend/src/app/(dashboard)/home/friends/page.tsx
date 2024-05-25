'use client'

import React, { useState } from 'react'
import Image from 'next/image';
import { AllOnlinePlayers } from '@/constant/dashboard';
import Link from 'next/link';
import RightArrow from '@/app/ui/dashboard/icons/content_area/RightArrow';
import { UsersListWrapper } from '@/app/ui/dashboard/home/content_area/user-list-wrapper';
import Messages from '@/app/ui/dashboard/icons/content_area/messages';
import { useAppSelector } from '@/redux/store';

export function FriendContainer({ name, href, number, id}: {
	name: string;
	href: string;
	number: number;
	id: number;
}) {
	return (
		<button
			className={`mt-2 w-full h-[69px] flex items-center justify-between rounded bg-[#373737] p-4 mb-3`}
		>
			<Link href={`/profile/${id}`}  className='flex items-center justify-between '>
				<Image className="bg-white  w-[53px] h-[53px] rounded-full" src={href} alt="Profile Image" width={53} height={53} />
				<div />
				<div className="flex items-start flex-col max-w-[80px]">
					<div className="ml-[10px]  text-white truncate text-[18px] font-bold">{name}</div>
					<div className={`ml-[10px]  text-[#878787] text-[12px] truncate font-medium`}>Level {String(number)}</div>
				</div>
			</Link>
			<div className={`flex  items-center justify-center `}>
					<Link href={'/messenger'} className=" flex items-center justify-between mx-auto text-white text-[16px] font-medium"> <RightArrow /> </Link>
			</div>
		</button>
	);
}


const page = () => {
	const { friends } = useAppSelector((state) => state.user.user);
	return (
		<div>
			<UsersListWrapper >
				{friends.map((item, index) => (
					<div key={index}>
						<FriendContainer
							name={item.username}
							href={item.image_url}
							number={item.level}
							id={item.id}
						/>
					</div>
				))}
			</UsersListWrapper>
		</div>
	);
};

export default page