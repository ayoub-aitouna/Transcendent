// GroupsContainer.tsx
'use client'
import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ImageSrc } from '@/lib/ImageSrc';
import { useAppSelector } from '@/redux/store';
import { RemoveGroupMember, RemoveMemberFromGroup, roomItem } from '@/api/chat';
import styles from '@/app/ui/dashboard/nav/nav.module.css'
import Confirm from '../../modal/confirm';
import { useModal } from '@/app/provider/modal-provider';
import apiMock from '@/lib/axios-mock';
import { useUserContext } from '@/app/(dashboard)/messenger/context/UserContext';


interface GroupsContainerProps {
	id: number;
	name: string;
	image_url: string;
	level: number;
	selectedChat: roomItem;
}

const GroupsMembers: React.FC<GroupsContainerProps> = ({ id, name, image_url, level, selectedChat }) => {
	const { username } = useAppSelector((state) => state.user.user);
	const { OpenModal, CancelModal } = useModal();
	const {removeUser} = useUserContext();

	const isMeAdmin = selectedChat.admin && selectedChat.admin.username == username;
	const isAdmin = selectedChat.admin && selectedChat.admin.username === name

	const confirmRemoveUser = async () => {
		OpenModal(
			<Confirm
				title='Are you sure you want remove this user?'
				body='The user well no long part of that Group Chat.'
				onConfirm =  {async () => {
					try {
						await RemoveMemberFromGroup(id, selectedChat.id);
						removeUser(id)
						CancelModal();
					} catch (error) {
						console.error("Error fetching friends:", error);
					}
				}}
				onCancel={() => CancelModal()}
			/>
		);
	}
	return (
		<div className={`mt-2 w-full h-[69px] flex items-center justify-between rounded ${name === username ? styles.highlight : "bg-[#292929]"}  p-4`}>
			<Link href={`/profile/${username}`} className='flex items-center'>
				<Image
					className='bg-white w-[53px] h-[53px] rounded-full'
					src={ImageSrc(image_url, name)}
					alt='Profile Image'
					width={53}
					height={53}
				/>
				<div className='flex items-start flex-col  ml-4'>
					<div className='text-white truncate text-[18px] max-w-[80px]font-bold'>
						{name}
					</div>
					<div className='text-[#878787] text-[12px] truncate max-w-[80px] font-medium'>
						Level {level}
					</div>
				</div>
			</Link>
			{
				isMeAdmin && name !== username ?
					<div className='flex items-center'>
						<button onClick={() => confirmRemoveUser()} className='text-white text-[16px] font-medium'>
							<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M5.5 13.4043V11.4043H19.5V13.4043H5.5Z" fill="#ffffff" />
							</svg>
						</button>
					</div>
					: isAdmin &&
					<div className='flex items-center'>
						<div className='bg-[#242424] rounded py-1 px-2'>
							<div className='text-white text-[13px] font-light' > Admin</div>
						</div>
					</div>
			}
		</div>
	);
};

export default GroupsMembers;


