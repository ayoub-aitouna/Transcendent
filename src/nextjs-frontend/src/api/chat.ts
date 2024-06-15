import { user } from "@/type/auth/user";
export type MessageItem = {
	id: number;
	sender_username: string;
	message: string | File;
	created_at: string;
	seen: boolean;
}


export type roomItem = {
	id: number;
	room_name: string;
	room_icon: string;
	unseen_messages_count: number;
	type: number;
	last_message: MessageItem;
	receiverUser: user[];
	members: user[];
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