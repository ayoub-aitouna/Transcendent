'use client'

import React from "react";
import OnlinePlayers from '@/app/ui/dashboard/home/OnlinePlayer';
import Image from 'next/image';
import styles from '@/app/ui/dashboard/nav/nav.module.css'
import Tournaments from "@/app/ui/dashboard/home/Tournaments";

export function Play() {
	const handleClick = () => {
		window.location.href = '/filter';
	}
	return (
		<div className='p-4 flex flex-row justify-between'>
			<div>
			<Image className="" src="/assets/images/Rectangle.png" alt="Profile Image" width={383.08} height={545.63} />
			</div>
		</div>
	);
}

const page = () => {
	return (
	  <>
		<div className="h-full">
		  <div className="flex-1 h-full flex flex-col gap-5">
			<div className="flex flex-col md:flex-row md:flex-wrap gap-5">
			  <div className="w-full md:w-1/2 bg-secondary-400 min-w-[400px] rounded-xl flex-1 relative">
				<img src="/assets/images/Rectangle.png" alt="Profile Image" className="w-full h-full rounded-xl" />
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl font-bold">
					hi theere
				</div>
			  </div>
			  <div className="w-full md:w-[381px] bg-secondary-400 rounded-xl p-4">
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