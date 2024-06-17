import { string } from "yup";
import Image from 'next/image';
import styles from '@/app/ui/dashboard/nav/nav.module.css'
import { Player } from "@/type/dashboard/players";
import Link from "next/link";
import { ImageSrc } from "@/lib/ImageSrc";


export function UserContainer({ player, index }: {
	player: Player;
	index: Number;
}) {
	const isMessage = index == 1;
	if (!player) {
		return null;
	}
	return (
		<Link href={`/profile/${player.id}`}>
			<button
				className={`mt-2 w-full h-[69px] flex items-center justify-between rounded bg-[#373737] p-4 mb-3
			${isMessage ? styles.highlight : "bg-[#373737]"}`}>
				<div className='flex items-center justify-between '>
					<Image
						className='bg-white  w-[53px] h-[53px] rounded-full'
						src={ImageSrc(player.image_url, player.username)}
						alt='Profile Image'
						width={53}
						height={53}
					/>
					<div />
					<div className='flex items-start flex-col max-w-[80px]'>
						<div className='ml-[10px]  text-white truncate  text-[18px]font-bold'>
							{player.username}
						</div>
						<div
							className={`ml-[10px]  text-[#878787] text-[12px] font-normal truncate ${
								isMessage ? "text-[#FD4106]" : "text-[#878787]"
							} font-medium`}>
							Level {player.level}
						</div>
					</div>
				</div>
				{index && (
					<div className='flex items-center justify-end rounded'>
						<div
							className={`rounded dark:text-white ${
								isMessage ? "bg-[#FD4106]" : "bg-[#242424]"
							}`}>
							<div className='ml-2 mr-2 text-base'>{String(index)}</div>
						</div>
					</div>
				)}
			</button>
		</Link>
	);
};