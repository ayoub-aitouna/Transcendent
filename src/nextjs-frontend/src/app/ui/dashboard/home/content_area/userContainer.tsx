import { string } from "yup";
import Image from 'next/image';
import styles from '@/app/ui/dashboard/nav/nav.module.css'
import { Player } from "@/type/dashboard/players";
import Link from "next/link";


export function UserContainer({ player, index }: {
	player: Player;
	index: Number;
}) {
	const isMessage = index == 1;
	if (!player) {
		return null; // or some fallback UI if player is not available
	}
	return (
		<Link href={`/profile/${player.id}`}>
		<button
			className={`mt-2 w-[341px] h-[69px] flex items-center justify-between rounded-lg
			${isMessage ? styles.highlight  : "bg-[#373737]"} overflow-hidden  p-2 h-[44px] mb-[10px]`}>
			<div className='flex items-center justify-between '>
				<Image className="bg-white  w-[53px] h-[53px] rounded-full" src={player.image_url} alt="Profile Image" width={53} height={53} />
				<div />
				<div className="flex items-start flex-col max-w-[80px]">
					<div className="ml-[10px]  text-white truncate  text-[18px]font-bold">{player.username}</div>
					<div className={`ml-[10px]  text-[#878787] text-[12px] font-normal truncate ${isMessage ? "text-[#FD4106]" : "text-[#878787]"} font-medium`}>Level {player.level}</div>
				</div>
			</div>
			{index && (
				<div className="flex items-center justify-end rounded">
					<div className={`rounded dark:text-white ${isMessage ? "bg-[#FD4106]" : "bg-[#242424]"}`}>
						<div className="ml-2 mr-2 text-base">{String(index)}</div>
					</div>
				</div>
			)}

		</button>
		</Link>
	);
};