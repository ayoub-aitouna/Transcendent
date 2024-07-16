import apiMock from "@/lib/axios-mock";
import { user } from "@/type/auth/user";
import { channel } from "diagnostics_channel";


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
	receiverUser?: { id: string, status: string, username: string, }[];
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

export const GetChatRoomsData = async (q: string | null, filter: boolean) => {
	let response = null;
	if (filter)
		response = await apiMock.get(`/chat/filter-rooms/`);
	else {
		if (!q || q === '') {
			response = await apiMock.get(`/chat/rooms/`);
		}
		else {
			response = await apiMock.get(`/chat/rooms/?q=${q}`);
		}
	}
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

export const RemoveGroupMember = async ({ selectedChat_id, User_id }: { selectedChat_id: number; User_id: number; }) => {
	const formData = new FormData();

	formData.append('user_id', User_id.toString());
	await apiMock.post(`/chat/remove-user/${selectedChat_id}/`);
}

export const GetChatRoom = async (clickedIndex: number, userId: string) => {
	let ChatRoom = null
	if (clickedIndex !== 0) {
		const res = await apiMock.get(`/chat/rooms/${clickedIndex}/`);
		ChatRoom = res.data
	}
	else if (userId) {
		const res = await apiMock.get(`/chat/get-chat-room/${userId}/`);
		ChatRoom = res.data.results[0]
	}
	return ChatRoom as roomItem | null
}

export const RemoveMemberFromGroup = async (id: Number, room_id: number) => {
	try {
		const formData = new FormData();
		formData.append('user_id', id.toString());
		await apiMock.post(`/chat/remove-member/${room_id}/`, formData);
	} catch (error) {
		console.error("Error fetching friends:", error);
	}
};

export const AddMemberFromGroup = async (members: Number[], room_id: Number) => {
	await apiMock.post(`/chat/Add-members/${room_id}/`, {
		"new_members": members
	});
};

export const GroupCustomize = async (name: string, room_id: number, room_icon: File | null) => {
	const formData = new FormData();
	formData.append('new_name', name);
	if (room_icon)
		formData.append('new_icon', room_icon ? room_icon : '');
		await apiMock.post(`/chat/Group-customize/${room_id}/`,formData,{headers: {
			'Content-Type': 'multipart/form-data'
		}});
};