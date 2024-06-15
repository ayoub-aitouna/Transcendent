'use client'
import React, { useEffect, useState } from 'react';
import { UserContainer } from './content_area/userContainer';
import Empty from '../component/Empty';
import { PaginationApiResponse } from '@/type';
import apiMock from '@/lib/axios-mock';
import { Player } from '@/type/dashboard/players';

function TopPlayers() {
	const [topPlayers, setTopPlayers] = useState<PaginationApiResponse<Player>>();
	useEffect(() => {
        const fetchTopPlayers = async () => {
            try {
                const response = await apiMock.get('/users/top-players');

                if (response.status === 200) {
                    setTopPlayers(response.data);
                } else {
                    console.error('Failed to fetch top players');
                }
            } catch (error) {
                console.error('Error fetching top players:', error);
            }
        };
        fetchTopPlayers();
	}, []);

	return (
		<div className='' >

			<div className={`text-white  truncate font-bold text-base mb-8`}> Top Players</div>
			<div>
				{!topPlayers?.results.length ? (
					<div className="flex h-[320px] w-full justify-center items-center">
						<Empty text="No Top players are available right now" />
					</div>
				) : (
					<div>
						{topPlayers.results.slice(0, 4).map((item, index) => (
							<div key={index}>
								<UserContainer
									player={item}
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
