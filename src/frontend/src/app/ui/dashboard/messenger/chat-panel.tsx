'use client'
import { ClearChat, DeleteChat, RemoveMemberFromGroup, roomItem } from "@/api/chat";
import React, { use, useContext, useEffect, useState, } from "react";
import ThreePointsIcon from "../icons/messenger/three-points";
import Link from "next/link";
import Image from "next/image";
import { ImageSrc } from "@/lib/ImageSrc";
import { useRouter } from 'next/navigation'
import { useModal } from "@/app/provider/modal-provider";
import Confirm from "../../modal/confirm";
import { UserContext } from "@/app/(dashboard)/messenger/context/UserContext";
import { BlockUser } from "@/api/user";
import { useAppSelector } from "@/redux/store";
export default function ChatPanel({ selectedChat, handleGroup, handleIconClick }:
	{
		selectedChat: roomItem;
		handleGroup: (index: boolean) => void;
		handleIconClick: (index: number) => void;
	}) {
	const { OpenModal, CancelModal } = useModal();

	const [clickedThreePoints, setClickedThreePoints] = useState(false);
	const { id } = useAppSelector((state) => state.user.user);
	const { users, room_icon, room_name, removeUser } = useContext(UserContext);
	const router = useRouter();

	const isAdmin = selectedChat && selectedChat.admin && selectedChat.admin.id === id


	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			const panel = document.getElementById("Group-info");
			if (panel && !panel.contains(target)) {
				setClickedThreePoints(false);
			}
		};
		document.addEventListener("mousedown", handleOutsideClick);
		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, []);


	const confirmClear = () => {
		OpenModal(
			<Confirm
				title='Are you sure you want to Clear this Chat?'
				body='The room will remain, but all messages will be deleted'
				onCancel={() => CancelModal()}
				onConfirm={async () => {
					try {
						await ClearChat(selectedChat.id);
						CancelModal();
						window.location.reload();
					} catch (error) {
						console.error("Error clearing chat:", error);
					}
				}}
			/>
		);
	}

	const confirmDelete = () => {
		OpenModal(
			<Confirm
				title='Are you sure you want to delete this Chat?'
				body='This action will permanently remove the chat room and all messages.'
				onCancel={() => CancelModal()}
				onConfirm={async () => {
					try {
						await DeleteChat(selectedChat.id);
						CancelModal();
						window.location.reload();
					} catch (error) {
						console.error("Error deleting chat:", error);
					}
				}}
			/>
		);
	}

	const confirmExitGroup = () => {
		OpenModal(
			<Confirm
				title='Are you sure you want to leave this Group?'
				body='You will no longer be part of the conversation'
				onCancel={() => CancelModal()}
				onConfirm={async () => {
					try {
						await RemoveMemberFromGroup(id, selectedChat.id);
						removeUser(id)
						CancelModal();
						window.location.reload();
					} catch (error) {
						console.error("Error fetching friends:", error);
					}
				}}

			/>
		);
	}
	const DeleteGroup = () => {
		OpenModal(
			<Confirm
				title='Are you sure you want to Delete this Group !'
				body='all conversations and data associated with it will be permanently lost !!'
				onCancel={() => CancelModal()}
				onConfirm={async () => {
					try {
						// await RemoveMemberFromGroup(id, selectedChat.id);
						// removeUser(id)
						CancelModal();
						window.location.reload();
					} catch (error) {
						console.error("Error fetching friends:", error);
					}
				}}

			/>
		)
	}
	const confirmBlock = () => {
		OpenModal(
			<Confirm
				title='Are you sure you want Block that user?'
				body='You will no longer be friends or able to send messages.'
				onCancel={() => CancelModal()}
				onConfirm={async () => {
					try {
						if (selectedChat && selectedChat.receiverUser && selectedChat.receiverUser[0])
							await BlockUser(parseInt(selectedChat.receiverUser[0].id));
						router.push(`/messenger`);
						handleIconClick(0)
						window.location.reload();
					}
					catch (error) {
						console.error("Error blocking user:", error);
					}
					CancelModal();
				}}
			/>
		);
	}

	return (
		<div>
			<button className="w-full h-[80px] bg-[#363636] flex items-center justify-between rounded-lg overflow-hidden">
				<Link href="/profile" className="flex items-center justify-between p-4">
					<Image
						className="bg-white w-[53px] h-[53px] rounded-full"
						src={ImageSrc(room_icon, room_name)}
						alt="Profile Image"
						width={53}
						height={53}
						quality={100}
					/>
					<div className="flex items-start flex-col max-w-[80px]">
						<div className="ml-[10px] text-white truncate text-[16px] font-bold">
							{room_name}
						</div>
						<div className="ml-[10px] text-[#878787] text-[14px] truncate font-normal">
							{selectedChat.type === 'private' ? selectedChat.receiverUser && selectedChat?.receiverUser[0].status : users && users.length > 0 ? users.map((member) => member.username).join(', ') : 'No members'}
						</div>
					</div>
				</Link>
				<div className="relative flex flex-col items-center">
					<div className="relative flex flex-col items-center p-7" onClick={() => setClickedThreePoints(!clickedThreePoints)}>
						<ThreePointsIcon />
					</div>
				</div>
				{clickedThreePoints && selectedChat.type === "private" ? (
					<div className="z-50 absolute right-7 top-16 bg-[#161616] h-[160px] w-[140px] p-2 rounded-md">
						<div className="flex flex-col items-start justify-start  font-light text-[12px] text-[#878787]">
							<button className="hover:bg-[#262626] py-2 px-5 rounded-md " onClick={confirmClear}>
								<div>Clear Chat</div>
							</button>
							<button className="hover:bg-[#262626] py-2 px-5  rounded-md" onClick={() => {
								router.push(`/messenger`);
								handleIconClick(0)
							}}>
								<div>Close Chat</div>
							</button>
							<button className=" hover:bg-[#262626] py-2 px-5 rounded-md" onClick={confirmDelete}>
								<div>Delete Chat</div>
							</button>
							<button className="hover:bg-[#262626] py-2 px-5 rounded-md" onClick={confirmBlock}>
								<div>Block</div>
							</button>
						</div>
					</div>
				) : clickedThreePoints && selectedChat.type === "group" &&
				<div className={`z-50 absolute right-7 top-16 bg-[#161616] ${isAdmin ? "h-[120px]" : "h-[100]"} w-[140px] p-2 rounded-md`}>
					<div id='Group-info' className="flex flex-col items-start justify-start font-light text-[12px] text-[#878787]">
						<button className="hover:bg-[#262626] py-2 px-5  rounded-md" onClick={() => handleGroup(true)}>
							<div>Group info</div>
						</button>
						<button className="hover:bg-[#262626] py-2 px-5 rounded-md" onClick={confirmExitGroup}>
							<div>Exit Group</div>
						</button>
						{
							isAdmin &&
							<button className="hover:bg-[#262626] py-2 px-5 rounded-md" onClick={DeleteGroup}>
								<div>Delete Group</div>
							</button>
						}
					</div>
				</div>
				}
			</button>
		</div>
	);
}