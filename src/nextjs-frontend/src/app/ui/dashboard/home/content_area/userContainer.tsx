import { string } from "yup";
import Image from 'next/image';
import styles from '@/app/ui/dashboard/nav/nav.module.css'



export function UserContainer({ name, href, number, index }: {
	name: string;
	href: string;
	number: Number;
	index: Number;
}) {
	const isMessage = index == 1;
	const handleClick = () => {
		window.location.href = href;
	};
	return (
		<button
			className={`mt-2 w-[341px] h-[69px] flex items-center justify-between rounded-lg
			${isMessage ? styles.highlight  : "bg-[#323232]"} overflow-hidden  p-2 h-[44px] mb-[10px]`}
			onClick={handleClick}
			aria-label="Navigate to game">
			<div className='flex items-center justify-between '>
				<Image className="bg-white  w-[53px] h-[53px] rounded-full" src="/aaitouna.png" alt="Profile Image" width={53} height={53} />
				<div />
				<div className="flex items-start flex-col max-w-[80px]">
					<div className="ml-[10px]  text-white truncate font-semibold">{name}</div>
					<div className={`ml-[10px] font-[200] text-white text-xs truncate ${isMessage ? "text-[#FD4106]" : "text-[#878787]"} font-medium`}>Level {number}</div>
				</div>
			</div>
			{number && (
				<div className="flex items-center justify-end">
					<div className={`rounded-md dark:text-white ${isMessage ? "bg-[#FD4106]" : "bg-[#323232]"}`}>
						<div className="ml-3 mr-3">{index}</div>
					</div>
				</div>
			)}

		</button>
	);
};