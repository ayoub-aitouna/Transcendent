'use client'
import React from 'react';
import styles from '@/app/ui/dashboard/nav/nav.module.css'
import { TournamentsContainer } from './content_area/tournamentContainer';
import ViewAll from './content_area/viewAll';
import { tournamentLinks } from '@/constant/dashboard';
import Link from 'next/link';

function Tournaments() {
	return (
		<div className='relative h-full'>
			<div
				className='pb-8 flex items-center justify-between'>
				<div className=' text-white  truncate font-bold text-base'>
					Tournaments
				</div>
				<button
					className={`${styles.create_new_trn} rounded-md w-[165px] h-[35px] text-[12px] font-semibold`}>
					<Link href='/tournaments/createTournament'>
						CREATE TOURNAMENTS
					</Link>
				</button>
			</div>
			<ul className='flex flex-col gap-3'>
				{tournamentLinks.map((item, index) => (
					<TournamentsContainer
						key={index}
						href={item.href}
						name={item.name}
						followers={item.followers}
						SecName={item.secName}
					/>
				))}
			</ul>

			<div className='w-full absolute bottom-0'>
				<div className='w-full grid place-content-end'>
					<div
						className='flex flex-row items-end justify-end'>
						<Link href={'/tournaments'}>  <ViewAll /> </Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Tournaments;
