// app/messenger/group/context/UserContext

'use client'

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
	isCreating: boolean;
	addUser: (user: user) => void;
	removeUser: (userId: number) => void;
	addRemoveName: (name: string) => void;
	addRemoveImage: (icon: File | null) => void;
	setIsCreating: (isCreating: boolean) => void;
}

const initialState: UserContextType = {
	users: [],
	group_name: "",
	icon: null,
	isCreating: false,
	addUser: () => { },
	removeUser: () => { },
	addRemoveName: () => { },
	addRemoveImage: () => { },
	setIsCreating: () => { },
};

export const UserContext = createContext<UserContextType>(initialState);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [users, setUsers] = useState<user[]>([]);
	const [group_name, setName] = useState<string | ''>('');
	const [icon, setIcon] = useState<File | null>(null);
	const [isCreating, setIsCreating] = useState<boolean>(false);

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
		<UserContext.Provider value={{ users, group_name, icon, isCreating, addUser, addRemoveName, addRemoveImage, removeUser ,setIsCreating}}>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = () => useContext(UserContext);
