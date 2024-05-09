'use client'

import React, { useState } from 'react'
import Image from 'next/image';
import { AllOnlinePlayers } from '@/constant/dashboard';
import Link from 'next/link';
import { UsersListWrapper } from '@/app/ui/dashboard/home/content_area/user-list-wrapper';




export function BlocksContainer({ name, href, number}: {
	name: string;
	href: string;
	number: number;
}) {
	const [clicked, setClicked] = useState(false);

	const handleClicked = () => {
		setClicked(!clicked);
		<Link href='/home'></Link>
	};
	return (
		<button
			className={`mt-2 w-full h-[69px] flex items-center justify-between rounded bg-[#373737] p-4 mb-5`}
		>
			<div className='flex items-center justify-between '>
				<Image className="bg-white  w-[53px] h-[53px] rounded-full" src={href} alt="Profile Image" width={53} height={53} />
				<div />
				<div className="flex items-start flex-col max-w-[80px]">
					<div className="ml-[10px]  text-white truncate text-[18px] font-bold">{name}</div>
					<div className={`ml-[10px]  text-[#878787] text-[12px] truncate font-medium`}>Level {String(number)}</div>
				</div>
			</div>
			<div className={`flex  items-center justify-center rounded-[4px]  bg-[#FD4106] w-[108px] h-[35px]`} onClick={() => handleClicked()}>
				{clicked ?
					<Link href={'/home'} className=" flex items-center justify-between mx-auto text-white text-[16px] font-medium"> block </Link>
						:
					<div className=" flex items-center justify-between mx-auto text-white text-[16px] font-medium"> Unblock </div>
				}
			</div>

		</button>
	);
}


const page = () => {

	return (
		<div>
			<UsersListWrapper >
				{AllOnlinePlayers.map((item, index) => (
					<div key={index}>
						<BlocksContainer
							name={item.name}
							href={item.href}
							number={item.number}
						/>
					</div>
				))}
			</UsersListWrapper>
		</div>
	);
};

export default page