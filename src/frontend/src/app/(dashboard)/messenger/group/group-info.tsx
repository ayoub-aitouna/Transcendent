'use client'

import { useAppSelector } from "@/redux/store";
import GroupsMembers from "../../../ui/dashboard/messenger/group-members";
import { roomItem } from "@/api/chat";
import Image from "next/image";
import { use, useContext, useEffect, useState } from "react";
import Confirm from "@/app/ui/modal/confirm";
import apiMock from "@/lib/axios-mock";
import { useModal } from "@/app/provider/modal-provider";
import { UserContext } from "../context/UserContext";
import Link from "next/link";


export const GroupInfo = ({ selectedChat, setClickedGroup }:
	{
		selectedChat: roomItem | null;
		setClickedGroup: (index: boolean) => void;

	}) => {
	const [AddMember, setAddMember] = useState<boolean>(false);
	const { username } = useAppSelector((state) => state.user.user);
	const isAdmin = selectedChat?.admin && selectedChat?.admin.username === username
	const { OpenModal, CancelModal } = useModal();
	const { users, isCreating } = useContext(UserContext);

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			const panel = document.getElementById("Group-infoPanel");
			if (panel && !panel.contains(target)) {
				setClickedGroup(false);
			}
		};
		document.addEventListener("mousedown", handleOutsideClick);
		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, []);
	useEffect(() => {
		if (isCreating) {
			setAddMember(true);
		}
		const AddMemberFromGroup = async () => {
			if (AddMember && users.length > 0 && !isCreating) {
				try {
					const formData = new FormData();
					users.forEach((user) => {
						formData.append("input_members", user.id.toString());
					})
					await apiMock.post(`/chat/Add-members/${selectedChat?.id}/`, formData);
				} catch (error) {
					console.error("Error fetching friends:", error);
				}
			}
		};
		AddMemberFromGroup();
	}, [AddMember])

	const confirmAddUser = () => {
		OpenModal(
			<Confirm
				title='Are you sure you want Add this user?'
				body='The user well no long part of that Group Chat.'
				onConfirm={() => {
					setAddMember(true);
					CancelModal();
				}}
				onCancel={() => CancelModal()}
			/>
		);
	}


	return (
		<div id="Group-infoPanel" className="flex-1 flex flex-col h-full lg:max-w-[440px] bg-secondary-400 rounded-xl relative overflow-hidden py-2">
			<div className="flex justify-center flex-col  rounded-md m-3 h-[330px] items-center bg-[#161616]">
				<Image className="bg-white rounded-full border-white border-[2px] h-[200px] w-[200px]" src={selectedChat?.room_icon || "/assets/images/lol.png"} width={200} height={200} quality={100} alt="Coming soon" />
				<div className="flex font-bold text-[18px] flex-row m-4">
					{selectedChat?.room_name}
					<button className="ml-2 bg-primary-400 text-white rounded-md px-1 py-1" >
						{
							isAdmin &&
							<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M2.25 15.75V12.5625L12.15 2.68125C12.3 2.54375 12.4657 2.4375 12.6473 2.3625C12.8287 2.2875 13.0192 2.25 13.2187 2.25C13.4182 2.25 13.612 2.2875 13.8 2.3625C13.988 2.4375 14.1505 2.55 14.2875 2.7L15.3187 3.75C15.4687 3.8875 15.5782 4.05 15.6472 4.2375C15.7162 4.425 15.7505 4.6125 15.75 4.8C15.75 5 15.7157 5.19075 15.6472 5.37225C15.5787 5.55375 15.4692 5.71925 15.3187 5.86875L5.4375 15.75H2.25ZM13.2 5.85L14.25 4.8L13.2 3.75L12.15 4.8L13.2 5.85Z" fill="#878787" />
							</svg>
						}
					</button>
				</div>
			</div>
			<div className="flex h-full flex-col flex-1 rounded-md m-3  overflow-y-scroll hide-scrollbar  bg-[#161616]">
				<div className="flex flex-row py-3 px-5">
					<div className="flex font-normal text-[16px] items-start justify-start w-full">
						{selectedChat?.members.length} members
					</div>
					<Link href={'/messenger/group/choice-members'} className="items-end justify-end" onClick={confirmAddUser}>
						{
							isAdmin &&
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M12.5002 3.33337C11.6161 3.33337 10.7683 3.68456 10.1431 4.30968C9.51802 4.93481 9.16683 5.78265 9.16683 6.66671C9.16683 7.55076 9.51802 8.39861 10.1431 9.02373C10.7683 9.64885 11.6161 10 12.5002 10C13.3842 10 14.2321 9.64885 14.8572 9.02373C15.4823 8.39861 15.8335 7.55076 15.8335 6.66671C15.8335 5.78265 15.4823 4.93481 14.8572 4.30968C14.2321 3.68456 13.3842 3.33337 12.5002 3.33337ZM12.5002 4.91671C12.73 4.91671 12.9575 4.96197 13.1699 5.04992C13.3822 5.13786 13.5751 5.26677 13.7376 5.42927C13.9001 5.59177 14.029 5.78469 14.117 5.99701C14.2049 6.20933 14.2502 6.43689 14.2502 6.66671C14.2502 6.89652 14.2049 7.12408 14.117 7.3364C14.029 7.54872 13.9001 7.74164 13.7376 7.90414C13.5751 8.06665 13.3822 8.19555 13.1699 8.2835C12.9575 8.37144 12.73 8.41671 12.5002 8.41671C12.2704 8.41671 12.0428 8.37144 11.8305 8.2835C11.6181 8.19555 11.4252 8.06665 11.2627 7.90414C11.1002 7.74164 10.9713 7.54872 10.8834 7.3364C10.7954 7.12408 10.7502 6.89652 10.7502 6.66671C10.7502 6.20258 10.9345 5.75746 11.2627 5.42927C11.5909 5.10108 12.036 4.91671 12.5002 4.91671ZM3.3335 5.83337V8.33337H0.833496V10H3.3335V12.5H5.00016V10H7.50016V8.33337H5.00016V5.83337H3.3335ZM12.5002 10.8334C10.2752 10.8334 5.8335 11.9417 5.8335 14.1667V16.6667H19.1668V14.1667C19.1668 11.9417 14.7252 10.8334 12.5002 10.8334ZM12.5002 12.4167C14.9752 12.4167 17.5835 13.6334 17.5835 14.1667V15.0834H7.41683V14.1667C7.41683 13.6334 10.0002 12.4167 12.5002 12.4167Z" fill="#F8F8F8" />
							</svg>
						}
					</Link>
				</div>
				<div className="flex flex-col mx-3">
					{
						selectedChat && selectedChat?.members && selectedChat?.admin &&
						[...selectedChat.members]
							.sort((a, b) => a.username === selectedChat?.admin.username ? -1 : b.username === selectedChat?.admin.username ? 1 : 0)
							.map((user, index) => (
								<GroupsMembers name={user.username} key={user.id} {...user} selectedChat={selectedChat} />
							))
					}
				</div>
			</div>
		</div>
	)
}

