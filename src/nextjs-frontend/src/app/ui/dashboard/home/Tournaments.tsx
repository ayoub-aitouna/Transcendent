'use client'
import React, { useEffect, useState } from 'react';
import styles from '@/app/ui/dashboard/nav/nav.module.css'
import { TournamentsContainer } from './content_area/tournamentContainer';
import ViewAll from './content_area/viewAll';
import { tournamentLinks } from '@/constant/dashboard';
import Link from 'next/link';
import Empty from '../Empty';
import { PaginationApiResponse } from '@/type';
import apiMock from '@/lib/axios-mock';
import { Player, TournamentType } from '@/type/dashboard/players';

Tournaments

function Tournaments() {
	const [Tournament, setTournament] = useState<PaginationApiResponse<Player>>();

	useEffect(() => {
		const fetchTournament = async () => {
			try {
				const response = await apiMock.get('/game/Tournament/');

				if (response.status === 200) {
					setTournament(response.data);
				} else {
					console.error('Failed to fetch Tournaments');
				}
			} catch (error) {
				console.error('Error fetching Tournaments:', error);
			}
		};
		fetchTournament();
	}, []);
	return (
		<div className='relative h-full'>
			<div className='pb-8 flex items-center justify-between'>
				<div className=' text-white  truncate font-bold text-base'>Tournaments</div>
				<button className={`${styles.create_new_trn} rounded-md w-[165px] h-[35px] text-[12px] font-semibold`}>
					<Link href='/tournaments/create_tournament'>CREATE TOURNAMENTS</Link>
				</button>
			</div>
			{!tournamentLinks.length ?
				<div className="flex h-[320px] w-full justify-center items-center">
					<Empty text="no tournaments are available right now" />
				</div>
				:
				<div>

					<div className='flex flex-col gap-3'>
						{Tournament?.results.slice(0, 3).map((item, index) => (
							<Link key={item.id} href={`/tournaments/${item.id	}`}>
								<TournamentsContainer
									{...item} // Change the type of the prop here
								/>
							</Link>
						))}
					</div>
					{tournamentLinks.length > 3 && (
						<div className='w-full absolute bottom-0'>
							<div className='w-full grid place-content-end'>
								<div
									className='flex flex-row items-end justify-end'>
									<Link href={'/tournaments'}>  <ViewAll /> </Link>
								</div>
							</div>
						</div>
					)}
				</div>
			}
		</div>
	);
};

export default Tournaments;
