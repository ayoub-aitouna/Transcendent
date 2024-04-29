'use client'
import React from 'react';
import styles from '@/app/ui/dashboard/nav/nav.module.css'
import { TournamentsContainer } from './content_area/tournamentContainer';
import ViewAll from './content_area/viewAll';
import { tournamentLinks } from '@/constant/dashboard';

function Tournaments() {
	const handleClick = () => {
		window.location.href = '/filter';
	}
	return (
		<div className='relative h-full' >
			<div className="pb-8 flex items-center justify-between" onClick={handleClick} aria-label="Navigate to profile">
				<div className=" text-white  truncate font-bold text-base">Tournaments</div>
				<button className={`${styles.create_new_trn} rounded-md w-[165px] h-[35px] text-[12px] font-semibold`} onClick={handleClick}> CREATE TOURNAMENTS </button>
			</div>
			{tournamentLinks.map((item, index) => (
				<TournamentsContainer
					key={index}
					href={item.href}
					name={item.name}
					followers={item.followers}
					SecName={item.secName}
				/>
			))}
			<div className="w-full absolute bottom-0">
				<div className="w-full grid place-content-end">
					<div className='flex flex-row items-end justify-end'> <ViewAll /> </div>
				</div>
			</div>
		</div>

	);
};

export default Tournaments;
