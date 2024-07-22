"use client"
import { Friend } from '@/type/auth/user';
import React, { useContext, useEffect, useState } from 'react'
import AddGroupMembers from '../dashboard/messenger/add-group-members';
import { AddMemberFromGroup, roomItem } from '@/api/chat';
import { user } from '@/app/(dashboard)/messenger/context/UserContext';
import Image from 'next/image';

const UploadImage = ({
	onCancel,
	onConfirm,
	imageSrc,
	error,

}: {
	onCancel: () => void
	onConfirm: () => void;
	imageSrc: string | null
	error: boolean

}) => {
	if (!imageSrc)
		return
	return (
		<div
			className='inline-block transform overflow-hidden rounded-lg bg-black px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle'
			role='dialog'
			aria-modal='true'
			aria-labelledby='modal-headline'>
			<div className='flex justify-center items-center'>
				{!error ?
					<Image
						// className='bg-white w-[53px] h-[53px] rounded-full' 
						src={imageSrc}
						alt='Profile Image'
						width={300}
						height={300}>
					</Image>
					:
					<p className="mt-4 text-sm font-extrabold">
						<Image
							className="w-[100px] h-[100px] rounded-full flex justify-center items-center mx-auto"
							src={'/assets/icons/connected.png'}
							alt='Profile Image'
							width={300}
							height={300}
						/>
						<span className="block mt-2">
							The File or Image you are trying to upload is not acceptable on our Chat Application. Please try again With PNG or JPEG formats Only.
						</span>
					</p>

				}
			</div>
			<div className='flex mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
				{!error ?
					<><button
						type='button'
						onClick={onConfirm}
						data-behavior='commit'
						className='inline-flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primbg-primary focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'>
						Send
					</button><button
						onClick={onCancel}
						type='button'
						data-behavior='cancel'
						className='mt-3  inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primbg-primary focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm'>
							Cancel
						</button></>
					:
					<button
						onClick={onCancel}
						type='button'
						data-behavior='cancel'
						className='mt-3 mx-auto inline-flex w-full justify-center items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primbg-primary focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm'>
						Understood
					</button>
				}
			</div>
		</div>
	); 
};

export default UploadImage
