'use client'

import React from 'react';
import { FilterBtn } from './content_area/filterBtn';
import { UserContainer } from './content_area/userContainer';
import ViewAll from './content_area/viewAll';

function OnlinePlayers() {
	const handleClick = () => {
		window.location.href = "/profile";
	};
	const arr = new Array(4).fill(undefined);
	return (
		<div className='relative h-full' >
			<FilterBtn name='Online Players' />
			{Array(4).fill(0).map((_, index) => (
				<UserContainer
					key={index}
					name='Aaitouna'
					href='/profile'
					number={165}
					index={index + 1}
				/>
			))}
			<div className="w-full absolute bottom-0">
				<div className="w-full grid place-content-center">
					<div className='flex flex-row items-center justify-center'> <ViewAll /> </div>
				</div>
			</div>
		</div>
	);
}

export default OnlinePlayers;
