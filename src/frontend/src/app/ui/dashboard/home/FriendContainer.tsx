import Image from "next/image";
import Link from "next/link";
import RightArrow from "@/app/ui/dashboard/icons/content_area/RightArrow";
import { ImageSrc } from "@/lib/ImageSrc";

export function FriendContainer({
	name,
	href,
	number,
	id,
}: {
	name: string;
	href: string;
	number: number;
	id: number;
}) {
	return (
		<div className='mt-2 w-full h-[69px] flex items-center justify-between rounded bg-[#373737] p-4 mb-3'>
			<Link
				href={`/profile/${name}`}
				className='flex items-center justify-between'>
				<Image
					className='bg-white w-[53px] h-[53px] rounded-full'
					src={ImageSrc(href, name)}
					alt='Profile Image'
					width={53}
					height={53}
				/>
				<div />
				<div className='flex items-start flex-col max-w-[80px]'>
					<div className='ml-[10px] text-white truncate text-[18px] font-bold'>
						{name}
					</div>
					<div className='ml-[10px] text-[#878787] text-[12px] truncate font-medium'>
						Level {String(number)}
					</div>
				</div>
			</Link>
			<div className='flex items-center justify-center'>
				<Link
					href='/messenger'
					className='flex items-center justify-between mx-auto text-white text-[16px] font-medium'>
					<RightArrow />
				</Link>
			</div>
		</div>
	);
}
