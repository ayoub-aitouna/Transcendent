import Image from "next/image";
import Link from "next/link";
import { user } from "@/type/auth/user";

export const ProfileImage = ({
	className,
	image_url,
}: {
	className?: string;
	image_url?: string;
}) => {
	return (
		<div className={className}>
			<Image
				src={image_url || ""}
				alt='profile'
				layout='fill'
				className='object-cover'
			/>
		</div>
	);
};

export const UserDetails = ({ name, level }: { name?: string; level?: number }) => {
	return (
		<div className='flex flex-col items-start justify-center capitalize max-w-full'>
			<div
				className='font-bold text-lg tracking-tight max-w-24 truncate'
				title={name}>
				{name}
			</div>
			<div className='text-secondary-100 text-sm truncate font-normal tracking-tight'>
				Level <span>{level}</span>
			</div>
		</div>
	);
};

export const StreamingCard = ({
	user1,
	user2,
}: {
	user1: Partial<user>;
	user2: Partial<user>;
}) => {
	return (
		<div className='flex flex-row items-center justify-between w-full h-20 px-3 py-4 bg-secondary-300 rounded-lg'>
			<div className='flex flex-row gap-2 items-center'>
				<div className='flex flex-row items-center justify-center flex-nowrap'>
					<ProfileImage
						image_url={user1.image_url}
						className='relative w-12 h-12  rounded-full border border-[#A2A2A2] overflow-hidden '
					/>
					<ProfileImage
						image_url={user2.image_url}
						className='relative w-12 h-12 ml-[-20px] rounded-full border border-[#A2A2A2] overflow-hidden'
					/>
				</div>
				<UserDetails name={user1.username} level={user1.current_xp} />
				<p className='text-md font-bold'>VS</p>
				<UserDetails name={user2.username} level={user2.current_xp} />
			</div>

			<Image
				src='/assets/icons/ArrowRight.svg'
				alt='play'
				className='w-5 aspect-square'
				width={20}
				height={20}
			/>
		</div>
	);
};
