'use client'
import { MessageItem } from "@/api/chat";
import apiMock from "@/lib/axios-mock";
import { useAppSelector } from "@/redux/store";
import Image from 'next/image';
import { useEffect, useState } from "react";

export function ChatMessage({ messages, type }: {
	messages: MessageItem;
	type: string;
}) {
	const { username } = useAppSelector((state) => state.user.user);
	const isSent = username === messages.sender_username;
	// const [downloadedImageUrl, setDownloadedImageUrl] = useState<string | null>(null);


	// const downloadImage = async () => {
	// 	try {
	// 		if (!messages.id) return;
	// 		if (downloadedImageUrl) {
	// 			const response = await apiMock.get(`/chat/download-image/${messages.id}/`, {
	// 				responseType: 'blob'
	// 			});
	// 			const blob = new Blob([response.data], { type: response.headers['content-type'] });
	// 			const imageUrl = URL.createObjectURL(blob);
	// 			setDownloadedImageUrl(imageUrl);
	// 		}
	// 	}
	// 	catch (error) {
	// 		console.error('There was a problem downloading the image:', error);
	// 	};
	// };
	// useEffect(() => {
	// 	downloadImage();
	// }, [messages.id]);
	
	// console.log('ChatMessage', messages);

	return (
		<div className="flex">
			{messages.message ? (
				<div className={`w-full flex ${isSent ? 'justify-end items-end' : 'justify-start items-start'} px-7 py-2`}>
					<div className={`flex flex-row py-2 px-4 p-4 ${isSent ? 'bg-[#FD4106] text-white rounded-tl-md rounded-tr-none rounded-bl-md rounded-br-md ml-auto' : 'bg-[#363636] rounded-e-md rounded-es-md mr-auto'} relative`} style={{ maxWidth: '50%' }}>
						<div className=" inline-block" style={{ maxWidth: '100%', overflowWrap: 'break-word' }}>
							{type !== 'private' && !isSent &&
								<div className=" pb-2 text-[12px] font-semibold text-[#0AC856]">{messages.sender_username} </div>
							} 
							<div className="pr-8 ext-[12px] font-medium ">{messages.message}</div>
						</div>
						<p className={`text-[8px] ${isSent ? "text-white" : "text-[#878787]"} absolute bottom-[0px] right-4`}>{new Date(messages.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
					</div>
				</div>
			) : messages.image_file ? (
				<div className={`w-full flex ${isSent ? 'justify-end items-end' : 'justify-start items-start'} px-7 py-2`}>
					<div className={`h-[200px] w-full flex flex-row py-2 px-4 p-4 ${isSent ? ' text-white rounded-tl-md rounded-tr-none rounded-bl-md rounded-br-md ml-auto' : ' rounded-e-md rounded-es-md mr-auto'} relative`} style={{ maxWidth: '20%' }}>
						<div className="text-[12px] font-medium pr-8 inline-block" style={{ maxWidth: '100%', overflowWrap: 'break-word' }}></div>
						<Image
							src={messages.image_file}
							alt='Image sent'
							layout="fill"
							className='w-full h-full'
							quality={100}
							style={{ maxWidth: '100%', maxHeight: '100%' }}
						/>
					</div>
				</div>
			) 
			: (
				<div className={`w-full flex ${isSent ? 'justify-end items-end' : 'justify-start items-start'} px-7 py-2`}>
					<div className={` bg-black h-[200px] w-full flex flex-row py-2 px-4 p-4 ${isSent ? ' text-white rounded-tl-md rounded-tr-none rounded-bl-md rounded-br-md ml-auto' : ' rounded-e-md rounded-es-md mr-auto'} relative`} style={{ maxWidth: '20%' }}>
						<button  className="text-[12px] font-medium pr-8 inline-block cursor-pointer" style={{ maxWidth: '100%', overflowWrap: 'break-word' }}>
							Download Image
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

