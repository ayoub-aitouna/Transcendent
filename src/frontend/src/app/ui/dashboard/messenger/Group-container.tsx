"use client";

import apiMock from "@/lib/axios-mock";
import { useAppSelector } from "@/redux/store";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
;
import { ImageSrc } from "@/lib/ImageSrc";

export function GroupsContainer({ name, href, number, id }: { name: string; href: string; number: number; id: number }) {
	const [Add, setAdd] = useState(false);
	const [Remove, setRemove] = useState(false);
	const handleAdd = async () => {
		try {
			setAdd(true);
			setRemove(false);
		} catch (err: any) {
			console.error("Failed to send friend request", err);
		}
	};
	const handleRemove = async () => {
		try {
			setRemove(true);
			setAdd(false);
		} catch (err: any) {
			console.error("Failed to send friend request");
		}
	};
	return (
		<div className='mt-2 w-full h-[69px] flex items-center justify-between rounded bg-[#373737] p-4 mb-3'>
			<Link
				href={`/profile/${id}`}
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
				<div className='flex items-center justify-between mx-auto text-white text-[16px] font-medium'>
					{
						Remove ? (
							<div onClick={handleAdd}>
								<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M5.5 13.4043V11.4043H19.5V13.4043H5.5Z" fill="#C60000" />
								</svg>
							</div>

						) : (
							<div onClick={handleRemove}>
								<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M11.5 13.4043H5.5V11.4043H11.5V5.4043H13.5V11.4043H19.5V13.4043H13.5V19.4043H11.5V13.4043Z" fill="#F8F8F8" />
								</svg>
							</div>

						)
					}
				</div>
			</div>
		</div >
	);
}