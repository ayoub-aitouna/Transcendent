"use client"

import React, { ChangeEvent, ReactNode, useEffect, useRef, useState } from "react";
import apiMock from "@/lib/axios-mock";
import { roomItem } from "@/api/chat";
import SendMessages from "@/app/ui/dashboard/messenger/SendMessages";
import { useRouter } from 'next/navigation'
import ChatRoomsPanel from "../../ui/dashboard/messenger/ChatRoomsPanel";
import Image from "next/image";
import GroupsContainer from "@/app/ui/dashboard/messenger/Group-container";
import GroupsMembers from "@/app/ui/dashboard/messenger/group-members";
import { useAppSelector } from "@/redux/store";


const Page = ({ searchParams }: { searchParams?: { chatroom?: string, q?: string } }) => {
	const { username } = useAppSelector((state) => state.user.user);
	const [clickedIndex, setClickedIndex] = useState<number>(0);
	const [clickedGroup, setClickedGroup] = useState<boolean>(false);
	const [selectedChat, setSelectedChat] = useState<roomItem | null>(null);
	const chatroom = searchParams?.chatroom || '';
	const q = searchParams?.q || '';
	const router = useRouter();

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
		};

		fetchMessages();
	}, [clickedIndex, chatroom]);

	useEffect(() => {
		if (selectedChat && selectedChat.receiverUser && selectedChat.receiverUser.length > 0 && selectedChat.type === "private") {
			if (q)
				router.push(`?chatroom=${selectedChat.receiverUser[0].id}&q=${q}`);
			else
				router.push(`?chatroom=${selectedChat.receiverUser[0].id}`);

		}
		if (selectedChat && selectedChat.receiverUser && selectedChat.receiverUser.length > 0 && selectedChat.type === "group")
			router.push(`?chatroom=`)
	}, [selectedChat, router]);

	const handleIconClick = (index: number) => {
		setClickedIndex(index);
	};

	const handleClickGroup = () => {
		setClickedGroup(!clickedGroup);
	};
	const isAdmin = selectedChat?.admin && selectedChat?.admin.username === username
	return (
		<div className="h-full overflow-hidden rounded-xl">
			<div className="h-full flex-1 flex flex-col gap-4">
				<div className="h-full flex flex-row flex-wrap gap-5">
					<ChatRoomsPanel clickedIndex={clickedIndex} handleIconClick={handleIconClick} q={q} />
					<div className="flex-1 h-full bg-secondary-400  rounded-xl relative overflow-hidden">
						{selectedChat ? (
							<SendMessages selectedChat={selectedChat} clickedGroup={handleClickGroup} />
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
					{clickedGroup && (
						<div className="flex-1 h-full lg:max-w-[440px] bg-secondary-400  rounded-xl relative overflow-hidden">
							<div className="flex justify-center flex-col  rounded-md m-3 h-[330px] items-center bg-[#161616]">
								<Image className="bg-white rounded-full border-white border-[2px]" src={selectedChat?.room_icon || "/assets/images/lol.png"} width={200} height={200} alt="Coming soon" />
								<div className="flex font-bold text-[18px] flex-row m-4">
									{selectedChat?.room_name}
									<button className="ml-2 bg-primary-400 text-white rounded-md px-1 py-1">
										{
											isAdmin &&
											<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M2.25 15.75V12.5625L12.15 2.68125C12.3 2.54375 12.4657 2.4375 12.6473 2.3625C12.8287 2.2875 13.0192 2.25 13.2187 2.25C13.4182 2.25 13.612 2.2875 13.8 2.3625C13.988 2.4375 14.1505 2.55 14.2875 2.7L15.3187 3.75C15.4687 3.8875 15.5782 4.05 15.6472 4.2375C15.7162 4.425 15.7505 4.6125 15.75 4.8C15.75 5 15.7157 5.19075 15.6472 5.37225C15.5787 5.55375 15.4692 5.71925 15.3187 5.86875L5.4375 15.75H2.25ZM13.2 5.85L14.25 4.8L13.2 3.75L12.15 4.8L13.2 5.85Z" fill="#878787" />
											</svg>
										}
									</button>
								</div>
							</div>
							<div className="flex  flex-col  rounded-md m-3 h-[300px] overflow-y-scroll hide-scrollbar max-h-[500px]  bg-[#161616]">
								<div className="flex flex-row py-3 px-5">
									<div className="flex font-normal text-[16px] items-start justify-start w-full">
										{selectedChat?.members.length} members
									</div>
									<div className="items-end justify-end">
										{
											isAdmin &&
											<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M12.5002 3.33337C11.6161 3.33337 10.7683 3.68456 10.1431 4.30968C9.51802 4.93481 9.16683 5.78265 9.16683 6.66671C9.16683 7.55076 9.51802 8.39861 10.1431 9.02373C10.7683 9.64885 11.6161 10 12.5002 10C13.3842 10 14.2321 9.64885 14.8572 9.02373C15.4823 8.39861 15.8335 7.55076 15.8335 6.66671C15.8335 5.78265 15.4823 4.93481 14.8572 4.30968C14.2321 3.68456 13.3842 3.33337 12.5002 3.33337ZM12.5002 4.91671C12.73 4.91671 12.9575 4.96197 13.1699 5.04992C13.3822 5.13786 13.5751 5.26677 13.7376 5.42927C13.9001 5.59177 14.029 5.78469 14.117 5.99701C14.2049 6.20933 14.2502 6.43689 14.2502 6.66671C14.2502 6.89652 14.2049 7.12408 14.117 7.3364C14.029 7.54872 13.9001 7.74164 13.7376 7.90414C13.5751 8.06665 13.3822 8.19555 13.1699 8.2835C12.9575 8.37144 12.73 8.41671 12.5002 8.41671C12.2704 8.41671 12.0428 8.37144 11.8305 8.2835C11.6181 8.19555 11.4252 8.06665 11.2627 7.90414C11.1002 7.74164 10.9713 7.54872 10.8834 7.3364C10.7954 7.12408 10.7502 6.89652 10.7502 6.66671C10.7502 6.20258 10.9345 5.75746 11.2627 5.42927C11.5909 5.10108 12.036 4.91671 12.5002 4.91671ZM3.3335 5.83337V8.33337H0.833496V10H3.3335V12.5H5.00016V10H7.50016V8.33337H5.00016V5.83337H3.3335ZM12.5002 10.8334C10.2752 10.8334 5.8335 11.9417 5.8335 14.1667V16.6667H19.1668V14.1667C19.1668 11.9417 14.7252 10.8334 12.5002 10.8334ZM12.5002 12.4167C14.9752 12.4167 17.5835 13.6334 17.5835 14.1667V15.0834H7.41683V14.1667C7.41683 13.6334 10.0002 12.4167 12.5002 12.4167Z" fill="#F8F8F8" />
											</svg>
										}
									</div>
								</div>
								<div className="flex flex-col mx-3">
									{selectedChat && selectedChat?.members && selectedChat?.members.map((user, index) => (
										<GroupsMembers name={user.username} key={user.id} {...user} selectedChat={selectedChat} />
									))}
								</div>
							</div>
						</div>
					)

					}
				</div>
			</div>
		</div>
	);
};

export default Page;