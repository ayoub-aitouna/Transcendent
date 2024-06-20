'use client';

import Filter from "@/app/ui/dashboard/icons/content_area/filters";
import SearchIcon from "@/app/ui/dashboard/icons/messenger/search";
import { MessengerContainer } from "@/app/ui/dashboard/messenger/messenger-container";
import React, { useEffect, useState } from "react";
import { roomItem } from "@/api/chat";
import apiMock from "@/lib/axios-mock";

interface ChatRooms {
	clickedIndex: number;
	handleIconClick: (index: number) => void;
}

const ChatRoomsPanel: React.FC<ChatRooms> = ({ clickedIndex, handleIconClick }) => {
	const [rooms, setRooms] = useState<roomItem[]>([]);

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

		// WebSocket connection
		const socket = new WebSocket(`wss://localhost/ws/rooms/`);

		socket.onmessage = (event) => {
			const data = JSON.parse(event.data);
			console.log('Received message --------->:', data);

			// Extracting relevant details
			const { message, chat_room } = data;
			const roomId = message.room_id.toString();

			setRooms((prevRooms) => {
				const roomIndex = prevRooms.findIndex(room => {
					console.log('Comparing room IDs:', room.id.toString(), roomId);
					return room.id.toString() === roomId;
				});

				if (roomIndex !== -1) {
					console.log('Updating existing room:', roomId);
					const updatedRooms = [...prevRooms];
					updatedRooms[roomIndex] = {
						...updatedRooms[roomIndex],
						last_message: chat_room.last_message,
						unseen_messages_count: chat_room.unseen_messages_count,
					};
					return updatedRooms;
				} else {
					console.log('Adding new room:', roomId);
					return [...prevRooms, {
						id: roomId,
						room_name:  chat_room.room_name,
						room_icon: "http://localhost:8000" + chat_room.room_icon,
						last_message: chat_room.last_message,
						unseen_messages_count: chat_room.unseen_messages_count,
						type: chat_room.type,
						members: chat_room.members,
					}];
				}
			});
		};

		socket.onerror = (error) => {
			console.error('WebSocket error', error);
		};

		return () => {
			socket.close();
		};
	}, []);

	return (
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
								isSelected={clickedIndex === item.id}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ChatRoomsPanel;
