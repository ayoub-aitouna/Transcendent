"use client";
import Image from "next/image";
import Filter from "@/app/ui/dashboard/icons/content_area/filters";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import SearchIcon from "@/app/ui/dashboard/icons/messenger/search";
import { MessengerContainer } from "@/app/ui/dashboard/messenger/messenger-container";
import { ChatMessage } from "@/app/ui/dashboard/messenger/chat-message";
import ThreePointsIcon from "@/app/ui/dashboard/icons/messenger/three-points";
import EmojiIcon from "@/app/ui/dashboard/icons/messenger/emoji";
import Upload from "@/app/ui/dashboard/icons/messenger/Upload";
import SendIcon from "@/app/ui/dashboard/icons/messenger/send";
import apiMock from "@/lib/axios-mock";
import { MessageItem, roomItem } from "@/api/chat";
import { io, Socket } from 'socket.io-client';
import SendMessage from "@/app/ui/dashboard/messenger/SendMessages";

// search query is `chatroom`
// example http://localhost:3000/messenger?chatroom=1


const page = () => {

	const [rooms, setRooms] = useState<roomItem[]>([]);
	const [clickedIndex, setClickedIndex] = useState<number | 0>(0);
	const [selectedChat, setSelectedChat] = useState<roomItem>();
	useEffect(() => {
		const fetchMessages = async () => {
			if (clickedIndex !== 0) {
				try {
					const response = await apiMock.get(`/chat/rooms/${clickedIndex}/`);
					setSelectedChat(response.data);
				} catch (error) {
					console.error('Error fetching chat Messages', error);
				}
			}
		};
		fetchMessages();
	}, [clickedIndex]);

	const handleIconClick = (index: number) => {
		setClickedIndex((prevIndex) => (prevIndex === index ? 0 : index));
	};
	useEffect(() => {
		const fetchRooms = async () => {
			try {
				const response = await apiMock.get('/chat/rooms/');
				setRooms(response.data.results);
			} catch (error) {
				console.error('Error fetching chat Rooms', error);
			}
		};
		fetchRooms();
	}, []);
	return (
		<>
			<div className='h-full  overflow-hidden rounded-xl'>
				<div className='h-full flex-1 flex flex-col gap-4'>
					<div className='h-full flex flex-row flex-wrap gap-5'>
						<div className='  overflow-y-scroll hide-scrollbar  w-full sm:w-full  lg:max-w-[440px] bg-[#292929] rounded-xl p-4'>
							<div className='flex flex-row items-center justify-between p-2 relative'>
								<input
									className='flex-row items-center justify-between rounded-lg overflow-hidden bg-[#363636] pl-[60px] p-2 h-[40px] w-[336px]'
									type='text'
									placeholder='Search...'
								/>
								<div className='absolute pl-3 top-1/2 transform -translate-y-1/2'>
									<SearchIcon />
								</div>
								<div className=' items-end justify-end'>
									<Filter />
								</div>
							</div>
							<div className='relative'>
								{rooms && rooms.map((item, index) => (
									<div key={index}>
										<MessengerContainer
											name={item.room_name}
											href={item.room_icon}
											LastMessage={item.last_message}
											messagesNbr={item.unseen_messages_count}
											isSelected={clickedIndex === item.id}
											onClick={() => handleIconClick(item.id)}
										/>
									</div>
								))}
							</div>
						</div>
						<div
							className={`flex-1 h-full bg-secondary-400  min-w-[300px]  rounded-xl relative overflow-hidden`}>
							{selectedChat ? (
								<div className=''>
									<SendMessage selectedChat={selectedChat || {}} />
								</div>
							) : (
								<div className='flex justify-center items-center flex-col h-full'>
									<div className='text-3xl font-bold'>Messenger</div>
									<div className='text-lg font-light mt-2'>
										Send and receive messages without keeping your phone online.
									</div>
									<div className='text-lg font-light mt-2'>
										Use Messenger Transcendent on your PC.
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default page;
