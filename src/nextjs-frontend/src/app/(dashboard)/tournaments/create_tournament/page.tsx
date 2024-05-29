"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "@/app/ui/dashboard/nav/nav.module.css";
import Image from "next/image";
import ToggleSwitch from "@/app/ui/dashboard/component/Toggle-switch";
import apiMock from "@/lib/axios-mock";

export const UploadIcon = () => (
	<svg xmlns='http://www.w3.org/2000/svg' width={25} height={24} fill='none'>
		<rect width={23} height={23} x={1} y={0.5} stroke='#575757' rx={3.5} />
		<path
			stroke='#878787'
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={1.5}
			d='M12.5 14.947V20m0-5.053 1.6 1.684m-1.6-1.684-1.6 1.684'
		/>
		<path
			stroke='#878787'
			strokeLinecap='round'
			strokeWidth={1.5}
			d='M20.5 12.718c0 1.973-1.155 3.666-2.8 4.385m-3.295-8.87a4.421 4.421 0 0 1 3.02-.01m0 0C17.17 5.847 15.233 4 12.88 4 10.356 4 8.31 6.128 8.31 8.755c-.001.564.095 1.124.283 1.652m8.832-2.184a4.566 4.566 0 0 1 1.845 1.25m-10.677.934a3.316 3.316 0 0 0-.664-.067c-1.894 0-3.429 1.597-3.429 3.567 0 1.597 1.009 2.948 2.4 3.403m1.693-6.903c.442.09.864.272 1.24.534'
		/>
	</svg>
);


const CreateTournamentPage = () => {
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [src, setSrc] = useState<string | null>(null);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [startDate, setStartDate] = useState('');
	const [maxPlayers, setMaxPlayers] = useState('');
	const [isPublic, setIsPublic] = useState(false);
	const [isMonetized, setIsMonetized] = useState(false);

	const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files)
			return
		const file = e.target.files[0]
		console.log(file)
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
		formData.append('name', name);
		formData.append('description', description);
		formData.append('start_date', startDate);
		formData.append('max_players', maxPlayers);
		formData.append('is_public', String(isPublic));
		formData.append('is_monetized', String(isMonetized));
		formData.append('icon_file', selectedImage ? selectedImage : '');
		try {
			const res = await apiMock.post('/game/Tournament/', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
			alert('Tournament created successfully!');
		} catch (error) {
			console.error('Error:', error);
			alert('An error occurred while creating the tournament.');
		}
	};

	return (
		<div className='flex w-full justify-center items-center'>
			<div className='w-[640px] justify-start items-start'>
				<div className='pl-1 font-semibold text-[18px]'>
					Create new tournament
				</div>
				<div className='pl-1 font-light text-[14px] text-[#94969C] pb-4'>
					Organize a tournament and enjoy playing with both friends and strangers.
				</div>

				<form className='bg-[#000000] h-[830px] rounded-lg p-5' onSubmit={handleSubmit}>
					<div className='flex w-full h-[100px] justify-center items-center'>
						{src ? (
							<div className='relative w-[73px] h-[73px] p-6'>
								<Image
									src={src}
									alt='Selected'
									height={73}
									width={73}
								/>
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
											className='hidden'
											onChange={handleImageUpload}
											accept='image/*'
										// required
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
							placeholder='New Tournament Name'
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</div>
					<div className='py-2 flex flex-col justify-start items-start'>
						<div className='py-2 text-[14px] font-normal text-[#878787]'>
							Description *
						</div>
						<textarea
							className='rounded overflow-hidden overflow-y-scroll hide-scrollbar bg-[#373737] h-[100px] w-[592px] text-[#878787] font-light text-[12px] p-3 resize-none outline-none'
							placeholder='Please provide any relevant details you would like to share with players.'
							onChange={(e) => setDescription(e.target.value)}
							required
						></textarea>
					</div>

					<div className='py-4 flex flex-col justify-start items-start'>
						<div className='p-2 text-[14px] font-normal text-[#878787]'>
							Max Players *
						</div>
						<input
							className='rounded overflow-hidden bg-[#373737] h-[47px] w-[592px] text-[#878787] font-light text-[12px] pl-3 outline-none appearance-none'
							type='number'
							placeholder='the maximum number of players (0-16)'
							min='0'
							max='16'
							onChange={(e) => setMaxPlayers(e.target.value)}
							required
							style={{
								WebkitAppearance: 'none',
								MozAppearance: 'textfield',
								margin: '0'
							}}
						/>


					</div>

					<div className='py-2 flex flex-col justify-start items-start'>
						<div className='py-2 text-[14px] font-normal text-[#878787]'>
							Start Date *
						</div>
						<input
							className='rounded overflow-hidden bg-[#373737] h-[47px] w-[592px] text-[#878787] font-light text-[12px] pl-3 outline-none'
							type='datetime-local'
							placeholder='mm/dd/yyyy hh:mm am/pm'
							onChange={(e) => setStartDate(e.target.value)}
							required
						/>
					</div>
					<div className='flex flex-col justify-start items-start pt-8'>
						<div className='w-[592px] flex items-center justify-between rounded-lg mb-[10px]'>
							<div className='flex items-center justify-between'>
								<div className='flex items-start flex-col'>
									<div className='text-white truncate font-semibold'>
										Public
									</div>
									<div className='font-[200] text-[#94969C] text-xs'>
										Make your tournament public so that everyone can join.
									</div>
								</div>
							</div>
							<div className='flex items-center justify-end'>
								<ToggleSwitch
									checked={isPublic}
									onCheck={() => setIsPublic(!isPublic)} // Change 'onChange' to 'onCheck'
								/>
							</div>
						</div>
						<div className='w-[592px] flex items-center justify-between rounded-lg mb-[10px]'>
							<div className='flex items-center justify-between'>
								<div className='flex items-start flex-col'>
									<div className='text-white truncate font-semibold'>
										Monetize
									</div>
									<div className='font-[200] text-[#94969C] text-xs'>
										By enabling this feature, your tournament will be featured
										on the homepage.
									</div>
								</div>
							</div>
							<div className='flex items-center justify-end'>
								<ToggleSwitch
									checked={isMonetized}
									onCheck={() => setIsMonetized(!isMonetized)}
								/>
							</div>
						</div>
						<div className='flex flex-row justify-end items-end space-x-2 ml-auto mt-12'>
							<button
								className='bg-[#363636] w-[100px] h-[37px] rounded-[5px]'
								type='button'
							>
								Cancel
							</button>
							<button
								className={`${styles.play_now_button} bg-[#363636] w-[140px] h-[37px] rounded-[5px]`}
								type='submit'
							>
								Create
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateTournamentPage;
