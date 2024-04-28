'use client'
import React from 'react';
import { FilterBtn } from './content_area/filterBtn';
import { UserContainer } from './content_area/userContainer';
import ViewAll from './content_area/viewAll';

function TeamRanking() {
	const handleClick = () => {
		window.location.href = "/profile";
	};
	return (
		<div >
			<FilterBtn name='Team Ranking' />
			{Array(4).fill(0).map((_, index) => (
				<UserContainer
					key={index}
					name='Aaitouna'
					href='/profile'
					number={165}
					index={index + 1}
				/>
			))}
		</div>
	);
}

export default TeamRanking;
