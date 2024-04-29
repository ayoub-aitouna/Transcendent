import React from "react";
import styles from "@/app/ui/dashboard/nav/nav.module.css";
import { TournamentsContainer } from "@/app/ui/dashboard/home/content_area/tournamentContainer";
import { tournamentLinks } from "@/constant/dashboard";
import Link from "next/link";

const page = () => {
	return (
		<div className='w-full h-full'>
			<div className='bg-secondary-200 rounded-xl min-h-[90vh]  flex flex-col gap-7 px-2 py-4'>
				<div className='w-full flex flex-row items-center justify-between px-5'>
					<h6 className='font-bold text-lg tracking-tight text-white'>
						Tournmanets
					</h6>
					<button className={`${styles.create_new_trn} w-40 h-9 rounded-md`}>
						Create tournement
					</button>
				</div>
				<ul className='flex flex-col items-center justify-start w-full'>
					{tournamentLinks.map((item, index) => (
						<li key={index} className='w-full'>
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
