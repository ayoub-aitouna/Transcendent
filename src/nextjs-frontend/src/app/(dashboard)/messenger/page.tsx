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

const ThreePointsIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={24}
		height={25}
		fill="none"
	>
		<path
			stroke="#F8F8F8"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
			d="M12 6.42a.96.96 0 1 0 0-1.92.96.96 0 0 0 0 1.92Zm0 7.04a.96.96 0 1 0 0-1.92.96.96 0 0 0 0 1.92Zm0 7.04a.96.96 0 1 0 0-1.92.96.96 0 0 0 0 1.92Z"
		/>
	</svg>
);

export const SendIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={30}
		height={30}
		fill="none"
	>
		<path
			fill="#878787"
			d="m27.925 13.304-.01-.004L2.893 2.92a1.38 1.38 0 0 0-1.302.127 1.444 1.444 0 0 0-.653 1.206v6.638a1.406 1.406 0 0 0 1.144 1.382l13.649 2.523a.234.234 0 0 1 0 .46L2.082 17.78a1.406 1.406 0 0 0-1.144 1.38v6.64a1.38 1.38 0 0 0 .62 1.153 1.402 1.402 0 0 0 1.332.121l25.024-10.32.011-.005a1.875 1.875 0 0 0 0-3.445Z"
		/>
	</svg>
)

export const GetDataIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={30}
		height={30}
		fill="none"
	>
		<path
			fill="#878787"
			fillRule="evenodd"
			d="M12 1.25a.75.75 0 0 1 .57.262l3 3.5a.75.75 0 0 1-1.14.976l-1.68-1.96V15a.75.75 0 1 1-1.5 0V4.027L9.57 5.988a.75.75 0 0 1-1.14-.976l3-3.5A.75.75 0 0 1 12 1.25ZM6.996 8.252a.75.75 0 0 1 .008 1.5c-1.093.006-1.868.034-2.457.142-.566.105-.895.272-1.138.515-.277.277-.457.666-.556 1.4-.101.755-.103 1.756-.103 3.191v1c0 1.436.002 2.437.103 3.192.099.734.28 1.122.556 1.4.277.276.665.456 1.4.555.754.102 1.756.103 3.191.103h8c1.435 0 2.436-.001 3.192-.103.734-.099 1.122-.279 1.399-.556.277-.277.457-.665.556-1.399.101-.755.103-1.756.103-3.192v-1c0-1.435-.002-2.436-.103-3.192-.099-.733-.28-1.122-.556-1.399-.244-.243-.572-.41-1.138-.515-.589-.108-1.364-.136-2.457-.142a.75.75 0 0 1 .008-1.5c1.082.006 1.983.032 2.72.167.758.14 1.403.405 1.928.93.602.601.86 1.36.982 2.26.116.866.116 1.969.116 3.336v1.11c0 1.368 0 2.47-.116 3.337-.122.9-.38 1.658-.982 2.26-.602.602-1.36.86-2.26.982-.867.116-1.97.116-3.337.116h-8.11c-1.367 0-2.47 0-3.337-.116-.9-.121-1.658-.38-2.26-.982-.602-.602-.86-1.36-.981-2.26-.117-.867-.117-1.97-.117-3.337v-1.11c0-1.367 0-2.47.117-3.337.12-.9.38-1.658.981-2.26.525-.524 1.17-.79 1.928-.929.737-.135 1.638-.161 2.72-.167Z"
			clipRule="evenodd"
		/>
	</svg>
)

export const EmojiIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={34}
		height={34}
		fill="none"
	>
		<path
			fill="#878787"
			fillRule="evenodd"
			d="M17 31.167C9.176 31.167 2.834 24.824 2.834 17S9.175 2.833 17 2.833c7.824 0 14.167 6.343 14.167 14.167S24.824 31.167 17 31.167Zm5.667-12.75a5.667 5.667 0 1 1-11.334 0h11.334ZM17 28.333a11.333 11.333 0 1 0 0-22.666 11.333 11.333 0 0 0 0 22.666Zm-3.541-12.75a2.125 2.125 0 1 0 0-4.249 2.125 2.125 0 0 0 0 4.25Zm7.083 0a2.125 2.125 0 1 0 0-4.249 2.125 2.125 0 0 0 0 4.25Z"
			clipRule="evenodd"
		/>
	</svg>
)

function ChatMessage({ message, isSent, time }: {
	message: string;
	isSent: boolean;
	time: string;
}) {
	return (
		<div className={`w-full flex ${isSent ? 'items-end justify-end' : 'items-start'} px-7 py-2`}>
			<div className={`flex flex-row py-2 px-4  p-4  ${isSent ? 'bg-[#FD4106] text-white rounded-tl-md rounded-tr-none rounded-bl-md rounded-br-md' : 'bg-[#363636]  rounded-e-md rounded-es-md'} ${isSent ? 'ml-auto' : 'mr-auto'} relative`} style={{ maxWidth: '50%' }}>
				<p className="text-[12px] font-medium pr-8">{message}</p>
				<p className={`text-[8px] ${isSent ? "text-white" : "text-[#878787]"} absolute bottom-[6px] right-4`}>{time}</p>
			</div>
		</div>
	);
}


const page = () => {
	const [clickedIndex, setClickedIndex] = useState<number | null>(null);
	const [selectedChat, setSelectedChat] = useState<any | null>(null);
	const [clickedThreePoints, setClickedThreePoints] = useState(false);

	const handleThreePoints = () => {
		console.log("Three points clicked");
		setClickedThreePoints(!clickedThreePoints);
	};



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

					<div className="flex-1 h-[940px] bg-secondary-400  min-w-[400px] rounded-xl relative">
						{selectedChat ? (
							<div className=''>
								<button className={`w-full h-[80px] bg-[#303030] flex items-center justify-between rounded-lg overflow-hidden`}>
									<Link href={"/profile"} className='flex items-center justify-between p-7'>
										<Image className="bg-white  w-[53px] h-[53px] rounded-full" src={selectedChat.href} alt="Profile Image" width={53} height={53} />
										<div />
										<div className="flex items-start flex-col max-w-[80px]">
											<div className="ml-[10px]  text-white truncate text-[18px] font-bold">{selectedChat.name}</div>
											<div className={`ml-[10px]  text-[#878787] text-[14px] truncate font-normal`}>Online</div>
										</div>
									</Link>
									<div className="relative flex flex-col items-center">
                                            <div className="relative flex flex-col items-center p-7" onClick={handleThreePoints}>
                                                <ThreePointsIcon />
                                            </div>
										{clickedThreePoints && (
														<div className="absolute left-0 bottom-[-150px] bg-[#242424] w-[00px] h-[245px] p-4 rounded-md">
															{/* Panel Content */}
														</div>
										)}
                                        </div>
								</button>
								<div className="flex-1 p overflow-y-auto w-full mt-5">
									<ChatMessage message="Hi there!" isSent={false} time="10:00" />
									<ChatMessage message="Hello! How are you?" isSent={true} time="10:05" />
									<ChatMessage message="I was thinking we could go see that new movie. It's the latest one by that director we both like. I've heard it's a mix of suspense and da, which sounds like it could be interesting. Plus, the lead actor has won several awards for his past performances, so I'm expecting some solid acting." isSent={false} time="10:00" />
									<ChatMessage message="That sounds like a great idea. I've been wanting to see that movie too. I've read some reviews and they all praise the storyline and the performances. It's been a while since we've seen a good movie. Plus, it would be nice to catch up. Let's do it." isSent={true} time="10:05" />
									<ChatMessage message="Awesome, I'll get the tickets. Do you prefer a matinee or an evening show? Personally, I prefer evening shows. There's something about ending the day with a good movie. Plus, we could grab dinner before the movie. There's a new Italian restaurant that opened recently near the cinema" isSent={false} time="10:00" />
									<ChatMessage message="An evening show sounds perfect. And trying out the new Italian restaurant is a great idea. I've heard they serve an excellent lasagna. Looking forward to it. Let's meet at the restaurant around 6?" isSent={true} time="10:05" />
								</div>
								<div className="absolute bottom-0 left-0 right-0 p-2 h-[80px] bg-[#303030]">
									<div className="flex flex-row items-end justify-end">
										<div className="p-2"><EmojiIcon /></div>
										<div className="p-2"><GetDataIcon /></div>
										<input
											className="flex-grow bg-[#363636] pl-[60px] h-[60px] p-3 rounded-lg"
											type="text"
											placeholder="Type a message"
										/>
										<div className="p-2"><SendIcon /></div>
									</div>
								</div>
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