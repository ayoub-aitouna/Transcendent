import React from "react";
import styles from "@/app/ui/dashboard/nav/nav.module.css";
import { TournamentsContainer } from "@/app/ui/dashboard/home/content_area/tournamentContainer";
import { GetPrivateTournaments, GetTournaments } from "@/api/Tournament";
import Link from "next/link";

const getData = async () => {
	const res = await GetTournaments();
	return res;
};
const getPrivateData = async () => {
	const res = await GetPrivateTournaments();
	return res;
};

const page = async () => {
	const list = await getData();
	const private_list = await getPrivateData();
	return (
		<div className='w-full h-full'>
			<div className='bg-secondary-400 rounded-xl h-[87vh] flex flex-col gap-7 px-2 py-4'>
				<div className='w-full flex flex-row items-center justify-between px-5'>
					<h5 className='font-bold text-lg tracking-tight text-white'>
						Tournaments
					</h5>
					<button className={`${styles.create_new_trn} rounded-md w-[165px] h-[35px] text-[12px] font-semibold`}>
						<Link href='/tournaments/create_tournament'>CREATE TOURNAMENTS</Link>
					</button>
				</div>
				<ul className='flex flex-col items-center justify-start gap-3 w-full overflow-y-scroll hide-scrollbar'>
					{list.results?.map((item, index) => (
						<li key={item.id} className='w-full'>
							<Link href={`/tournaments/${item.id}`}>
								<TournamentsContainer  {...item} />
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default page;
