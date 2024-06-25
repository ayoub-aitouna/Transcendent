'use client'
import { ClearChat, DeleteChat,roomItem } from "@/api/chat";
import React, {useEffect,useState,} from "react";
import ThreePointsIcon from "../icons/messenger/three-points";
import Link from "next/link";
import Image from "next/image";
import { ImageSrc } from "@/lib/ImageSrc";
import { useRouter } from 'next/navigation'

export default function ChatPanel({ selectedChat }: { selectedChat: roomItem }) {
	const [clickedThreePoints, setClickedThreePoints] = useState(false);
	const [clear, setClear] = useState(false);
	const [close, setClose] = useState(false);
	const [deleteChat, setDelete] = useState(false);
	const [block, setBlock] = useState(false);
	const router = useRouter();

	const handleThreePoints = () => {
		setClickedThreePoints(!clickedThreePoints);
	};

	useEffect(() => {
		const handleDelete = async () => {

			try {
				if (deleteChat) {
					await DeleteChat(selectedChat.id);
				}
			} catch (error) {
				console.error("Error deleting chat:", error);
			}
		};
		handleDelete()
	}, [deleteChat]);

	useEffect(() => {
		const handleClear = async () => {
			try {
				if (clear) {
					await ClearChat(selectedChat.id);
					router.refresh();
				}
			} catch (error) {
				console.error("Error clearing chat:", error);
			}
		};
		handleClear()
	}, [clear]);

	useEffect(() => {
		if (close) {
			router.push(`/messenger/k`);
		}
	}, [close, router]);

	return (
		<div>
			<button className="w-full h-[80px] bg-[#363636] flex items-center justify-between rounded-lg overflow-hidden">
				<Link href="/profile" className="flex items-center justify-between p-4">
					<Image
						className="bg-white w-[53px] h-[53px] rounded-full"
						src={ImageSrc(selectedChat?.room_icon, selectedChat.room_name)}
						alt="Profile Image"
						width={53}
						height={53}
						quality={100}
					/>
					<div className="flex items-start flex-col max-w-[80px]">
						<div className="ml-[10px] text-white truncate text-[16px] font-bold">
							{selectedChat?.room_name}
						</div>
						<div className="ml-[10px] text-[#878787] text-[14px] truncate font-normal">
							{selectedChat.receiverUser && selectedChat?.receiverUser[0].status}
						</div>
					</div>
				</Link>
				<div className="relative flex flex-col items-center">
					<div className="relative flex flex-col items-center p-7" onClick={handleThreePoints}>
						<ThreePointsIcon />
					</div>
				</div>
				{clickedThreePoints && (
					<div className="z-50 absolute left-[76%] bottom-[75%] bg-[#161616] h-[175px] w-[200px] p-2 rounded-md">
						<div className="flex flex-col items-start justify-start text-[16px] text-[#878787]">
							<button className="hover:bg-[#262626] p-2 rounded-md" onClick={() => setClear(true)}>
								<div>Clear Chat</div>
							</button>
							<button className="hover:bg-[#262626] p-2 rounded-md" onClick={() => setClose(true)}>
								<div>Close Chat</div>
							</button>
							<button className="hover:bg-[#262626] p-2 rounded-md" onClick={() => setDelete(true)}>
								<div>Delete Chat</div>
							</button>
							<button className="hover:bg-[#262626] p-2 rounded-md" onClick={() => setBlock(true)}>
								<div>Block</div>
							</button>
						</div>
					</div>
				)}
			</button>
		</div>
	);
}