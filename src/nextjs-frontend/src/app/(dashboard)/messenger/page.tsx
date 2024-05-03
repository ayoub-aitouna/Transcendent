'use client'
import Image from 'next/image';
import styles from '@/app/ui/dashboard/nav/nav.module.css';
import Filter from "@/app/ui/dashboard/icons/content_area/filters";
import React, { useState } from "react";
import Link from "next/link";
import { MessengerLinks } from '@/constant/dashboard';
import { it } from 'node:test';

export const SearchIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={24}
		height={25}
		fill="none"
	>
		<path
			fill="#878787"
			d="M15.5 14.556h-.79l-.28-.27a6.47 6.47 0 0 0 1.57-4.23 6.5 6.5 0 1 0-6.5 6.5c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99 1.49-1.49-4.99-5Zm-6 0c-2.49 0-4.5-2.01-4.5-4.5s2.01-4.5 4.5-4.5 4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5Z"
		/>
	</svg>
)

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
                ${isSelected ? "bg-[#494949]" : (viewsMessages ? styles.highlightMess: "bg-[#292929]")}   overflow-hidden  p-2 mb-[10px]`}
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

const page = () => {
	const [clickedIndex, setClickedIndex] = useState<number | null>(null);
	const [selectedChat, setSelectedChat] = useState<any | null>(null); 
	


	const handleIconClick = (index: number) => {
        setClickedIndex(prevIndex => prevIndex === index ? null : index);
		setSelectedChat(MessengerLinks[index]);
	};

	return <>
		<div className="h-full">
			<div className="flex-1 flex flex-col gap-4">
				<div className="flex  h-[940px] flex-row flex-wrap gap-5">
					<div className=" h-[940px] overflow-y-scroll hide-scrollbar  w-[440px] bg-[#292929] rounded-xl p-4">
						<div className="flex flex-row items-center justify-between p-2 relative">
							<input
								className="flex-row items-center justify-between rounded-lg overflow-hidden bg-[#363636] pl-[60px] p-2 h-[40px] w-[336px]"
								type="text"
								placeholder="Search..."
							/>
							<div className="absolute pl-3 top-1/2 transform -translate-y-1/2">
								<SearchIcon />
							</div>
							<div className=" items-end justify-end">
								<Filter />
							</div>
						</div>
						<div>
						{MessengerLinks.map((item, index) => (
                                <div key={index} className='relative'>
                                    <MessengerContainer
                                        name={item.name}
                                        href={item.href}
                                        LastMessage={item.LastMessage}
                                        time={item.time}
                                        messagesNbr={item.messagesNbr}
                                        isSelected={clickedIndex === index}
                                        onClick={() => handleIconClick(index)}
                                    />
                                </div>
                            ))}

						</div>

					</div>

					<div className="flex-1 h-[940px] bg-secondary-400  min-w-[400px] rounded-xl p-4">
					{selectedChat ? (
                            <div>
                                <h2>{selectedChat.name}</h2>
                                <p>Last Message: {selectedChat.LastMessage}</p>
                            </div>
                        ) : 
						(
							<div className='flex justify-center items-center flex-col h-full'>
							<div className='text-3xl font-bold'>Messenger</div>
							<div className='text-lg font-light mt-2'>Send and receive messages without keeping your phone online.</div>
							<div className='text-lg font-light mt-2'>Use Messenger Transcendent on your PC.</div>
						</div>
                        )}
					</div>
				</div>

			</div>
		</div>
	</>
};



export default page;