import { MessageItem, roomItem } from '@/api/chat';
import apiMock from '@/lib/axios-mock';
import React, { useRef, useEffect, useState, ChangeEvent } from 'react';
import { io, Socket } from 'socket.io-client';
import Upload from '../icons/messenger/Upload';
import SendIcon from '../icons/messenger/send';
import EmojiIcon from '../icons/messenger/emoji';
import { ChatMessage } from './chat-message';
import ThreePointsIcon from '../icons/messenger/three-points';
import Link from 'next/link';
import Image from 'next/image';
import { useAppSelector } from '@/redux/store';

const SendMessage = ({ selectedChat }: { selectedChat: roomItem }) => {
	const { username } = useAppSelector((state) => state.user.user);
	const [clickedThreePoints, setClickedThreePoints] = useState(false);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [messages, setMessages] = useState<MessageItem[]>([]);
	const [messageContent, setMessageContent] = useState('');
	const [socket, setSocket] = useState<Socket | null>(null);

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
		const newSocket: Socket = io();
		setSocket(newSocket);
		newSocket.on('receiveMessage', (message: MessageItem) => {
			setMessages((prevMessages) => [...prevMessages, message]);
		});
		return () => {
			if (socket) {
				socket.disconnect();
			}
		};
	}, []);

	const handleSendMessage = async () => {
		if (!selectedChat?.id || !messageContent.trim()) return;

		const newMessage = messageContent
		const formData = new FormData();

		formData.append('message', messageContent);
		try {
			const res = await apiMock.post(`/chat/room/${selectedChat.id}/`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
			const newMessage: MessageItem = {
				message: messageContent,
				seen: false,
				created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
				id: selectedChat.id,
				sender_username: username
			};
			socket?.emit('sendMessage', newMessage);
			setMessages((prevMessages) => [...prevMessages, newMessage]);
			setMessageContent('');
		} catch (error) {
			console.error('Error sending message:', error);
		}
	};

	const handleThreePoints = () => {
		console.log("Three points clicked");
		setClickedThreePoints(!clickedThreePoints);
	};

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
					<div className='z-50 absolute left-[83%] bottom-[72%] bg-[#161616] h-[150px] w-[200px] p-4 rounded-md'>
						<div className='flex flex-col  items-start justify-start  text-[16px] text-[#878787] gap-2'>
							<button className=''> clear chat </button>
							<button className=''> close char </button>
							<button className=''> Delete Chat </button>
							<button className=''> Block </button>
						</div>
					</div>
				)}
			</button>
			<div className='overflow-y-scroll hide-scrollbar max-h-[600px]'>
				<div className=' flex-1 p  w-full mt-5'>
					{messages.map((item, index) => (
						<ChatMessage
							key={index}
							messages={item}
						/>
					))}
				</div>
			</div>
			<div className='absolute bottom-0 left-0 right-0 p-2 h-[70px] bg-[#303030]'>
				<div className='flex flex-row items-center justify-center h-full'>
					<div className='p-2'>
						<div className='pt-2'>
							<EmojiIcon />
						</div>
						<div className='text-[10px] text-[#878787]'>
							Invite{" "}
						</div>
					</div>
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
					<textarea
						className='flex-grow bg-[#464646] pl-3 h-[50px] p-3 rounded-lg outline-none resize-none'
						placeholder='Type a message'
						value={messageContent}
						onChange={(e) => setMessageContent(e.target.value)}
					/>
					<button className='p-2' onClick={handleSendMessage}>
						<SendIcon />
					</button>
				</div>
			</div>
		</div>
	);
};

export default SendMessage;
