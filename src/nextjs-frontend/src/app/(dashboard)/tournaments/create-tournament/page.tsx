'use client'

import React, { useState, useEffect } from 'react';


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


function ToggleSwitch() {
	const [isClicked, setIsClicked] = useState(false);

	const handleClick = () => {
		setIsClicked(prevState => !prevState);
	};

	return (
		<div className="relative" onClick={handleClick}>
			{isClicked ? (
				<>
					<input type="checkbox" className="hidden" />
					<div className="absolute top-0 right-0 w-[50px] h-[24px] bg-[#262626] rounded-full shadow flex items-center">
						<div className="ml-auto w-[24px] h-[24px] bg-white rounded-full"></div>
					</div>
				</>
			) : (
				<>
					<input type="checkbox" className="hidden" />
					<div className="absolute w-[50px] h-[24px] bg-white rounded-full shadow right-0 ">
						<div className="mr-auto w-[24px] h-[24px] bg-[#262626] rounded-full"></div>
					</div>
				</>
			)}
		</div>
	);
}



const page = () => {
	return (
		<div className='flex w-full justify-center items-center '>
			<div className='w-[640px] justify-start items-start'>
				<div className='pl-1 font-semibold text-[18px]'>Create new tournament</div>
				<div className=' pl-1 font-light text-[14px] text-[#94969C]'>Organize a tournament and enjoy playing with both friends and strangers.</div>

				<div className='bg-[#000000] h-[772px] mt-4  rounded-lg p-5'>
					<div className='flex w-full justify-center items-center '>
						<div className='m-3 w-[592px] h-[102px] border-2 border-[#474747] rounded flex flex-col justify-center items-center'>
							<div className='p-1'><UploadIcon /></div>
							<div>
								<span className='font-bold text-[15px]'>Click to upload</span>
								<span className='text-[#878787] font-light text-[12px]'> or drag and drop</span>
							</div>
							<div className='text-[#878787] font-light text-[12px]'>SVG, PNG, JPG or GIF (max. 800x400px)</div>
						</div>
					</div>
					<div className='py-2 flex flex-col  justify-start items-start'>
						<div className='py-2 text-[14px] font-normal text-[#878787]'> Name * </div>
						<input
							className='rounded overflow-hidden bg-[#60606080] h-[47px] w-[592px] text-[#878787] font-light text-[12px] pl-3 outline-none'
							type='text'
							placeholder='New Tournament Name'
						/>
					</div>
					<div className='py-2 flex flex-col justify-start items-start'>
						<div className='py-2 text-[14px] font-normal text-[#878787]'> Description * </div>
						<textarea
							className='rounded overflow-hidden overflow-y-scroll hide-scrollbar bg-[#60606080] h-[100px] w-[592px] text-[#878787] font-light text-[12px] p-3 resize-none outline-none'
							placeholder='Please provide any relevant details you would like to share with players.'
						></textarea>
					</div>

					<div className='py-4 flex flex-col  justify-start items-start'>
						<div className='p-2 text-[14px] font-normal text-[#878787]'> Max Players *</div>
						<input
							className='rounded overflow-hidden bg-[#60606080] h-[47px] w-[592px] text-[#878787] font-light text-[12px] pl-3 outline-none'
							type='text'
							placeholder='New Tournament Name'
						/>
					</div>
					<div className='flex flex-col  justify-start items-start'>
						<div className={`w-[592px] h-[69px] flex items-center justify-between rounded-lg   mb-[10px]`}>
							<div className='flex items-center justify-between '>
								<div className="flex items-start flex-col">
									<div className=" text-white truncate font-semibold"> Public </div>
									<div className={`font-[200] text-white text-xs `}>Make your tournament public so that everyone can join. </div>
								</div>
							</div>
							<div className="flex items-center justify-end">
								<ToggleSwitch />
							</div>
						</div>
						<div className={`w-[592px] h-[69px] flex items-center justify-between rounded-lg   mb-[10px]`}>
							<div className='flex items-center justify-between '>
								<div className="flex items-start flex-col">
									<div className=" text-white truncate font-semibold"> monetize </div>
									<div className={`font-[200] text-white text-xs `}>By enabling this feature, your tournament will be featured on the homepage. </div>
								</div>
							</div>
							<div className="flex items-center justify-end">
								<ToggleSwitch />
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	)
}

export default page
