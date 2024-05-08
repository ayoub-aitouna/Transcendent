import Filter from "../../icons/content_area/filters";
import React, { useState, useEffect } from 'react';
import Link from "next/link";


export function FilterBtn({ name }: {
	name: string;
}) {
	const [isClicked, setIsClicked] = useState(false);

	const handleClick = () => {
		setIsClicked(!isClicked);
	};
	return (
		<div className=" relative">
			<div className="mb-8 flex items-center justify-between">
				<div className=" text-white  truncate font-bold text-base">{name}</div>
				<button
					className={`flex-row items-center rounded-md  bg-[#444444] w-[93px] h-[32px]`} onClick={handleClick}>
					<div className='mx-auto flex  justify-start ml-2'> <Filter /> <div />
						<div className="flex items-center justify-between mx-auto ">
							<div className="text-white text-xs font-semibold"> FILTER </div>
						</div>
					</div>
				</button>
				{isClicked && (
				<div id="profile-panel" className="mt-[3px] absolute right-0 top-full bg-[#242424] w-[200px] h-[145px] p-4 rounded-md">
					<div className="flex items-start">
						<div className="rounded-full flex items-start">
							<div className="rounded-full flex items-start w-[30px] h-[30px]">
							</div>
						</div>
						<div className="flex flex-col items-start ml-[5px]">
						</div>
					</div>


				</div>
			)}
			</div>
		</div>
	);
};