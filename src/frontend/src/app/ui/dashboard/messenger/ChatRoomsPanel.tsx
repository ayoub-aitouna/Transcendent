import { MessengerContainer } from "@/app/ui/dashboard/messenger/messenger-container";
import { GetChatRoomsData, roomItem } from "@/api/chat";
import { ChatSearchBar } from "@/app/ui/dashboard/messenger/ChatsearchBar";
import { useContext, useEffect, useState } from "react";
import ChatRoomsWebSocket from "./ChatRoomsWebSocket";
import { WS_BASE_URL } from "@/constant/api";
import AuthWebSocket from "@/lib/AuthWebSocket";
import { UserContext } from "@/app/(dashboard)/messenger/context/UserContext";


interface ChatRooms {
	clickedIndex: number;
	handleIconClick: (index: number) => void;
	q: string;
}

const ChatRoomsPanel: React.FC<ChatRooms> = ({ clickedIndex, handleIconClick, q }) => {
	const [filter, setFilter] = useState<boolean>(false);
	const [rooms, setRooms] = useState<roomItem[]>([]);
	const { isChanged, room_id, room_icon, room_name, setIsChanged } = useContext(UserContext);



	const handleFilterClick = () => {
		setFilter(!filter);
	};

	useEffect(() => {
		const fetchRooms = async () => {

			try {
				const room = await GetChatRoomsData(q, filter);
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

			setRooms((prevRooms) => {
				const roomIndex = prevRooms.findIndex((room) => room.id.toString() === roomId);
				console.log('New room added', chat_room.members);
				if (roomIndex !== -1) {
					const updatedRooms = [...prevRooms];
					updatedRooms[roomIndex] = {
						...updatedRooms[roomIndex],
						room_icon: room_icon || chat_room.room_icon,
						room_name: room_name || chat_room.room_name,
						last_message: chat_room.last_message,
						unseen_messages_count: chat_room.unseen_messages_count,
						members: chat_room.members,
					};
					return updatedRooms;
				} else {
					return [...prevRooms, {
						id: roomId,
						room_name: chat_room.room_name,
						room_icon: chat_room.room_icon,
						last_message: chat_room.last_message,
						unseen_messages_count: chat_room.unseen_messages_count,
						type: chat_room.type,
						members: chat_room.members,
						admin: chat_room.admin,
					}];
				}
			});
		};
		socket.onopen = () => {
			console.log('Rooms Socket is opened')
		}
		socket.onerror = (error) => {
			console.error('WebSocket error', error);
		};

		return () => {
			socket.close();
		};
	}, [q, filter]);

	return (
		<div className="h-full flex flex-row flex-wrap gap-5">
			<div className="overflow-y-scroll hide-scrollbar w-full sm:w-full lg:max-w-[440px] bg-[#292929] rounded-xl p-4">
				<div className="flex flex-row items-center justify-between p-2 relative">
					<ChatSearchBar onFilterClick={handleFilterClick} filter={filter} />
				</div>
				<div className="relative">
					{rooms.map((item) => {
						if (isChanged && item.id === room_id) {
							item.room_icon = room_icon ? room_icon : item.room_icon;
							item.room_name = room_name ? room_name : item.room_name;
							setIsChanged(false);
						}

						return (
							<div key={item.id}>
								<MessengerContainer
									onClick={() => handleIconClick(item.id)}
									name={item.room_name} // Use the possibly updated name
									LastMessage={item.last_message}
									href={item.room_icon} // Use the possibly updated href
									messagesNbr={item.unseen_messages_count}
									isSelected={clickedIndex === item.id}
									id={item.id}
								/>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default ChatRoomsPanel;