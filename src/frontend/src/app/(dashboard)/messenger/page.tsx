"use client";

import React, { ChangeEvent, ReactNode, useEffect, useRef, useState } from "react";
import apiMock from "@/lib/axios-mock";
import { roomItem } from "@/api/chat";
import SendMessage from "@/app/ui/dashboard/messenger/SendMessages";
import { useRouter } from 'next/navigation'
import ChatRoomsPanel from "./ChatRoomsPanel";


const Page = ({ searchParams }: { searchParams?: { chatroom?: string } }) => {
	const [clickedIndex, setClickedIndex] = useState<number>(0);
	const [selectedChat, setSelectedChat] = useState<roomItem | null>(null);
	const chatroom = searchParams?.chatroom || '';
	const router = useRouter();
	const socket = useRef<WebSocket | null>(null);

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
		setClickedIndex(index);
	};

	return (
		<div className="h-full overflow-hidden rounded-xl">
			<div className="h-full flex-1 flex flex-col gap-4">
				<div className="h-full flex flex-row flex-wrap gap-5">
					<ChatRoomsPanel clickedIndex={clickedIndex} handleIconClick={handleIconClick} />
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