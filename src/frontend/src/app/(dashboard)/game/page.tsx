'use client'

import React from "react";
import OnlinePlayers from '@/app/ui/dashboard/home/OnlinePlayer';
import styles from '@/app/ui/dashboard/nav/nav.module.css'
import Tournaments from "@/app/ui/dashboard/home/Tournaments";
import Link from "next/link";


const page = () => {
	return (
		<>
			<div className="h-full">
				<div className="flex-1  flex flex-col  gap-5">
					<div className="flex flex-col md:flex-row md:flex-wrap  gap-5">
						<div className="w-full md:w-1/2 bg-secondary-400 min-w-[400px]  h-[456px] rounded-xl flex-1 relative">
							<img src="/assets/images/Rectangle.png" alt="Profile Image" className="w-full h-[456px] rounded-xl" />
							<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl font-bold">
								<div className="flex flex-col items-center pb-36">
									<div className="font-bold text-[48px] text-center mb-4">Valorant vct cup 2024</div>
									<div className="max-auto w-[334px] text-center mb-4">
										<div className="text-[12px] font-normal text-[#999999]">Valorant is a free-to-play first-person tactical hero shooter developed and published by Riot Games, for Windows. Teased under the codename Project A in October 2019, the game...</div>
									</div>
								</div>
								<div className="text-center flex flex-col items-center">
									<Link href='/making-machine' className={`${styles.play_now_button} h-9 w-36 grid place-content-center text-sm font-semibold`}>Play Now</Link>
								</div>
							</div>
						</div>
						<div className="w-full md:w-[381px] bg-secondary-400 rounded-xl h-[456px] p-4">
							<OnlinePlayers />
						</div>
					</div>

					<div className="flex flex-wrap h-[456px] gap-5">
						<div className="w-full bg-secondary-400 min-w-[400px] rounded-xl p-4">
							<Tournaments />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};


export default page;