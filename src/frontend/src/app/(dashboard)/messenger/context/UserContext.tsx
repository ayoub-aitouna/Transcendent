// app/messenger/group/context/UserContext

'use client'

import { roomItem } from '@/api/chat';
import { createContext, ReactNode, useContext, useState } from 'react';
export type user = {
	id: number;
	username: string;
	image_url: string;
	level: number;
}
interface UserContextType {
	users: user[];
	group_name: string | null;
	icon: File | null;
	room_name: string | undefined;
	room_icon: string | undefined;
	isChanged: boolean;
	room_id: number;
	newRoom: roomItem | null;
	setRoomIcon: (icon: string) => void;
	setRoomName: (name: string) => void;
	addUser: (user: user) => void;
	removeUser: (userId: number) => void;
	addRemoveName: (name: string) => void;
	addRemoveImage: (icon: File | null) => void;
	setIsChanged: (isChanged: boolean) => void;
	setRoomId: (id: number) => void;
	setNewRoom: (room: roomItem | null) => void;
}

const initialState: UserContextType = {
	users: [],
	group_name: "",
	icon: null,
	room_name: "",
	room_icon: "",
	isChanged: false,
	room_id: 0,
	newRoom: null,
	addUser: () => { },
	addRemoveName: () => { },
	addRemoveImage: () => { },
	removeUser: () => { },
	setRoomIcon: () => { },
	setRoomName: () => { },
	setIsChanged: () => { },
	setRoomId: () => { },
	setNewRoom: () => { },
};

export const UserContext = createContext<UserContextType>(initialState);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [users, setUsers] = useState<user[]>([]);
	const [group_name, setName] = useState<string>('');
	const [icon, setIcon] = useState<File | null>(null);
	const [room_icon, setRoomIcon] = useState<string | undefined>('');
	const [room_name, setRoomName] = useState<string | undefined>('');
	const [isChanged, setIsChanged] = useState<boolean>(false);
	const [room_id, setRoomId] = useState<number>(0);
	const [newRoom, setNewRoom] = useState<roomItem | null>(null);

	const addUser = (user: user) => {
		setUsers(prevUsers => [...prevUsers, user]);
	};

	const removeUser = (userId: number) => {
		setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
	};

	const addRemoveImage = (icon: File | null) => {
		setIcon(icon);
	};
	const addRemoveName = (group_name: string | '') => {
		setName(group_name);
	};


	return (
		<UserContext.Provider value={{
			users,
			group_name,
			icon,
			room_name,
			room_icon,
			isChanged,
			room_id,
			newRoom,
			addUser,
			addRemoveName,
			addRemoveImage,
			removeUser,
			setRoomIcon,
			setRoomName,
			setIsChanged,
			setRoomId,
			setNewRoom
		}}>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = () => useContext(UserContext);
