// app/messenger/New-group/new-group.tsx
"use client";

import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import styles from "@/app/ui/dashboard/nav/nav.module.css";
import Image from "next/image";
import apiMock from "@/lib/axios-mock";
import { useRouter } from "next/navigation";
import { UploadIcon } from "@/app/ui/dashboard/icons/content_area/UploadIcon";
import RightArrow from "@/app/ui/dashboard/icons/content_area/right-arrow";
import Link from "next/link";
import GroupsContainer from "@/app/ui/dashboard/messenger/Group-container";
import { UserContext } from "./context/UserContext";


const Page = () => {
	const router = useRouter();
	const { users } = useContext(UserContext);
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [src, setSrc] = useState<string | null>(null);
	const [name, setName] = useState('');
	console.log(" users : -- > ", users);

	const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		const file = e.target.files[0];
		setSelectedImage(file);
		const reader = new FileReader();
		reader.onload = () => {
			const dataURL = reader.result;
			setSrc(dataURL as string);
		};
		reader.readAsDataURL(file);
	};

	const removeImage = () => {
		setSrc(null);
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('Name', name);
		formData.append('Type', 'Group');
		formData.append('Input members', users.map(user => user.id).join(','));
		if (selectedImage) formData.append('icon', selectedImage);

		try {
			await apiMock.post('/chat/rooms/', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
			router.push('/messenger');
		} catch (error) {
			console.error('Error:', error);
			alert('An error occurred while creating the group chat.');
		}
	};

	return (
		<div className='flex w-full justify-center items-center'>
			<div className='w-[640px] justify-start items-start'>
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
									<label className='font-bold text-[15px]'>
										Click to upload
										<input
											type='file'
											name="icon"
											className='hidden'
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

					<div className='py-2 flex flex-col justify-start items-start'>
						<div className='py-2 text-[14px] font-normal text-[#878787]'>
							Name *
						</div>
						<input
							className='rounded overflow-hidden bg-[#373737] h-[47px] w-[592px] text-[#878787] font-light text-[12px] pl-3 outline-none'
							type='text'
							placeholder='Chat Group Name'
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</div>

					<div className='flex flex-col justify-start items-start pt-8'>
						<Link href={'/messenger/New-group/choice-members'} className='w-[592px] flex items-center justify-between rounded-lg mb-[10px]'>
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
						<div className='w-[592px] flex items-center justify-between rounded-lg mb-[10px]'>
							{users.map(user => (
								<GroupsContainer key={user.id} {...user} />
							))}
						</div>
						<div className='flex flex-row justify-end items-end space-x-2 ml-auto mt-12'>
							<button className='bg-[#363636] w-[100px] h-[37px] rounded-[5px]' type='button'>
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
