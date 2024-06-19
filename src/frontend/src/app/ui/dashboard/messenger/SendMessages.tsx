import { MessageItem, roomItem } from "@/api/chat";
import apiMock from "@/lib/axios-mock";
import React, {
	useRef,
	useEffect,
	useState,
	ChangeEvent,
	useCallback,
} from "react";
import Upload from "../icons/messenger/Upload";
import SendIcon from "../icons/messenger/send";
import EmojiIcon from "../icons/messenger/emoji";
import { ChatMessage } from "./chat-message";
import ThreePointsIcon from "../icons/messenger/three-points";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/redux/store";
import moment from "moment";
import { ImageSrc } from "@/lib/ImageSrc";
import { Friend } from "@/type/auth/user";
import { GetFriendsData } from "@/api/user";

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
				<Link href={"/profile"} className='flex items-center justify-between '>
					{/* <div><LeftArrow/></div>  */}
					{/* handle left arrow when the screen is small */}
					<Image
						className='bg-white  w-[53px] h-[53px] rounded-full'
						src={ImageSrc(selectedChat?.room_icon, selectedChat.room_name)}
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
							{selectedChat.receiverUser &&
								selectedChat?.receiverUser[0].status}
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

export function SendImage({ onImageUpload }: { onImageUpload: (image: File | null) => void }) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
            onImageUpload(file);
        }
    };

    const removeImage = () => {
        setSelectedImage(null);
        onImageUpload(null);
    };

    return (
        <div>
            {selectedImage ? (
                <div className='p-2 pr-8' onClick={removeImage}>
                    <div className='p-2'>
                        <Upload color=' #3342ff ' />
                    </div>
                    <div className='text-[10px] text-[#3342ff]'>Uploaded</div>
                </div>
            ) : (
                <label className='p-2 pr-8'>
                    <div className='p-1'>
                        <Upload color='#878787' />
                    </div>
                    <div className='text-[10px] text-[#878787]'>Upload</div>
                    <input
                        type='file'
                        className='hidden'
                        onChange={handleImageUpload}
                        accept='image/*'
                    />
                </label>
            )}
        </div>
    );
};


const SendMessages = ({ selectedChat }: { selectedChat: roomItem }) => {

		const [messages, setMessages] = useState<MessageItem[]>([]);
		const [messageContent, setMessageContent] = useState<string>("");
		const [selectedImage, setSelectedImage] = useState<File | null>(null);
		const socket = useRef<WebSocket | null>(null);
		const containerRef = useRef<HTMLDivElement>(null);
		const { username } = useAppSelector((state) => state.user.user);
		const [friends, setFriends] = useState<{ username: string }[]>([]);
	
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
					const response = await apiMock.get(`/chat/room/${selectedChat?.id}/`);
					setMessages(response.data.results);
				} catch (error) {
					console.error("Error fetching messages:", error);
				}
			};
			fetchMessages();
		}, [selectedChat]);
	
		useEffect(() => {
			if (selectedChat.id && !socket.current) {
				socket.current = new WebSocket(`wss://localhost/ws/chat/${selectedChat.id}/`);
			}
	
			if (socket.current) {
				socket.current.onopen = () => {
					console.log("WebSocket connection opened: ", socket.current);
				};
				socket.current.onerror = (err) => {
					console.log("WebSocket closed by an error: ", err);
				};
				socket.current.onclose = (event) => {
					console.log("WebSocket connection closed: ", event);
				};
				socket.current.onmessage = (event) => {
					const receivedMessage = JSON.parse(event.data);
					const newMessage: MessageItem = {
						message: receivedMessage.message.message,
						image_file: receivedMessage.message.image_file,
						seen: false,
						created_at: String(moment(receivedMessage.created_at)),
						id: selectedChat.id,
						sender_username: receivedMessage.message.sender_username,
					};
					setMessages(prevMessages => [...prevMessages, newMessage]);
				};
			}
			return () => {
				if (socket.current) {
					socket.current.onmessage = null;
				}
			};
		}, [selectedChat.id]);
	
		const sendMessage = useCallback(async (content: string, imageFile: File | null) => {
			try {
				const formData = new FormData();
				formData.append("message", content);
				if (imageFile) {
					formData.append("image_file", imageFile);
				}
	
				const payload = {
					message: content,
					room_id: selectedChat.id,
					image_file: imageFile ? URL.createObjectURL(imageFile) : null,
				};
	
				socket.current?.send(JSON.stringify(payload));
				setMessageContent("");
				setSelectedImage(null);
			} catch (error) {
				console.error("Error sending message:", error);
			}
		}, [selectedChat.id]);
	
		const handleSendMessage = (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
			event.preventDefault();
			if (messageContent.trim() === '' && !selectedImage) 
				return;
	
			const newLocalMessage: MessageItem = {
				message: messageContent,
				image_file: selectedImage ? URL.createObjectURL(selectedImage) : "",
				seen: false,
				created_at: String(moment()),
				id: selectedChat.id,
				sender_username: username,
			};
	
			setMessages((prevMessages) => [...prevMessages, newLocalMessage]);
			sendMessage(messageContent, selectedImage);
			setMessageContent("");
			setSelectedImage(null);
		};
	
		const handleImageUpload = (image: File | null) => {
			setSelectedImage(image);
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
    return (
        <div className='h-full'>
            <ChatPanel selectedChat={selectedChat} />
            <div className='overflow-y-scroll hide-scrollbar max-h-[500px]' ref={containerRef}>
                <div className='flex-1 p mt-5'>
                    {messages.map((item, index) => (
                        <ChatMessage key={index} messages={item} />
                    ))}
                </div>
            </div>
            <div className='absolute bottom-0 gap-3 left-0 right-0 p-2 h-[70px] bg-[#303030]'>
                {isFriend ?
                    <div className='flex flex-row items-center justify-center h-full'>
                        <div className='p-2'>
                            <div className='pt-2'>
                                <EmojiIcon />
                            </div>
                            <div className='text-[10px] text-[#878787]'>Invite</div>
                        </div>
                        <div>
                            <SendImage onImageUpload={handleImageUpload} />
                        </div>
                        <textarea
                            className='flex-grow bg-[#464646] ml-3 pl-3 h-[50px] p-3 rounded-lg outline-none resize-none'
                            placeholder='Type a message'
                            value={messageContent}
                            maxLength={1000}
                            onChange={(e) => setMessageContent(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleSendMessage(e);
                                }
                            }}
                        />
                        <button className='p-2' onClick={handleSendMessage}>
                            <SendIcon />
                        </button>
                    </div>
                    :
                    <div className='flex flex-row items-center justify-center h-full'>
                        You can't send a message to a user that you are not friends with
                    </div>
                }
            </div>
        </div>
    );
};

export default SendMessages;