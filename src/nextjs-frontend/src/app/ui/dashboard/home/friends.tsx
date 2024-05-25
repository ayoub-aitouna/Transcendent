'use client'
import React from 'react';
import ViewAll from './content_area/viewAll';
<<<<<<< HEAD
import { AllOnlinePlayers } from '@/constant/dashboard';
import Empty from '../component/Empty';
=======
import Empty from '../Empty';
>>>>>>> b7b97233f1e39b91b51e1d771e7e01824d0e52a7
import Link from 'next/link';
import styles from "@/app/ui/dashboard/nav/nav.module.css";
import { FriendContainer } from '@/app/(dashboard)/home/friends/page';
import { useAppSelector } from '@/redux/store';

function Friends({ }) {
	const { friends } = useAppSelector((state) => state.user.user);
	return (
		<div className='relative h-full w-full'>
			<div className="mb-8 flex items-center justify-between">
				<div className=" text-white  truncate font-bold text-base">Friends</div>
				<button
					className={` ${styles.create_new_trn} flex-row items-center rounded-md  w-[93px] h-[32px]`}>
					<Link href={'/home/all-players'} className={` mx-auto text-white text-xs font-semibold`}> ADD MORE </Link>
				</button>
			</div>
			<div>
				{!friends.length ? (
					<div className="flex h-[320px] w-full justify-center items-center">
						<Empty text="No Friends Found" />
					</div>
				) : (
					<div>
						{friends?.slice(0, 4).map((item: { username: string; image_url: string; level: number; id: number; }, index: React.Key | null | undefined) => (
							<div key={index}>
								<FriendContainer
									name={item.username}
									href={item.image_url}
									number={item.level}
									id={item.id}
								/>
							</div>
						))}
					</div>
				)}
				{friends?.length > 4 && (
					<div className='w-full absolute bottom-0'>
						<div className='w-full grid place-content-center'>
							<div
								className='flex flex-row items-center justify-center'>
								<Link href={'/home/friends'}>  <ViewAll /> </Link>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Friends;
