'use client'
import React from 'react';
import { FilterBtn } from './content_area/filterBtn';
import { UserContainer } from './content_area/userContainer';
import { AllOnlinePlayers } from '@/constant/dashboard';
import Empty from '../Empty';

function TopPlayers() {
	return (
		<div className='' >
			<FilterBtn name='Top Players' />
			<div>
		  {!AllOnlinePlayers.length ? (
			<div className="flex h-[320px] w-full justify-center items-center">
			  <Empty text="No Top players are available right now" />
			</div>
		  ) : (
			<div>
			  { AllOnlinePlayers.slice(0, 4).map((item, index) => (
				<div key={index}>
				  <UserContainer
					name={item.name}
					href={item.href}
					number={item.number}
					index={index + 1}
				  />
				</div>
			  ))}
			</div>
		  )}
		</div>
		</div>
	);
}

export default TopPlayers;
