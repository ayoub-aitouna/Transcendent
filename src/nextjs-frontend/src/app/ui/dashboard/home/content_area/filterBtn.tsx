import Filter from "../../icons/content_area/filters";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Order from "../../icons/content_area/order";
import NameOrder from "../../icons/content_area/name-order";
import LevelOrder from "../../icons/content_area/level-order";
import clsx from "clsx";


export function FilterBtn({ name }: {
	name: string;
}) {
	const [isClicked, setIsClicked] = useState(false);

	const handleClick = () => {
		setIsClicked(!isClicked);
	};

	// State to track the current sorting option
	const [sortBy, setSortBy] = useState('');

	// Function to handle sorting by order
	const handleOrderByOrder = () => {
		// Set sortBy state to 'order'
		setSortBy('order');
		// Perform sorting logic by order
	};

	// Function to handle sorting by name
	const handleOrderByName = () => {
		// Set sortBy state to 'name'
		setSortBy('name');
		// Perform sorting logic by name
	};

	// Function to handle sorting by level
	const handleOrderByLevel = () => {
		// Set sortBy state to 'level'
		setSortBy('level');
		// Perform sorting logic by level
	};
	return (
		<div className=" relative">
			<div className="mb-8 flex items-center justify-between">
				<div className=" text-white  truncate font-bold text-base">{name}</div>
				<button
					className={`flex-row items-center rounded-md  bg-[#444444] w-[93px] h-[32px]`} onClick={handleClick}>
					<div className='mx-auto flex  justify-start ml-2'> <Filter /> <div />
						<div className="flex items-center justify-between mx-auto cursor-pointer">
							<div className="text-white text-xs font-semibold"> FILTER </div>
						</div>
					</div>
				</button>
				{isClicked && (
					<div id="profile-panel" className="absolute mt-2 p-3 right-0 top-full bg-[#474747] w-[200px] h-[120px] rounded-md p">
						<div className="flex items-start">
							<div className="flex flex-col rounded-full items-start">
								<div className="rounded-full flex flex-row items-center justify-center w-[30px] h-[30px] pl-6" onClick={handleOrderByOrder}>
									{/* Icon for sorting by order */}
									<div className="" ><Order /></div>
									<div className={`pl-1 text-[16px] font-bold `}>Order</div>
								</div>
								<div className="rounded-full flex flex-row items-center justify-center  h-[30px] pl-6 cursor-pointer" onClick={handleOrderByName}>
									<div className="">< NameOrder color={sortBy === 'name' ? '#FD4106' : '#878787'} /></div>
									<div className={`pl-1 text-[16px]  ${sortBy === 'name' ? 'text-[#FD4106]' : 'text-[#878787]'} `}> By names </div>
								</div>

								<div className="rounded-full flex flex-row items-center justify-center  pl-6 cursor-pointer " onClick={handleOrderByLevel}>
									<div className="" ><LevelOrder color={sortBy === 'level' ? '#FD4106' : '#878787'} /></div>
									<div className={clsx("pl-1 text-[16px] ",
										{
											'text-[#FD4106]': sortBy === 'level',
											"text-[#878787]": sortBy !== 'level'
										})} > By level</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div >
	);
};