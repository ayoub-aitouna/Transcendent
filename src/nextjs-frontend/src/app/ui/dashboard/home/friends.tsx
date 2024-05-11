'use client'
import React from 'react';
import { FilterBtn } from './content_area/filterBtn';
import { UserContainer } from './content_area/userContainer';
import ViewAll from './content_area/viewAll';
import { AllOnlinePlayers } from '@/constant/dashboard';
import Empty from '../Empty';
import Link from 'next/link';
import styles from "@/app/ui/dashboard/nav/nav.module.css";

function TeamRanking({ }) {
	return (
		<div className='relative h-full w-full'>
			<div className="mb-8 flex items-center justify-between">
				<div className=" text-white  truncate font-bold text-base">Friends</div>
				<button
					className={` ${styles.create_new_trn} flex-row items-center rounded-md  w-[93px] h-[32px]`}>
					<Link href={'/home/all-players'} className={` mx-auto text-white text-xs font-semibold`}> VIEW ALL </Link>
				</button>
			</div>
			<div>
				{!AllOnlinePlayers.length ? (
					<div className="flex h-[320px] w-full justify-center items-center">
						<Empty text="No online players are available right now" />
					</div>
				) : (
					<div>
						{AllOnlinePlayers.slice(0, 4).map((item, index) => (
							<div key={index}>
								<UserContainer
									name={item.name}
									href={item.href}
									number={item.number}
									index={index + 1}
								/>
							</div>
						))}
					</div>
				)}
				<div className='w-full absolute bottom-0'>
					<div className='w-full grid place-content-center'>
						<div
							className='flex flex-row items-center justify-center'>
							<Link href={'/home/friends'}>  <ViewAll /> </Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TeamRanking;
