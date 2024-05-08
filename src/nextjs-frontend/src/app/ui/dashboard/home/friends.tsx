'use client'
import React from 'react';
import { FilterBtn } from './content_area/filterBtn';
import { UserContainer } from './content_area/userContainer';
import ViewAll from './content_area/viewAll';
import { AllOnlinePlayers } from '@/constant/dashboard';
import Empty from '../Empty';
import Link from 'next/link';

function TeamRanking({ }) {
	return (
		<div className='relative h-full'>
			<FilterBtn name='Friends' />
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
							<Link href={'/tournaments'}>  <ViewAll /> </Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TeamRanking;
