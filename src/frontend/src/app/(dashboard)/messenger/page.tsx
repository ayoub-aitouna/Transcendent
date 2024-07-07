"use client"

import React, { useEffect, useState } from "react";
import apiMock from "@/lib/axios-mock";
import { roomItem } from "@/api/chat";
import SendMessages from "@/app/ui/dashboard/messenger/SendMessages";
import { useRouter } from 'next/navigation'
import ChatRoomsPanel from "../../ui/dashboard/messenger/ChatRoomsPanel";
import { GroupInfo } from "./group/group-info";
import { user, UserContext, useUserContext } from "./context/UserContext";


const Page = ({ searchParams }: { searchParams?: { chatroom?: string, q?: string } }) => {
	const [clickedIndex, setClickedIndex] = useState<number>(0);
	const [clickedGroup, setClickedGroup] = useState<boolean>(false);
	const [selectedChat, setSelectedChat] = useState<roomItem | null>(null);
	const chatroom = searchParams?.chatroom || '';
	const q = searchParams?.q || '';
	const router = useRouter();
	const { users, addUser, removeUser, setIsCreating } = useUserContext();

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
			else
				setSelectedChat(null)
		};

		fetchMessages();
	}, [clickedIndex, chatroom]);

	const handleIconClick = (index: number) => {
		setClickedIndex(index);
	};

	const handleClickGroup = async (index: boolean) => {
		setClickedGroup(index);
		if (selectedChat && users.length === 0 && clickedIndex !== 0 && index) {
			setIsCreating(false);
			selectedChat.members.forEach((member: user) => {
				addUser(member);
			});
		}
		else if (selectedChat && users.length > 0 && index === false) {
			users.forEach((user) => {
				removeUser(user.id);
			});
		}

	};
	// useEffect(() => {
	// 	if (selectedChat && clickedIndex) {
	// 		router.push("/messenger/?chatroom=" + clickedIndex);
	// 	}
	// }, [clickedIndex])


	return (
		<div className="h-full overflow-hidden rounded-xl">
			<div className="h-full flex-1 flex flex-col gap-4">
				<div className="h-full flex f lex-row flex-wrap gap-5">
					<ChatRoomsPanel clickedIndex={clickedIndex} handleIconClick={handleIconClick} q={q} />
					<div className="flex-1 h-full bg-secondary-400  rounded-xl relative overflow-hidden">
						{selectedChat ? (
							<SendMessages selectedChat={selectedChat} clickedGroup={handleClickGroup} handleIconClick={handleIconClick} />
						) : !chatroom && (
							<div className="flex justify-center items-center flex-col h-full">
								<div className="text-3xl font-bold">Messenger</div>
								<div className="text-lg font-light mt-2">
									Send and receive messages without keeping your phone online.
								</div>
								<div className="text-lg font-light mt-2">
									Use Messenger Transcendent on your PC.
								</div>
							</div>
						)
						}
					</div>
					{clickedGroup &&
						<GroupInfo selectedChat={selectedChat} setClickedGroup={handleClickGroup} />
					}
				</div>
			</div>
		</div>
	);
};

export default Page;
