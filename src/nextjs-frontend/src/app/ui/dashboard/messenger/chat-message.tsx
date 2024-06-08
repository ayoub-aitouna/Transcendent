import { MessageItem } from "@/api/chat";
import { useAppSelector } from "@/redux/store";
import { type } from "os";


export function ChatMessage({ messages }: {
	messages: MessageItem;
}) {
	const {username} = useAppSelector((state) => state.user.user);
	let isSent = username === messages.sender_username;
	let message;
	
	typeof messages.message === 'string' ? message = messages.message : message = "";
	return (
		<div className={`w-full flex ${isSent ? 'items-end justify-end' : 'items-start'} px-7 py-2`}>
			<div className={`flex flex-row py-2 px-4  p-4  ${isSent ? 'bg-[#FD4106] text-white rounded-tl-md rounded-tr-none rounded-bl-md rounded-br-md' : 'bg-[#363636]  rounded-e-md rounded-es-md'} ${isSent ? 'ml-auto' : 'mr-auto'} relative`} style={{ maxWidth: '50%' }}>
				<p className="text-[12px] font-medium pr-8">{message}</p>
				<p className={`text-[8px] ${isSent ? "text-white" : "text-[#878787]"} absolute bottom-[0px] right-4`}>{new Date(messages.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
			</div>
		</div>
	);
}
