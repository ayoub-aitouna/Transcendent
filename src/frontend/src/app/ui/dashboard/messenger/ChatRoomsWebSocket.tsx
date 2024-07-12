'use client'

import { GetChatRoomsData, roomItem } from "@/api/chat";
import { WS_BASE_URL } from "@/constant/api";
import AuthWebSocket from "@/lib/AuthWebSocket";
import { useEffect, useState } from "react";


const ChatRoomsWebSocket = (q: string | null) => {
	const [rooms, setRooms] = useState<roomItem[]>([]);

	useEffect(() => {
		const fetchRooms = async () => {
			try {
				const room = await GetChatRoomsData(q, false);
				setRooms(room);
			} catch (e) {
				console.log("ERROR in fetching rooms data: ", e);
			}
		};
		fetchRooms();

		const socket = new AuthWebSocket(`${WS_BASE_URL}/rooms/`);

		socket.onmessage = (event) => {
			const data = JSON.parse(event.data);
			const { message, chat_room } = data;
			const roomId = message.room_id.toString();

			setRooms((prevRooms: any) => {
				const roomIndex = prevRooms.findIndex((room: any) => room.id.toString() === roomId);
				if (roomIndex !== -1) {
					const updatedRooms = [...prevRooms];
					updatedRooms[roomIndex] = {
						...updatedRooms[roomIndex],
						last_message: chat_room.last_message,
						unseen_messages_count: chat_room.unseen_messages_count,
					};
					return updatedRooms;
				} else {
					return [...prevRooms, {
						id: roomId,
						room_name: chat_room.room_name,
						room_icon: "https://localhost:8000" + chat_room.room_icon,
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
	}, [q]);

	return rooms;
};

export default ChatRoomsWebSocket