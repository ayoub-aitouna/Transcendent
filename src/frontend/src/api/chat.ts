import apiMock from "@/lib/axios-mock";
import { user } from "@/type/auth/user";


export type MessageItem = {
	id: number;
	sender_username: string;
	message: string;
	image_file: string | null;
	created_at: string;
	seen: boolean;
}


export type roomItem = {
	id: number;
	room_name: string;
	room_icon: string;
	unseen_messages_count: number;
	type: string;
	last_message: MessageItem;
	receiverUser?: { id: string, status:string }[];
	members: user[];
	admin: user;
}

export type roomPrivateItem = {
	id: number;
	room_name: string;
	room_icon: string;
	unseen_messages_count: number;
	type: number;
	last_message: MessageItem;
	receiverUser: user;
	members: user[];
}

export const GetChatRoomsData = async (q: string | null) => {
	let response = null;
	if (!q || q === '') {
		response = await apiMock.get(`/chat/rooms/`);
	} 
	else {
		response = await apiMock.get(`/chat/rooms/?q=${q}`);
	}
	return response?.data.results  as roomItem[];
};

export const GetFiltersRooms = async () => {
	let response = null;
		response = await apiMock.get(`/chat/filter-rooms/`);
	return response?.data.results as roomItem[];
};

export const GetChatMessages = async (id: number) => {
	let response = null;
		response = await apiMock.get(`/chat/room/${id}/`);
	return response?.data.results as MessageItem[]
};

export const ClearChat = async (id: number) => {
	await apiMock.post(`/chat/clear-chat/${id}/`);
};

export const DeleteChat = async (id: number) => {
	await apiMock.post(`/chat/Delete-chat/${id}/`);
};

export const  RemoveGroupMember = async ({ selectedChat_id, User_id }: { selectedChat_id: number; User_id: number; }) => {
	const formData = new FormData();

	formData.append('user_id', User_id.toString());
	await apiMock.post(`/chat/remove-user/${selectedChat_id}/`);
}