// app/messenger/group/group.tsx
"use client";

import React, { ChangeEvent, FormEvent, use, useContext, useEffect, useState } from "react";
import styles from "@/app/ui/dashboard/nav/nav.module.css";
import Image from "next/image";
import apiMock from "@/lib/axios-mock";
import { useRouter } from "next/navigation";
import { UploadIcon } from "@/app/ui/dashboard/icons/content_area/UploadIcon";
import RightArrow from "@/app/ui/dashboard/icons/content_area/right-arrow";
import Link from "next/link";
import GroupsContainer from "@/app/ui/dashboard/messenger/Group-container";
import { UserContext } from "../context/UserContext";
import { useAppSelector } from "@/redux/store";
import { useToast } from '@/app/provider/ToastProvider';


const Page = () => {
	const { id } = useAppSelector((state) => state.user.user);
	const router = useRouter();
	const { users, addRemoveImage, addRemoveName, removeUser, group_name, icon } = useContext(UserContext);
	const [src, setSrc] = useState<string | null>(null);
	const { addToast } = useToast()

	const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		addRemoveImage(e.target.files[0]);
	};

	useEffect(() => {
		if (icon) {
			const reader = new FileReader();
			reader.onload = () => {
				const dataURL = reader.result;
				setSrc(dataURL as string);
			};
			reader.readAsDataURL(icon);
		}
	}, [icon]);

	const removeImage = () => {
		setSrc(null);
		addRemoveImage(null);
	};
	const handleCancel = () => {
		users.forEach((user) => {
			removeUser(user.id);
		})
		router.back();
	}
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const formData = new FormData();
			formData.append("name", group_name?.toString() || '');
			if (icon) formData.append('icon', icon);
			formData.append("type", "group");
			users.forEach((user) => {
				formData.append("input_members", user.id.toString());
			})
			await apiMock.post('/chat/rooms/', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
			for (let i = 0; i < users.length; i++) {
				removeUser(users[i].id);
			}
			addRemoveImage(null);
			addRemoveName('');
			router.push('/messenger');
		} catch (error) {
			addToast({
				id: id,
				title: "Error",
				message: `We encountered an error while attempting to create ${group_name} Group. Please ensure all necessary information is entered correctly, or try again later.`,
				icon: "/assets/icons/light_close.png",
				backgroundColor: "bg-red-500",
			});
		}
	};
	return (
		<div className='flex w-full justify-center items-center'>
			<div className='lg:max-w-[640px] w-full justify-start items-start'>
				<div className='pl-1 font-semibold text-[18px]'>
					Create new Chat Group
				</div>
				<div className='pl-1 font-light text-[14px] text-[#94969C] pb-4'>
					Create a new chat group and invite your friends to join.
				</div>
				<form className='bg-[#000000] h-full rounded-lg p-5' onSubmit={handleSubmit}>
					<div className='flex w-full h-[100px] justify-center items-center'>
						{src ? (
							<div className='relative w-[73px] h-[73px] p-6'>
								<Image src={src} alt='Selected' height={73} width={73} />
								<div
									className='absolute top-[-10%] right-[-10%] h-4 w-4 rounded-full bg-secondary-100 grid place-content-center cursor-pointer'
									onClick={removeImage}
								>
									<Image
										src='/assets/icons/light_close.png'
										width={12}
										height={12}
										alt='close-icon'
									/>
								</div>
							</div>
						) : (
							<label className='m-3 w-[592px] h-[102px] border-2 border-[#474747] rounded flex flex-col justify-center items-center'>
								<div className='p-1'>
									<UploadIcon />
								</div>
								<div>
									<label className='font-bold text-[15px] w-full'>
										Click to upload
										<input
											type='file'
											name="icon"
											className='hidden w-full'
											onChange={handleImageUpload}
											accept='image/*'
										/>
									</label>
									<span className='text-[#878787] font-light text-[12px] pl-1'>
										or drag and drop
									</span>
								</div>
								<div className='text-[#878787] font-light text-[12px]'>
									SVG, PNG, JPG or GIF (max. 800x400px)
								</div>
							</label>
						)}
					</div>

					<div className='py-2 flex flex-col justify-start items-start w-full'>
						<div className='py-2 text-[14px] font-normal text-[#878787] h-full'>
							Name *
						</div>
						<input
							className='rounded overflow-hidden bg-[#373737] h-[47px] w-full text-[#878787] font-light text-[12px] pl-3 outline-none'
							type='text'
							value={group_name || ''}
							placeholder='Chat Group Name'
							onChange={(e) => addRemoveName(e.target.value)}
							required
						/>
					</div>

					<div className='flex flex-col justify-start items-start pt-8'>
						<Link href={`/messenger/group/choice-members`} className='w-full flex items-center justify-between rounded-lg mb-[10px]'>
							<div className='flex items-center justify-between'>
								<div className='flex items-start flex-col'>
									<div className='text-white truncate font-semibold'>
										Add Users
									</div>
									<div className='font-[200] text-[#94969C] text-xs'>
										Invite your friends to join this chat group.
									</div>
								</div>
							</div>
							<div className='flex items-center justify-end'>
								<RightArrow />
							</div>
						</Link>
						<div className='w-full flex  flex-col items-center justify-between rounded-lg mb-[10px]'>
							{users.filter(user => user.id !== id).map(user => (
								<GroupsContainer key={user.id} {...user} />
							)).slice(0, 3)}
						</div>
						<div className='flex flex-row justify-end items-end space-x-2 ml-auto mt-6'>
							<button className='bg-[#363636] w-[100px] h-[37px] rounded-[5px]' type='button' onClick={handleCancel}>
								Cancel
							</button>
							<button className={`${styles.play_now_button} bg-[#363636] w-[140px] h-[37px] rounded-[5px]`} type='submit'>
								Create
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Page;