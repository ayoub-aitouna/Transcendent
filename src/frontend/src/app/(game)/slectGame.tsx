'use client';

import styles from '@/app/ui/dashboard/nav/nav.module.css';
import Link from "next/link";
import { useEffect, useState } from 'react';

const SelectGame = () => {
	const [isRobot, setIsRobot] = useState<boolean>(false);
	let link = isRobot ? "/match-making?isRobot=true" : "/match-making";

	useEffect(() => {
		link = isRobot ? "/match-making?isRobot=true" : "/game/match-making";
	}, [isRobot]);

	return (
		<div className="flex flex-col items-center pb-36">
			<div className="font-bold text-[48px] text-center mb-4">READY, SET, PLAY!</div>
			<div className="max-auto w-[334px] text-center mb-4">
				<div className="text-[16px] font-normal text-[#e1e1e1]">Who Will You Face? Choose your opponent and dive into the action!</div>
			</div>
			<div className="flex gap-10 p-2">
				<div className="relative flex items-center justify-center h-10 w-[120px]" onClick={() => setIsRobot(true)}>
					<input type="radio" name="option" id="1" value="1" className="peer hidden" />
					<label htmlFor="1" className="flex items-center justify-center h-full w-full cursor-pointer select-none rounded p-2 text-center peer-checked:bg-[#FE284F] peer-checked:font-semibold peer-checked:text-white bg-[#262626] text-white text-[14px]">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
							<path d="M20 22.75C20 22.1754 20.2284 21.6243 20.6347 21.2179C21.041 20.8116 21.5921 20.5833 22.1667 20.5833C22.7414 20.5833 23.2925 20.8116 23.6988 21.2179C24.1051 21.6243 24.3334 22.1754 24.3334 22.75M2.66675 22.75C2.66675 22.1754 2.89502 21.6243 3.30135 21.2179C3.70768 20.8116 4.25878 20.5833 4.83341 20.5833C5.40805 20.5833 5.95915 20.8116 6.36548 21.2179C6.77181 21.6243 7.00008 22.1754 7.00008 22.75M15.6581 8.125H15.6678M11.3334 8.125H11.3432M18.9167 14.0833V8.66667C18.9167 7.23008 18.3461 5.85233 17.3302 4.8365C16.3144 3.82068 14.9367 3.25 13.5001 3.25C12.0635 3.25 10.6857 3.82068 9.66992 4.8365C8.6541 5.85233 8.08341 7.23008 8.08341 8.66667V14.0833C8.08341 16.1092 8.08341 17.121 8.51891 17.875C8.80415 18.369 9.21439 18.7793 9.70841 19.0645C10.4624 19.5 11.4742 19.5 13.5001 19.5C15.5259 19.5 16.5377 19.5 17.2917 19.0645C17.7858 18.7793 18.196 18.369 18.4812 17.875C18.9167 17.121 18.9167 16.1092 18.9167 14.0833Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M22.1668 20.5833V16.25C22.1668 14.2068 22.1668 13.1863 21.532 12.5515C20.8972 11.9167 19.8767 11.9167 17.8335 11.9167H9.16683C7.12366 11.9167 6.10316 11.9167 5.46833 12.5515C4.8335 13.1863 4.8335 14.2068 4.8335 16.25V20.5833" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
						Machine
					</label>
				</div>

				<div className="relative flex items-center justify-center h-10 w-[120px]" onClick={() => setIsRobot(false)}>
					<input type="radio" name="option" id="2" value="2" className="peer hidden" defaultChecked />
					<label htmlFor="2" className="flex items-center justify-center h-full w-full cursor-pointer select-none rounded p-2 text-center peer-checked:bg-[#FE284F] peer-checked:font-semibold peer-checked:text-white bg-[#262626] text-white text-[14px]">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
							<path d="M13.5 10.8333C15.893 10.8333 17.8332 8.89322 17.8332 6.49999C17.8332 4.10676 15.8931 2.16666 13.4998 2.16666C11.1066 2.16666 9.1665 4.10676 9.1665 6.49999C9.1665 8.89322 11.1066 10.8333 13.4998 10.8333Z" stroke="white" stroke-width="1.5" />
							<path d="M22.1644 19.5C22.1659 19.3223 22.1666 19.1418 22.1666 18.9583C22.1666 16.2662 18.2861 14.0833 13.4999 14.0833C8.71375 14.0833 4.83325 16.2662 4.83325 18.9583C4.83325 21.6504 4.83325 23.8333 13.4999 23.8333C15.9168 23.8333 17.6599 23.6632 18.9166 23.3599" stroke="white" stroke-width="1.5" stroke-linecap="round" />
						</svg>
						Human
					</label>
				</div>
			</div>
			<div className="text-center flex flex-col items-center pt-5">
				<Link href={link} className={`${styles.play_now_button} h-9 w-36 grid place-content-center text-sm font-semibold`}>Play Now</Link>
			</div>
		</div>
	);
}

export default SelectGame;
