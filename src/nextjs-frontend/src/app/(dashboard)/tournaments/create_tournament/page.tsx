'use client'

import React, { ChangeEvent, useState } from 'react';
import styles from "@/app/ui/dashboard/nav/nav.module.css";
import Image from "next/image";



export const UploadIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={25}
		height={24}
		fill="none"
	>
		<rect width={23} height={23} x={1} y={0.5} stroke="#575757" rx={3.5} />
		<path
			stroke="#878787"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
			d="M12.5 14.947V20m0-5.053 1.6 1.684m-1.6-1.684-1.6 1.684"
		/>
		<path
			stroke="#878787"
			strokeLinecap="round"
			strokeWidth={1.5}
			d="M20.5 12.718c0 1.973-1.155 3.666-2.8 4.385m-3.295-8.87a4.421 4.421 0 0 1 3.02-.01m0 0C17.17 5.847 15.233 4 12.88 4 10.356 4 8.31 6.128 8.31 8.755c-.001.564.095 1.124.283 1.652m8.832-2.184a4.566 4.566 0 0 1 1.845 1.25m-10.677.934a3.316 3.316 0 0 0-.664-.067c-1.894 0-3.429 1.597-3.429 3.567 0 1.597 1.009 2.948 2.4 3.403m1.693-6.903c.442.09.864.272 1.24.534"
		/>
	</svg>
)

export function ToggleSwitch() {
	return (
		<label className='switch'>
			<input type='checkbox' />
			<span className='slider'></span>
		</label>
	);
}



const ToggleSwitch3 = ({ isChecked, setIsChecked, id }: {
	isChecked: boolean;
	setIsChecked: (value: boolean) => void;
	id: string;
}) => {
	const toggleCheck = () => {
		setIsChecked(!isChecked);
	};

	return (
		<div className="flex items-center justify-center w-full h-full">
			<label htmlFor={id} className="flex items-center cursor-pointer">
			<div className="relative flex items-center justify-center">
  <input id={id} type="checkbox" className="sr-only" checked={isChecked} onChange={toggleCheck} />
  <div className={`block w-[50px] h-[26px] rounded-full ${isChecked ? 'bg-[#262626]' : 'bg-white'}`}></div>
  <div className={`dot absolute left-0 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full transition ${isChecked ? 'translate-x-full bg-white' : 'bg-[#262626]'}`}></div>
</div>


			</label>
		</div>
	);
};





const page = () => {
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [isPublicChecked, setIsPublicChecked] = useState(false);
	const [isMonetizeChecked, setIsMonetizeChecked] = useState(false);

	const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files && e.target.files[0];
		if (file) {
			console.log('Uploaded file:', file);
			setSelectedImage(URL.createObjectURL(file));
		}
	};

	const removeImage = () => {
		setSelectedImage(null);
	};

	return (
		<div className='flex w-full justify-center items-center '>
			<div className='w-[640px] justify-start items-start'>
				<div className='pl-1 font-semibold text-[18px]'>Create new tournament</div>
				<div className=' pl-1 font-light text-[14px] text-[#94969C]'>Organize a tournament and enjoy playing with both friends and strangers.</div>

				<div className='bg-[#000000] h-[772px]  rounded-lg p-5'>
					<div className='flex w-full justify-center items-center '>
						{selectedImage ?
							<div className='relative w-[73px] h-[73px] m-6'>
								<Image
									className=''
									src={selectedImage}
									alt="Selected"
									height={73}
									width={73}
								/>
								<div
									className='absolute top-[-10%] right-[-10%] h-4 w-4 rounded-full bg-secondary-100 grid place-content-center cursor-pointer'
									onClick={removeImage}>
									<Image
										src='/assets/icons/light_close.png'
										width={12}
										height={12}
										alt='close-icon'
									/>
								</div>
							</div> :
							<label className='m-3 w-[592px] h-[102px] border-2 border-[#474747] rounded flex flex-col justify-center items-center'>

								<><div className='p-1'><UploadIcon /></div><div>
									<label className='font-bold text-[15px]'>Click to upload
										<input
											type="file"
											className="hidden"
											onChange={handleImageUpload}
											accept="image/*" />
									</label>
									<span className='text-[#878787] font-light text-[12px]'> or drag and drop</span>
								</div><div className='text-[#878787] font-light text-[12px]'>SVG, PNG, JPG or GIF (max. 800x400px)</div></>
							</label>
						}
					</div>
					<div className='py-2 flex flex-col  justify-start items-start'>
						<div className='py-2 text-[14px] font-normal text-[#878787]'> Name * </div>
						<input
							className='rounded overflow-hidden bg-[#373737] h-[47px] w-[592px] text-[#878787] font-light text-[12px] pl-3 outline-none'
							type='text'
							placeholder='New Tournament Name'
						/>
					</div>
					<div className='py-2 flex flex-col justify-start items-start'>
						<div className='py-2 text-[14px] font-normal text-[#878787]'> Description * </div>
						<textarea
							className='rounded overflow-hidden overflow-y-scroll hide-scrollbar bg-[#373737] h-[100px] w-[592px] text-[#878787] font-light text-[12px] p-3 resize-none outline-none'
							placeholder='Please provide any relevant details you would like to share with players.'
						></textarea>
					</div>

					<div className='py-4 flex flex-col  justify-start items-start'>
						<div className='p-2 text-[14px] font-normal text-[#878787]'> Max Players *</div>
						<input
							className='rounded overflow-hidden bg-[#373737] h-[47px] w-[592px] text-[#878787] font-light text-[12px] pl-3 outline-none appearance-none'
							type='text'
							placeholder='the maximum number of players (0-16)'
							min="0"
							max="16"
							onInput={(e) => {
								const inputValue = parseInt((e.target as HTMLInputElement).value, 10);
								if (inputValue < 0 || inputValue > 16 || isNaN(inputValue)) {
									(e.target as HTMLInputElement).value = '';
								}
							}}
						/>
					</div>
					<div className='flex flex-col justify-start items-start pt-8'>
						<div className={`w-[592px]  flex items-center justify-between rounded-lg mb-[10px]`}>
							<div className='flex items-center justify-between '>
								<div className="flex items-start flex-col">
									<div className="text-white truncate font-semibold"> Public </div>
									<div className={`font-[200] text-[#94969C] text-xs `}>Make your tournament public so that everyone can join. </div>
								</div>
							</div>
							<div className="flex items-center justify-end">
								<ToggleSwitch/>
							</div>
						</div>
						<div className={`w-[592px]  flex items-center justify-between rounded-lg mb-[10px] pt-6`}>
							<div className='flex items-center justify-between '>
								<div className="flex items-start flex-col">
									<div className="text-white truncate font-semibold"> monetize </div>
									<div className={`font-[200] text-[#94969C] text-xs `}>By enabling this feature, your tournament will be featured on the homepage. </div>
								</div>
							</div>
							<div className="flex items-center justify-end">
								<ToggleSwitch/>
							</div>
						</div>
						<div className='flex flex-row justify-end items-end space-x-2 pt-6 ml-auto'>
							<button className='bg-[#363636] w-[100px] h-[37px] rounded-[5px]'> Cancel</button>
							<button className={`${styles.play_now_button} bg-[#363636] w-[140px] h-[37px] rounded-[5px] `}> Create </button>
						</div>
					</div>

				</div>
			</div>
		</div>
	)
}

export default page
