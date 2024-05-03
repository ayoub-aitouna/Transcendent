'use client'
import React from 'react';
import { FilterBtn } from './content_area/filterBtn';
import { UserContainer } from './content_area/userContainer';

function TopPlayers() {
	return (
		<div className='' >
			<FilterBtn name='Top Players' />
			{Array(4).fill(0).map((_, index) => (
				<UserContainer
					key={index} // Add a unique key for each component
					name='Aaitouna'
					href='/profile'
					number={165}
					index={index + 1} // Use the index variable to set the index prop dynamically
				/>
			))}
		</div>
	);
}

export default TopPlayers;
