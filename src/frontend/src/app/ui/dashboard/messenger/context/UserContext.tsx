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
    addUser: (user: user) => void;
    removeUser: (userId: number) => void;
}

const initialState: UserContextType = {
    users: [],
    addUser: () => {},
    removeUser: () => {},
};

export const UserContext = createContext<UserContextType>(initialState);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [users, setUsers] = useState<user[]>([]);

    const addUser = (user: user) => {
        setUsers(prevUsers => [...prevUsers, user]);
    };

    const removeUser = (userId: number) => {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    };

    return (
        <UserContext.Provider value={{ users, addUser, removeUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);
