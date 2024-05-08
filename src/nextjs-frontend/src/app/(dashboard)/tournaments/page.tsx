import React from "react";
import styles from "@/app/ui/dashboard/nav/nav.module.css";
import { TournamentsContainer } from "@/app/ui/dashboard/home/content_area/tournamentContainer";
import { TournamentsItem } from "@/type/dashboard/navitem";

import Link from "next/link";
export const tournamentLinks: TournamentsItem[] = [
	{
		id: 1,
		href: "/assets/images/valorantlogo.png",
		name: "Valorant VCT cup 2024",
		followers: "64.9k",
		secName: "Valorant",
	},
	{
		id: 2,
		href: "/assets/images/lol.png",
		name: "lEAGUE MASTERS  ",
		followers: "102.7k",
		secName: "league of legends",
	},
	{
		id: 3,
		href: "/assets/images/fortnait.jpg",
		name: "Fortnite MASTERS",
		followers: "34.9k",
		secName: "Fortnite S14",
	},
	{
		id: 4,
		href: "/assets/images/valorantlogo.png",
		name: "Valorant VCT cup 2024",
		followers: "64.9k",
		secName: "Valorant",
	},
	{
		id: 5,
		href: "/assets/images/lol.png",
		name: "lEAGUE MASTERS  ",
		followers: "102.7k",
		secName: "league of legends",
	},
	{
		id: 6,
		href: "/assets/images/fortnait.jpg",
		name: "Fortnite MASTERS",
		followers: "34.9k",
		secName: "Fortnite S14",
	},
	{
		id: 7,
		href: "/assets/images/valorantlogo.png",
		name: "Valorant VCT cup 2024",
		followers: "64.9k",
		secName: "Valorant",
	},
	{
		id: 8,
		href: "/assets/images/lol.png",
		name: "lEAGUE MASTERS  ",
		followers: "102.7k",
		secName: "league of legends",
	},
	{
		id: 9,
		href: "/assets/images/fortnait.jpg",
		name: "Fortnite MASTERS",
		followers: "34.9k",
		secName: "Fortnite S14",
	},
	{
		id: 10,
		href: "/assets/images/valorantlogo.png",
		name: "Valorant VCT cup 2024",
		followers: "64.9k",
		secName: "Valorant",
	},
	{
		id: 11,
		href: "/assets/images/lol.png",
		name: "lEAGUE MASTERS  ",
		followers: "102.7k",
		secName: "league of legends",
	},
];
const page = () => {
	return (
		<div className='w-full h-full'>
			<div className='bg-secondary-400 rounded-xl h-[87vh] flex flex-col gap-7 px-2 py-4'>
				<div className='w-full flex flex-row items-center justify-between px-5'>
					<h6 className='font-bold text-lg tracking-tight text-white'>
						Tournmanets
					</h6>
					<button className={`${styles.create_new_trn} w-40 h-9 rounded-md`}>
						<Link href='/tournaments/create_tournament'>
							Create tournament
						</Link>  
					</button>
				</div>
				<ul className='flex flex-col items-center justify-start gap-3 w-full overflow-y-scroll hide-scrollbar'>
					{tournamentLinks.map((item, index) => (
						<li key={item.id} className='w-full'>
							<Link href={`/tournaments/${index}`}>
								<TournamentsContainer
									key={index}
									href={item.href}
									name={item.name}
									followers={item.followers}
									SecName={item.secName}
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
