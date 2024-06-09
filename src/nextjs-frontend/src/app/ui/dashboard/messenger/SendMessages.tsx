import { MessageItem, roomItem } from '@/api/chat';
import apiMock from '@/lib/axios-mock';
import React, { useRef, useEffect, useState, ChangeEvent, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import Upload from '../icons/messenger/Upload';
import SendIcon from '../icons/messenger/send';
import EmojiIcon from '../icons/messenger/emoji';
import { ChatMessage } from './chat-message';
import ThreePointsIcon from '../icons/messenger/three-points';
import Link from 'next/link';
import Image from 'next/image';
import { useAppSelector } from '@/redux/store';
import moment from 'moment';

export function ChatPanel({ selectedChat }: { selectedChat: roomItem }) {
	const [clickedThreePoints, setClickedThreePoints] = useState(false);
	const handleThreePoints = () => {
		console.log("Three points clicked");
		setClickedThreePoints(!clickedThreePoints);
	};
	return (
		<div>
			<button
				className={`w-full h-[80px] bg-[#363636] flex items-center justify-between rounded-lg overflow-hidden`}>
				<Link
					href={"/profile"}
					className='flex items-center justify-between p-7'>
					<Image
						className='bg-white  w-[53px] h-[53px] rounded-full'
						src={selectedChat?.room_icon || ""}
						alt='Profile Image'
						width={53}
						height={53}
					/>
					<div />
					<div className='flex items-start flex-col max-w-[80px]'>
						<div className='ml-[10px]  text-white truncate text-[16px] font-bold'>
							{selectedChat?.room_name}
						</div>
						<div
							className={`ml-[10px]  text-[#878787] text-[14px] truncate font-normal`}>
							{selectedChat?.receiverUser[0].status}
						</div>
					</div>
				</Link>
				<div className='relative flex flex-col items-center'>
					<div
						className='relative flex flex-col items-center p-7'
						onClick={handleThreePoints}>
						<ThreePointsIcon />
					</div>
				</div>
				{clickedThreePoints && (
					<div className='z-50 absolute left-[76%] bottom-[82%] bg-[#161616] h-[150px] w-[200px] p-4 rounded-md'>
						<div className='flex flex-col  items-start justify-start  text-[16px] text-[#878787] gap-2'>
							<button className=''> clear chat </button>
							<button className=''> close char </button>
							<button className=''> Delete Chat </button>
							<button className=''> Block </button>
						</div>
					</div>
				)}
			</button>
		</div>
	);
}

export function SendImage() {
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files && e.target.files[0];
		if (file) {
			console.log("Uploaded file:", file);
			setSelectedImage(URL.createObjectURL(file));
		}
	};

	const removeImage = () => {
		setSelectedImage(null);
	};
	return (
		<div>
			{selectedImage ? (
				<div className='p-2 pr-8' onClick={removeImage}>
					<div className='p-2'>
						<Upload color=' #3342ff ' />{" "}
					</div>
					<div className='text-[10px] text-[#3342ff]'>
						Uploaded
					</div>
				</div>
			) : (
				<label className='p-2 pr-8'>
					<div className='p-1'>
						<Upload color='#878787' />{" "}
					</div>
					<div className='text-[10px] text-[#878787]'>
						Upload
					</div>
					<input
						type='file'
						className='hidden'
						onChange={handleImageUpload}
						accept='image/*'
					/>
				</label>
			)}
		</div>
	)
}

interface WebSocketEvent extends Event {
	currentTarget: WebSocket;
}

const SendMessage = ({ selectedChat }: { selectedChat: roomItem }) => {
	const [messages, setMessages] = useState<MessageItem[]>([]);
	const [messageContent, setMessageContent] = useState('');
	const socket = useRef<WebSocket | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);




	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const response = await apiMock.get(`/chat/room/${selectedChat?.id}/`);
				setMessages(response.data.results);
			} catch (error) {
				console.error('Error fetching messages:', error);
			}
		};

		fetchMessages();
	}, [selectedChat]);

	useEffect(() => {
		if (selectedChat.id && !socket.current)
			socket.current = new WebSocket(`ws://localhost:8000/ws/chat/${selectedChat.id}/`)
		if (socket.current) {
			socket.current.onopen = () => {
				console.log("webSocket connection opened: ", socket.current)
			}
			socket.current.onerror = (err) => {
				console.log("webSocket closed by an error : ", err)
			}
			socket.current.onclose = (event) => {
				console.log("webSocket connection closed : ", event)
			}
			socket.current.onmessage = (event) => {
				console.log("webSocket message received : ", event.data)
				const receivedMessage = JSON.parse(event.data);
				const newMessage: MessageItem = {
					message: receivedMessage.message.message,
					seen: false,
					created_at: String(moment(receivedMessage.created_at)),
					id: selectedChat.id,
					sender_username: receivedMessage.message.sender_username,
				};
				setMessages((prevMessages) => [...prevMessages, newMessage]);
				setMessageContent('');
			}
		}
		return () => {
			if (socket.current) {
				socket.current.onmessage = null
			}
		}

	}, [selectedChat.id, socket]);
	const SendMessage = useCallback(async (messageContent: string) => {
		try {
			const formData = new FormData();
			formData.append('message', messageContent);
			await apiMock.post(`/chat/room/${selectedChat.id}/`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
		} catch (error) {
			console.error('Error sending message:', error);
		}

	}, [selectedChat.id])

	const handleSendMessage = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		SendMessage(messageContent)
	}
	useEffect(() => {
		const element = containerRef.current;
		console.log("Container element:", element);
		if (element) {
			console.log("Scrolling to bottom...");
			element.scrollTo({
				top: element.scrollHeight,
				behavior: 'smooth'

			});
		}
	}, [messages]);
	return (
		<div className='h-full' >
			<ChatPanel selectedChat={selectedChat} />
			<div className='overflow-y-scroll hide-scrollbar max-h-[880px]' ref={containerRef}>
				<div className='flex-1 p mt-5'>
					{messages.map((item, index) => (
						<ChatMessage
							key={index}
							messages={item}
						/>
					))}
				</div>
			</div>
			<div className=' absolute bottom-0 gap-3 left-0 right-0 p-2 h-[70px] bg-[#303030]'>
				<div className='flex flex-row items-center justify-center h-full'>
					<div className='p-2'>
						<div className='pt-2'>
							<EmojiIcon />
						</div>
						<div className='text-[10px] text-[#878787]'>
							Invite{" "}
						</div>
					</div>
					<div className=''><SendImage /></div>
					<textarea
						className='flex-grow bg-[#464646] ml-3 pl-3 h-[50px] p-3 rounded-lg outline-none resize-none'
						placeholder='Type a message'
						value={messageContent}
						maxLength={1000}
						onChange={(e) => setMessageContent(e.target.value)}
					/>
					<button className='p-2' onClick={handleSendMessage}>
						<SendIcon />
					</button>
				</div>
			</div>
		</div>
	);
}


export default SendMessage;
