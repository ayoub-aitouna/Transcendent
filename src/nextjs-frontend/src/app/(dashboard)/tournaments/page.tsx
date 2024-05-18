import React from "react";
import styles from "@/app/ui/dashboard/nav/nav.module.css";
import { TournamentsContainer } from "@/app/ui/dashboard/home/content_area/tournamentContainer";
import { GetTournaments } from "@/api/Tournament";
import Link from "next/link";

const getData = async () => {
	const res = await GetTournaments();
	console.log(res);
	return res;
};
const page = async () => {
	const list = await getData();
	return (
		<div className='w-full h-full'>
			<div className='bg-secondary-400 rounded-xl h-[87vh] flex flex-col gap-7 px-2 py-4'>
				<div className='w-full flex flex-row items-center justify-between px-5'>
					<h6 className='font-bold text-lg tracking-tight text-white'>
						Tournmanets
					</h6>
					<button className={`${styles.create_new_trn} w-40 h-9 rounded-md`}>
						<Link href='/tournaments/create_tournament'>Create tournament</Link>
					</button>
				</div>
				<ul className='flex flex-col items-center justify-start gap-3 w-full overflow-y-scroll hide-scrollbar'>
					{list.results?.map((item, index) => (
						<li key={item.name} className='w-full'>
							<Link href={`/tournaments/${item.id}`}>
								<TournamentsContainer
									key={index}
									href={
										item.icon || "https://via.placeholder.com/150/92c952.png"
									}
									name={item.name}
									followers={item.max_players || 0}
									SecName={item.description}
								/>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default page;
