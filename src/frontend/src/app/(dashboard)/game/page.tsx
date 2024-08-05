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
							<img src="/assets/images/Rectangle.png" alt="Profile Image" className="w-full h-[456px] rounded-xl " />
							<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl font-bold">
								<div className="flex flex-col items-center pb-36">
									<div className="font-bold text-[48px] text-center mb-4">READY, SET, PLAY!</div>
									<div className="max-auto w-[334px] text-center mb-4">
										<div className="text-[16px] font-normal text-[#e1e1e1]">Who Will You Face? Choose your opponent and dive into the action!</div>
									</div>
									{/* <div className="grid  grid-cols-4 gap-2 rounded-xl  p-2">
										<div className="relative flex items-center h-10 w-[120px]">
											<input type="radio" name="option" id="1" value="1" className="peer hidden" />
											<label htmlFor="1" className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white bg-white text-gray-800">Machine</label>
										</div>

										<div className="relative flex items-center h-10 w-[120px]">
											<input type="radio" name="option" id="2" value="2" className="peer hidden" />
											<label htmlFor="2" className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white bg-white text-gray-800">Human</label>
										</div>
									</div> */}
								</div>

								<div className="text-center flex flex-col items-center">
									<Link href='/match-making' className={`${styles.play_now_button} h-9 w-36 grid place-content-center text-sm font-semibold`}>Play Now</Link>
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
			</div >
		</>
	);
};


export default page;