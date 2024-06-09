'use client'
import Image from 'next/image';
import styles from '@/app/ui/dashboard/nav/nav.module.css';
import { useEffect, useState } from 'react';
import { MessageItem } from '@/api/chat';
import apiMock from '@/lib/axios-mock';

function get_last_message({ lastMessage }: { lastMessage: MessageItem }) {
	if (lastMessage === null)
		return ""
	if (typeof lastMessage.message === 'string') {
		return  lastMessage.message;
	} else {
		return lastMessage.sender_username + " " + "send a photo";
	}
}

function formatTime(timestamp: string): string {
	const messageDate = new Date(timestamp);
	const currentDate = new Date();

	// If the message is from the same day
	if (messageDate.toDateString() === currentDate.toDateString()) {
		const hours = messageDate.getHours().toString().padStart(2, '0');
		const minutes = messageDate.getMinutes().toString().padStart(2, '0');
		return `${hours}:${minutes}`;
	}
	// If the message is older than the current day
	else {
		const daysAgo = Math.floor((currentDate.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24));
		if (daysAgo === 1) {
			return 'Yesterday';
		} else if (daysAgo < 7) {
			const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
			return weekdays[messageDate.getDay()];
		} else {
			// Format the date as YYYY/MM/DD
			const year = messageDate.getFullYear();
			const month = (messageDate.getMonth() + 1).toString().padStart(2, '0');
			const day = messageDate.getDate().toString().padStart(2, '0');
			return `${year}/${month}/${day}`;
		}
	}
}


export function MessengerContainer({ name, href, LastMessage, messagesNbr, isSelected, onClick }: {
	name: string;
	href: string;
	LastMessage: MessageItem;
	messagesNbr: number;
	isSelected: boolean;
	onClick: () => void;
}) {
	const lastMassage = get_last_message({ lastMessage: LastMessage });
	const [viewsMessages, setViewsMessages] = useState(messagesNbr !== 0 && !isSelected);
	
	const handleClick = () => {
		onClick();
		if (isSelected) {
			setViewsMessages(messagesNbr !== 0);
		} else {
			setViewsMessages(false);
		}
	};

	useEffect(() => {
		const fetchMessages = async () => {
			if (viewsMessages !== null) {
				try {
					await apiMock.put(`/chat/message/${LastMessage.id}/`);
				} catch (error) {
					console.error('Error fetching chat Messages', error);
				}
			}
		};
		fetchMessages();
	}, [viewsMessages]);
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
					<div className={`ml-[10px] ${viewsMessages ? "text-white" : "text-[#878787]"}text-[14px] w-[250px] truncate font-normal`}>{lastMassage}</div>
				</div>
			</div>
			{
				lastMassage && (
					<div className="flex flex-col items-center p-2">
						{viewsMessages ? (
							<div className={`rounded-full h-5 w-5 bg-[#00D400] mb-1 flex justify-center items-center`}>
								<div className="font-bold text-[12px]">{messagesNbr}</div>
							</div>
						) : (
							<div className="mb-2 px-2 text-[#292929]">{' .'}</div>
						)}
						<div className={`rounded-md p-1 bg-[#242424] mb-2  flex justify-center items-center`}>
							<div className="font-light text-[13px]">{formatTime(LastMessage?.created_at)}</div>

						</div>
					</div>
				)}

		</button>
	);
};