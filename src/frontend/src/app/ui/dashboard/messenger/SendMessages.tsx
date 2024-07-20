import { GetChatMessages, MessageItem, roomItem } from "@/api/chat";
import React, {
	useRef,
	useEffect,
	useState,
	useCallback,
	useContext,
	use,
} from "react";
import Upload from "../icons/messenger/Upload";
import SendIcon from "../icons/messenger/send";
import InviteIcon from "../icons/messenger/emoji";
import { ChatMessage } from "./chat-message";
import { useAppSelector } from "@/redux/store";
import moment from "moment";
import { GetFriendsData } from "@/api/user";
import ChatPanel from "./chat-panel";
import SendImage from "./send-image";
import { WS_BASE_URL } from "@/constant/api";
import AuthWebSocket from "@/lib/AuthWebSocket";
import { BlobOptions } from "buffer";
import { m } from "framer-motion";
import { UserContext } from "@/app/(dashboard)/messenger/context/UserContext";
import Link from "next/link";
import { set } from "react-hook-form";


const SendMessages = ({ selectedChat, clickedGroup, handleIconClick, clickedIndex }
	:
	{
		selectedChat: roomItem;
		clickedGroup: (index: boolean) => void;
		handleIconClick: (index: number) => void;
		clickedIndex: (index: number) => void;

	}) => {

	const [messages, setMessages] = useState<MessageItem[]>([]);
	const [messageContent, setMessageContent] = useState<string>("");
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const socket = useRef<WebSocket | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const { username } = useAppSelector((state) => state.user.user);
	const [friends, setFriends] = useState<{ username: string }[]>([]);
	const { users, setRoomId, newRoom, setNewRoom } = useContext(UserContext);
	const [isEditing, setIsEditing] = useState(false);


	useEffect(() => {
		const getFriendsList = async () => {
			try {
				const data = await GetFriendsData('');
				setFriends(data);
			} catch (error) {
				console.error("Error fetching friends:", error);
			}
		};
		getFriendsList();
	}, []);

	const isFriend = friends.some(friend => friend.username === selectedChat.room_name);

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const response = await GetChatMessages(selectedChat?.id);
				setMessages(response);
			} catch (error) {
				console.error("Error fetching messages:", error);
			}
		};
		fetchMessages();
	}, [selectedChat]);

	useEffect(() => {
		try {

			if (selectedChat.id) {
				console.log("Creating new WebSocket connection", selectedChat.id);
				socket.current = new AuthWebSocket(`${WS_BASE_URL}/chat/${selectedChat.id}/`);
			}

			if (socket.current) {
				socket.current.onerror = (err) => {
					console.log("WebSocket closed by an error: ", err);
					if (selectedChat.type === 'group') {
						clickedIndex(0);
						setRoomId(selectedChat.id);
					}
				};
				socket.current.onmessage = (event) => {
					const receivedMessage = JSON.parse(event.data);
					console.log('new message :', receivedMessage)
					const newMessage: MessageItem = {
						message: receivedMessage.message.message,
						image_file: receivedMessage.message.image,
						seen: false,
						created_at: String(moment(receivedMessage.created_at)),
						id: receivedMessage.message.id ? receivedMessage.message.id : 0,
						sender_username: receivedMessage.message.sender_username,
						type: receivedMessage.message.message ? 'text' : 'image'
					};
					setMessages(prevMessages => [...prevMessages, newMessage]);
				};

			}
			return () => {
				if (socket.current) {
					socket.current.onmessage = null;
				}
			};
		} catch (error) {
			console.error(users, "on error");
			clickedIndex(0);
			setRoomId(selectedChat.id);
			console.error("Error creating WebSocket connection:", error);

		}
	}, [selectedChat.id]);

	const sendMessage = useCallback(async (content: string, imageFile: File | null) => {
		let imageBase64: string | null = null;

		if (imageFile) {
			imageBase64 = await new Promise<string>((resolve, reject) => {
				const reader = new FileReader();
				reader.onloadend = () => {
					const base64data = reader.result?.toString().split(',')[1];
					if (base64data) {
						resolve(base64data);
					} else {
						reject(new Error('Failed to read image file.'));
					}
				};
				reader.onerror = reject;
				reader.readAsDataURL(imageFile);
			});
		}
		try {
			const payload = {
				id: selectedChat.id,
				message: content,
				image_file: imageBase64 ? `data:${imageFile?.type};base64,${imageBase64}` : null,
				seen: false,
				sender_username: username,
				type: imageFile ? 'image' : 'text',
				room_id: selectedChat.id,
				created_at: String(moment())
			};
			socket.current?.send(JSON.stringify(payload));
			setMessages(prevMessages => [...prevMessages, {
				message: payload.message,
				image_file: payload.image_file,
				seen: false,
				created_at: String(moment(payload.created_at)),
				id: payload.id ? payload.id : 0,
				sender_username: payload.sender_username,
				type: payload.message ? 'text' : 'image'
			}]);
		} catch (error) {
			console.error("Error sending message:", error);
		}
	}, [selectedChat.id, username, newRoom]);

	const handleImageConfirm = (file: File) => {
		setSelectedImage(file);
		sendMessage('', file);
	};
	const handleSendMessage = (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLTextAreaElement>, file: File | null) => {
		event.preventDefault();
		if (file)
			setSelectedImage(file);
		console.log('selec : ', selectedImage)
		if (messageContent.trim() === '' && !selectedImage)
			return;

		sendMessage(messageContent, selectedImage);
		setMessageContent("");
		setSelectedImage(null);
	};


	useEffect(() => {
		const element = containerRef.current;
		if (element) {
			element.scrollTo({
				top: element.scrollHeight,
				behavior: "smooth",
			});
		}
	}, [messages]);

	useEffect(() => {
		if (newRoom && socket.current) {
			const payload = {
				id: newRoom.id,
				message: '',
				type: 'text',
				room_id: newRoom.id,
				image: null,
			};
			socket.current?.send(JSON.stringify(payload));
			setNewRoom(null);

		}
	}, [newRoom]);

	return (
		<div className='h-full'>
			<ChatPanel selectedChat={selectedChat} handleGroup={clickedGroup} handleIconClick={handleIconClick} />
			<div className='overflow-y-scroll hide-scrollbar max-h-[500px]' ref={containerRef}>
				<div className='flex-1 p mt-5'>
					{messages.map((item, index) => (
						<ChatMessage key={index} messages={item} type={selectedChat.type} />
					))}
				</div>
			</div>
			<div className='absolute bottom-0 gap-3 left-0 right-0 p-2 h-[70px] bg-[#303030]'>
				{isFriend || selectedChat.type !== 'private' ?
					<div className='flex flex-row items-center justify-center h-full'>
						{
							selectedChat.type === 'private' &&
							<div className='p-2'>
								<Link
									href={`/match-making?player=${selectedChat && selectedChat?.receiverUser && selectedChat.receiverUser[0].username || 0}`} className='pt-2'>
									<InviteIcon />
								</Link>
								<div className='text-[10px] text-[#878787]'>Invite</div>
							</div>
						}
						<div>
							<SendImage onImageUpload={(image) => setSelectedImage(image)} onImageConfirm={handleImageConfirm} />
						</div>
						<textarea
							className='flex-grow bg-[#464646] ml-3 pl-3 h-[50px] p-3 rounded-lg outline-none resize-none'
							placeholder='Type a message'
							value={messageContent}
							maxLength={1000}
							onChange={(e) => setMessageContent(e.target.value)}
							onClick={() => setIsEditing(true)}
							onKeyPress={(e) => {
								if (e.key === 'Enter') {
									e.preventDefault();
									handleSendMessage(e, null);
								}
							}}
						/>
						<button className='p-2' onClick={(e) => handleSendMessage(e, null)}>
							<SendIcon />
						</button>
					</div>
					: selectedChat.type === 'private' &&
					<div className='flex flex-row items-center justify-center h-full'>
						You can't send a message to a user that you are not friends with
					</div>
				}
			</div>
		</div>
	);
};

export default SendMessages;