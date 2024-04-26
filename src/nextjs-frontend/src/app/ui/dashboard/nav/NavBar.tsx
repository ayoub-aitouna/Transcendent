'use client'

import * as React from "react";
import NavBtn from "@/app/ui/dashboard/nav/NavBtn";
import NavBtnR from "@/app/ui/dashboard/nav/NavBtnRight";
import { usePathname } from "next/navigation";
import ProfileIcon from "@/app/ui/dashboard/nav/profile"
import styles from '@/app/ui/dashboard/nav/nav.module.css'
import { navLinks, socialLinks } from "@/constant/dashboard";

const PlayNowIcon = () => {
	const handleClick = () => {
		window.location.href = "/game";
	};

	return (
		<button className={`${styles.play_now_button} h-9 w-36`} onClick={handleClick}> Play Now </button>
	);
};


const NavBar = () => {
	const path = usePathname();

	return (
		<nav className="w-full mt-[40px] mb-[40px] flex flex-row justify-between items-center mx-auto  max-w-[100vw]">
			<div className="text-white font-semibold flex flex-row gap-16 items-center justify-center ">
				<PlayNowIcon />
				<ul className="flex flex-row gap-8 justify-center items-center">
					{navLinks.map((item, index) => (
						<NavBtn
							key={index}
							href={item.href}
							name={item.name}
							Icon={item.Icon}
						/>
					))}
				</ul>

			</div>
			<div className=" space-x-2 flex flex-row items-center justify-center ">
				{socialLinks.map((item, index) => (
					<div key={index} className="rounded-full overflow-hidden bg-[#303030] h-[40px] w-[40px] aspect-square">
						<NavBtnR
							href={item.href}
							Icon={item.Icon}
						/>
					</div>
				))}
				<ProfileIcon />
			</div>
		</nav>
	);
};




export default NavBar;

