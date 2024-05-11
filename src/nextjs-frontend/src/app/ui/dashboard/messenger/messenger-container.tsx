'use client'
import Image from 'next/image';
import styles from '@/app/ui/dashboard/nav/nav.module.css';
import { useState } from 'react';


export function MessengerContainer({ name, href, LastMessage, time, messagesNbr, isSelected, onClick }: {
	name: string;
	href: string;
	LastMessage: string;
	time: string;
	messagesNbr: number;
	isSelected: boolean;
	onClick: () => void;
}) {
	isSelected && messagesNbr != 0 ? messagesNbr = 0 : null
	const [viewsMessages, setViewsMessages] = useState(messagesNbr !== 0 && !isSelected);
	const handleClick = () => {
		onClick();
		if (isSelected) {
			setViewsMessages(messagesNbr !== 0);
		} else {
			setViewsMessages(false);
		}
	};
	return (
		<button
			className={`mt-2 w-[404px] h-[69px] flex items-center justify-between rounded-lg 
                ${isSelected ? "bg-[#494949]" : (viewsMessages ? styles.highlightMess : "bg-[#292929]")}   overflow-hidden  p-2 mb-[10px]`}
			onClick={handleClick}
		>
			<div className='flex items-center justify-between '>
				<Image className="bg-white  w-[53px] h-[53px] rounded-full" src={href} alt="Profile Image" width={53} height={53} />
				<div />
				<div className="flex items-start flex-col max-w-[80px]">
					<div className="ml-[10px]  text-white truncate text-[18px] font-bold">{name}</div>
					<div className={`ml-[10px] ${viewsMessages ? "text-white" : "text-[#878787]"} text-[14px] truncate font-normal`}>{LastMessage}</div>
				</div>
			</div>
			<div className="flex flex-col items-center p-2">
				{viewsMessages ? (
					<div className={`rounded-full h-5 w-5 bg-[#00D400] mb-1 flex justify-center items-center`}>
						<div className="font-bold text-[12px]">{messagesNbr}</div>
					</div>
				) : (
					<div className="mb-2 text-[#292929]">{' .'}</div>
				)}
				<div className={`rounded-md p-1 bg-[#242424] mb-2 h-6 w-14 flex justify-center items-center`}>
					<div className="font-light text-[13px]">{time}</div>

				</div>
			</div>

		</button>
	);
};