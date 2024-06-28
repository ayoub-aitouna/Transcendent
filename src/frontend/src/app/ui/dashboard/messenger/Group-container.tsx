// GroupsContainer.tsx
'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ImageSrc } from '@/lib/ImageSrc';
import { useUserContext } from '@/app/(dashboard)/messenger/New-group/context/UserContext';

interface GroupsContainerProps {
	id: number;
	username: string;
	image_url: string;
	level: number;
}

const GroupsContainer: React.FC<GroupsContainerProps> = ({ id, username, image_url, level }) => {
	const { users, addUser, removeUser } = useUserContext();
	const [isAdded, setIsAdded] = useState(users.some(user => user.id === id));

	useEffect(() => {
		setIsAdded(users.some(user => user.id === id));
	}, [users, id]);

	const handleAddRemove = () => {
		if (isAdded) {
			removeUser(id);
		} else {
			addUser({ id, username, image_url, level });
		}
		setIsAdded(!isAdded);
	};
	console.log(" users : -- > ", users, "ISadd: ", isAdded, "id", id);
	return (
		<div className='mt-2 w-full h-[69px] flex items-center justify-between rounded bg-[#373737] p-4 mb-3'>
			<Link href={`/profile/${id}`} className='flex items-center'>
				<Image
					className='bg-white w-[53px] h-[53px] rounded-full'
					src={ImageSrc(image_url, username)}
					alt='Profile Image'
					width={53}
					height={53}
				/>
				<div className='flex items-start flex-col max-w-[80px] ml-4'>
					<div className='text-white truncate text-[18px] font-bold'>
						{username}
					</div>
					<div className='text-[#878787] text-[12px] truncate font-medium'>
						Level {level}
					</div>
				</div>
			</Link>
			<div className='flex items-center'>
				<button onClick={handleAddRemove} className='text-white text-[16px] font-medium'>
					<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
						{isAdded ? (
							<path d="M5.5 13.4043V11.4043H19.5V13.4043H5.5Z" fill="#C60000" />
						) : (
							<path d="M11.5 13.4043H5.5V11.4043H11.5V5.4043H13.5V11.4043H19.5V13.4043H13.5V19.4043H11.5V13.4043Z" fill="#F8F8F8" />
						)}
					</svg>
				</button>
			</div>
		</div>
	);
};

export default GroupsContainer;
