"use client";

import Filter from "@/app/ui/dashboard/icons/content_area/filters";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import SearchIcon from "@/app/ui/dashboard/icons/messenger/search";
import { MessengerContainer } from "@/app/ui/dashboard/messenger/messenger-container";
import apiMock from "@/lib/axios-mock";
import { roomItem } from "@/api/chat";
import SendMessage from "@/app/ui/dashboard/messenger/SendMessages";
import { useRouter } from 'next/navigation'



const Page = ({ searchParams }: { searchParams?: { chatroom?: string } }) => {
	const [rooms, setRooms] = useState<roomItem[]>([]);
	const [clickedIndex, setClickedIndex] = useState<number>(0);
	const [selectedChat, setSelectedChat] = useState<roomItem | null>(null);
	const chatroom = searchParams?.chatroom || '';
	const router = useRouter();
	const socket = useRef<WebSocket | null>(null);

	useEffect(() => {
		const fetchRooms = async () => {
			try {
				const response = await apiMock.get('/chat/rooms/');
				setRooms(response.data.results);
			} catch (error) {
				console.error('Error fetching chat rooms', error);
			}
		};
		fetchRooms();
	}, []);

	useEffect(() => {
		const fetchMessages = async () => {
			if (clickedIndex !== 0) {
				try {
					const response = await apiMock.get(`/chat/rooms/${clickedIndex}/`);
					setSelectedChat(response.data);
				} catch (error) {
					console.error('Error fetching chat messages by clickedIndex', error);
				}
			} else if (chatroom) {
				try {
					const response = await apiMock.get(`/chat/get-chat-room/${chatroom}/`);
					setSelectedChat(response.data.results[0]);
				} catch (error) {
					console.error('Error fetching chat messages by chatroom', error);
				}
			}
		};

		fetchMessages();
	}, [clickedIndex, chatroom]);

	useEffect(() => {
		if (selectedChat && selectedChat.receiverUser && selectedChat.receiverUser.length > 0) {
			router.push(`?chatroom=${selectedChat.receiverUser[0].id}`);
		}
	}, [selectedChat, router]);

	const handleIconClick = (index: number) => {
		setClickedIndex((prevIndex) => (prevIndex === index ? 0 : index));
	};

	useEffect(() => {
		socket.current = new WebSocket('ws://localhost:8000/ws/rooms/');

		socket.current.onopen = () => {
			console.log('WebSocket connected');
		};

		socket.current.onmessage = (event) => {
			const data = JSON.parse(event.data);
			if (data.chat_room) {
				setRooms(prevRooms => {
					const existingRoomIndex = prevRooms.findIndex(room => room.id === data.chat_room.id);
					if (existingRoomIndex !== -1) {
						const updatedRooms = [...prevRooms];
						updatedRooms[existingRoomIndex] = data.chat_room;
						return updatedRooms;
					} else {
						return [...prevRooms, data.chat_room];
					}
				});
				if (data) {
					setRooms(data);
				}
			}
		};

		socket.current.onerror = (error) => {
			console.error('WebSocket error:', error);
		};

		socket.current.onclose = () => {
			console.log('WebSocket closed');
		};
		return () => {
			if(socket.current)
				socket.current.close();
		};
	}, [rooms, socket, selectedChat]);

	return (
		<div className="h-full overflow-hidden rounded-xl">
			<div className="h-full flex-1 flex flex-col gap-4">
				<div className="h-full flex flex-row flex-wrap gap-5">
					<div className="overflow-y-scroll hide-scrollbar w-full sm:w-full lg:max-w-[440px] bg-[#292929] rounded-xl p-4">
						<div className="flex flex-row items-center justify-between p-2 relative">
							<input
								className="flex-row items-center justify-between rounded-lg overflow-hidden bg-[#363636] pl-[60px] p-2 h-[40px] w-[336px]"
								type="text"
								placeholder="Search..."
							/>
							<div className="absolute pl-3 top-1/2 transform -translate-y-1/2">
								<SearchIcon />
							</div>
							<div className="items-end justify-end">
								<Filter />
							</div>
						</div>
						<div className="relative">
							{rooms.map((item) => (
								<div key={item.id}>
									<MessengerContainer
										onClick={() => handleIconClick(item.id)}
										name={item.room_name}
										LastMessage={item.last_message}
										href={item.room_icon}
										messagesNbr={item.unseen_messages_count}
										isSelected={chatroom ? item.id.toString() === chatroom : clickedIndex === item.id}
									/>
								</div>
							))}
						</div>
					</div>
					<div className="flex-1 h-full bg-secondary-400 min-w-[300px] rounded-xl relative overflow-hidden">
						{selectedChat ? (
							<SendMessage selectedChat={selectedChat} />
						) : (
							<div className="flex justify-center items-center flex-col h-full">
								<div className="text-3xl font-bold">Messenger</div>
								<div className="text-lg font-light mt-2">
									Send and receive messages without keeping your phone online.
								</div>
								<div className="text-lg font-light mt-2">
									Use Messenger Transcendent on your PC.
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Page;