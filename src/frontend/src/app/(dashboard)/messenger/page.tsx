"use client"

import React, { use, useEffect, useState } from "react";
import apiMock from "@/lib/axios-mock";
import { GetChatRoom, roomItem } from "@/api/chat";
import SendMessages from "@/app/ui/dashboard/messenger/SendMessages";
import { useRouter } from 'next/navigation'
import ChatRoomsPanel from "../../ui/dashboard/messenger/ChatRoomsPanel";
import { GroupInfo } from "./group/group-info";
import { user, UserContext, useUserContext } from "./context/UserContext";
import { set } from "react-hook-form";

export const SmallWindowChat = ({ selectedChat, clickedIndex, chatroom, clickedGroup, handleIconClick, handleClickGroup, setclickedIndex, q, windowWidth }: {
	selectedChat: roomItem | null;
	clickedIndex: number;
	chatroom: string;
	clickedGroup: boolean;
	handleIconClick: (index: number) => void;
	handleClickGroup: (index: boolean) => void;
	setclickedIndex: (index: number) => void;
	q: string;
	windowWidth: number;
}) => {
	return (
		<div className="h-full overflow-hidden rounded-xl">
			<div className="h-full flex-1 flex flex-col gap-4">
				<div className="h-full flex  lex-row flex-wrap gap-5">
					{!selectedChat &&
						< ChatRoomsPanel clickedIndex={clickedIndex} handleIconClick={handleIconClick} q={q} />
					}
					{
						!clickedGroup &&
						<div className="flex-1  bg-secondary-400  rounded-xl  overflow-hidden relative">
							{selectedChat &&
								<SendMessages selectedChat={selectedChat} clickedGroup={handleClickGroup} handleIconClick={handleIconClick} clickedIndex={setclickedIndex} windowWidth={true} />
							}
						</div>
					}
					{clickedGroup && (
						<>
							{windowWidth > 600 && (
								<div className="flex-1 bg-secondary-400 rounded-xl overflow-hidden relative">
									{selectedChat && (
										<SendMessages
											selectedChat={selectedChat}
											clickedGroup={handleClickGroup}
											handleIconClick={handleIconClick}
											clickedIndex={setclickedIndex}
											windowWidth={true}
										/>
									)}
								</div>
							)}
							<GroupInfo selectedChat={selectedChat} setClickedGroup={handleClickGroup} />
						</>
					)}
				</div>
			</div>
		</div>
	);
}

const Page = ({ searchParams }: { searchParams?: { chatroom?: string, q?: string } }) => {
	const [clickedIndex, setClickedIndex] = useState<number>(0);
	const [clickedGroup, setClickedGroup] = useState<boolean>(false);
	const [selectedChat, setSelectedChat] = useState<roomItem | null>(null);
	const chatroom = searchParams?.chatroom || '';
	const q = searchParams?.q || '';
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const { users, addUser, removeUser, setRoomIcon, setRoomName } = useUserContext();

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const response = await GetChatRoom(clickedIndex, chatroom);
				setSelectedChat(response);
				// if (chatroom && selectedChat)
				// 	router.push(`/messenger`);
			} catch (error) {
				console.error('Error fetching chat messages by chatroom', error);
			}
		};
		fetchMessages();
	}, [clickedIndex, chatroom]);

	useEffect(() => {
		if (users.length > 0) {
			users.forEach((user) => {
				removeUser(user.id);
			});
			console.log("empty users: ", users);
		}
		if (selectedChat?.room_icon) setRoomIcon(selectedChat.room_icon);
		if (selectedChat?.room_name) setRoomName(selectedChat.room_name);
		if (selectedChat?.type === 'group') {
			selectedChat.members.forEach((member) => {
				addUser(member);
			});
			console.log("add users: ", users);
		}
	}, [selectedChat]);

	const handleIconClick = (index: number) => {
		setClickedIndex(index);
	};

	const handleClickGroup = async (index: boolean) => {
		setClickedGroup(index);

	};

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	// useEffect(() => {
	// 	const handleClick = (event: MouseEvent) => {
	// 		const target = event.target as HTMLElement;
	// 		const panel = document.getElementById("group-info-panel");
	// 		if (panel && panel.contains(target)) {
	// 			setClickedGroup(false);
	// 		}
	// 	};

	// 	document.addEventListener("mousedown", handleClick);
	// 	return () => {
	// 		document.removeEventListener("mousedown", handleClick);
	// 	};
	// }, []);




	return (
		<div className="h-[100%] overflow-hidden rounded-xl min-w-[350px]">
			{
				windowWidth < 1024 ? <SmallWindowChat selectedChat={selectedChat} clickedIndex={clickedIndex} chatroom={chatroom} clickedGroup={clickedGroup} handleIconClick={handleIconClick} handleClickGroup={handleClickGroup} setclickedIndex={setClickedIndex} q={q} windowWidth={windowWidth} />
					: (
						<div className="h-full w-full flex-1 flex flex-col gap-4">
							<div className="h-full flex fex-row flex-wrap gap-5 w-full">
								<div id="group-info-panel" >
									<ChatRoomsPanel clickedIndex={clickedIndex} handleIconClick={handleIconClick} q={q} />
								</div>
								<div className="flex-1  bg-secondary-400  rounded-xl  overflow-hidden relative">
									{selectedChat ? (
										<SendMessages selectedChat={selectedChat} clickedGroup={handleClickGroup} handleIconClick={handleIconClick} clickedIndex={setClickedIndex} windowWidth={false} />
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
								{clickedGroup && selectedChat?.type === 'group' &&
									<GroupInfo selectedChat={selectedChat} setClickedGroup={handleClickGroup} />
								}
							</div>
						</div>
					)
			}
		</div>
	);
};

export default Page;
