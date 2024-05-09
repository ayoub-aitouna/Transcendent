'use client'
import Image from 'next/image';
import Filter from "@/app/ui/dashboard/icons/content_area/filters";
import React, { useState } from "react";
import Link from "next/link";
import { MessengerLinks } from '@/constant/dashboard';
import SearchIcon from '@/app/ui/dashboard/icons/messenger/search';
import { MessengerContainer } from '@/app/ui/dashboard/messenger/messenger-container';
import {ChatMessage } from '@/app/ui/dashboard/messenger/chat-message';
import ThreePointsIcon from '@/app/ui/dashboard/icons/messenger/three-points';
import EmojiIcon from '@/app/ui/dashboard/icons/messenger/emoji';
import Upload from '@/app/ui/dashboard/icons/messenger/Upload';
import SendIcon from '@/app/ui/dashboard/icons/messenger/send';



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
		<div className="h-full max-h-[82vh]overflow-hidden">
			<div className="h-full flex-1 flex flex-col gap-4">
				<div className="h-full flex flex-row flex-wrap gap-5">
					<div className="  overflow-y-scroll hide-scrollbar  w-[440px] bg-[#292929] rounded-xl p-4">
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
										messagesNbr={item.messagesNbr as number}
										isSelected={clickedIndex === index}
										onClick={() => handleIconClick(index)}
									/>
								</div>
							))}

						</div>

					</div>

					<div className={`flex-1 h-full bg-secondary-400  min-w-[400px] rounded-xl relative`}>
						{selectedChat ? (
							<div className=''>
								<button className={`w-full h-[80px] bg-[#303030] flex items-center justify-between rounded-lg overflow-hidden`}>
									<Link href={"/profile"} className='flex items-center justify-between p-7'>
										<Image className="bg-white  w-[53px] h-[53px] rounded-full" src={selectedChat.href} alt="Profile Image" width={53} height={53} />
										<div />
										<div className="flex items-start flex-col max-w-[80px]">
											<div className="ml-[10px]  text-white truncate text-[16px] font-bold">{selectedChat.name}</div>
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
								<div className='overflow-y-scroll hide-scrollbar max-h-[600px]'>
									<div className=" flex-1 p  w-full mt-5">
										<ChatMessage message="Hi there!" isSent={false} time="10:00" />
										<ChatMessage message="Hello! How are you?" isSent={true} time="10:05" />
										<ChatMessage message="I was thinking we could go see that new movie. It's the latest one by that director we both like. I've heard it's a mix of suspense and da, which sounds like it could be interesting. Plus, the lead actor has won several awards for his past performances, so I'm expecting some solid acting." isSent={false} time="10:00" />
										<ChatMessage message="That sounds like a great idea. I've been wanting to see that movie too. I've read some reviews and they all praise the storyline and the performances. It's been a while since we've seen a good movie. Plus, it would be nice to catch up. Let's do it." isSent={true} time="10:05" />
										<ChatMessage message="Awesome, I'll get the tickets. Do you prefer a matinee or an evening show? Personally, I prefer evening shows. There's something about ending the day with a good movie. Plus, we could grab dinner before the movie. There's a new Italian restaurant that opened recently near the cinema" isSent={false} time="10:00" />
										<ChatMessage message="An evening show sounds perfect. And trying out the new Italian restaurant is a great idea. I've heard they serve an excellent lasagna. Looking forward to it. Let's meet at the restaurant around 6?" isSent={true} time="10:05" />
										<ChatMessage message="Hi there!" isSent={false} time="10:00" />
										<ChatMessage message="Hello! How are you?" isSent={true} time="10:05" />
										<ChatMessage message="I was thinking we could go see that new movie. It's the latest one by that director we both like. I've heard it's a mix of suspense and da, which sounds like it could be interesting. Plus, the lead actor has won several awards for his past performances, so I'm expecting some solid acting." isSent={false} time="10:00" />
										<ChatMessage message="That sounds like a great idea. I've been wanting to see that movie too. I've read some reviews and they all praise the storyline and the performances. It's been a while since we've seen a good movie. Plus, it would be nice to catch up. Let's do it." isSent={true} time="10:05" />
										<ChatMessage message="Awesome, I'll get the tickets. Do you prefer a matinee or an evening show? Personally, I prefer evening shows. There's something about ending the day with a good movie. Plus, we could grab dinner before the movie. There's a new Italian restaurant that opened recently near the cinema" isSent={false} time="10:00" />
										<ChatMessage message="An evening show sounds perfect. And trying out the new Italian restaurant is a great idea. I've heard they serve an excellent lasagna. Looking forward to it. Let's meet at the restaurant around 6?" isSent={true} time="10:05" />
										<ChatMessage message="Hi there!" isSent={false} time="10:00" />
										<ChatMessage message="Hello! How are you?" isSent={true} time="10:05" />
										<ChatMessage message="I was thinking we could go see that new movie. It's the latest one by that director we both like. I've heard it's a mix of suspense and da, which sounds like it could be interesting. Plus, the lead actor has won several awards for his past performances, so I'm expecting some solid acting." isSent={false} time="10:00" />
										<ChatMessage message="That sounds like a great idea. I've been wanting to see that movie too. I've read some reviews and they all praise the storyline and the performances. It's been a while since we've seen a good movie. Plus, it would be nice to catch up. Let's do it." isSent={true} time="10:05" />
										<ChatMessage message="Awesome, I'll get the tickets. Do you prefer a matinee or an evening show? Personally, I prefer evening shows. There's something about ending the day with a good movie. Plus, we could grab dinner before the movie. There's a new Italian restaurant that opened recently near the cinema" isSent={false} time="10:00" />
										<ChatMessage message="An evening show sounds perfect. And trying out the new Italian restaurant is a great idea. I've heard they serve an excellent lasagna. Looking forward to it. Let's meet at the restaurant around 6?" isSent={true} time="10:05" />
										<ChatMessage message="Hi there!" isSent={false} time="10:00" />
										<ChatMessage message="Hello! How are you?" isSent={true} time="10:05" />
										<ChatMessage message="I was thinking we could go see that new movie. It's the latest one by that director we both like. I've heard it's a mix of suspense and da, which sounds like it could be interesting. Plus, the lead actor has won several awards for his past performances, so I'm expecting some solid acting." isSent={false} time="10:00" />
										<ChatMessage message="That sounds like a great idea. I've been wanting to see that movie too. I've read some reviews and they all praise the storyline and the performances. It's been a while since we've seen a good movie. Plus, it would be nice to catch up. Let's do it." isSent={true} time="10:05" />
										<ChatMessage message="Awesome, I'll get the tickets. Do you prefer a matinee or an evening show? Personally, I prefer evening shows. There's something about ending the day with a good movie. Plus, we could grab dinner before the movie. There's a new Italian restaurant that opened recently near the cinema" isSent={false} time="10:00" />
										<ChatMessage message="An evening show sounds perfect. And trying out the new Italian restaurant is a great idea. I've heard they serve an excellent lasagna. Looking forward to it. Let's meet at the restaurant around 6?" isSent={true} time="10:05" />

									</div>
								</div>
								<div className="absolute bottom-0 left-0 right-0 p-2 h-[70px] bg-[#303030]">
									<div className="flex flex-row items-center justify-center h-full">
										<div className="p-2"><EmojiIcon /></div>
										<div className="p-2"><Upload /></div>
										<input
											className="flex-grow bg-[#464646]  h-[50px] p-3 rounded-lg"
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