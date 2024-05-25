'use client'
import React, { useState, useEffect } from "react";
import { parseCookies } from 'nookies';
import { FilterBtn } from './content_area/filterBtn';
import Image from 'next/image';
import Empty from "../component/Empty";
import InviteIcon from "../icons/invite";
import Link from "next/link";
import { PaginationApiResponse } from "@/type";
import apiMock from "@/lib/axios-mock";
import { Player} from "@/type/dashboard/players";


export function PlayersContainer({ player }: {player: Player}) {
	return (
		<button className={`mt-2 w-[341px] h-[69px] flex items-center justify-between rounded-lg bg-[#373737] overflow-hidden  p-2 mb-[10px]`}>
			<Link href={`/profile/${player.id}`} className='flex items-center justify-between '>
				<Image className="bg-white  w-[53px] h-[53px] rounded-full" src={player.image_url} alt="Profile Image" width={53} height={53} />
				<div />
				<div className="flex items-start flex-col max-w-[80px]">
					<div className="ml-[10px]  text-white truncate text-[18px] font-bold">{player.username}</div>
					<div className={`ml-[10px]  text-[#878787] text-[12px] truncate font-medium`}>Level {String(player.level)}</div>
				</div>
			</Link>

			<Link href={`/making-machine?player=${player.username}`}
				className={`flex-row items-center rounded-[4px]  bg-[#FF3D00] w-[87px] h-[27px]`}>
				<div className='flex items-center justify-between ml-2 mx-auto text-white text-[16px] font-medium"'> <InviteIcon /> <div />
					<div className=" flex items-center justify-between mx-auto text-white text-[16px] font-medium"> Invite </div>
				</div>
			</Link>

		</button>
	);
};

function OnlinePlayers() {
	const [onlinePlayers, setOnlinePlayers] = useState<PaginationApiResponse<Player>>();
	const [ViewALlClicked, setViewALlClicked] = useState(false);
	const handleViewAll = () => {
		setViewALlClicked(!ViewALlClicked);
	};

	useEffect(() => {
        const fetchOnlinePlayers = async () => {
            try {
                const response = await apiMock.get('/users/online-players');

                if (response.status === 200) {
                    setOnlinePlayers(response.data);
                } else {
                    console.error('Failed to fetch online players');
                }
            } catch (error) {
                console.error('Error fetching online players:', error);
            }
        };
        fetchOnlinePlayers();
	}, []);


	return (
		<div className='relative h-full' >
			<FilterBtn name='Online Players' />
			{onlinePlayers?.results.length === 0 ?
				<div className="flex h-[320px] w-full justify-center items-center">
					<Empty text="no Online Players are available right now" />
				</div>
				:
				<div className={`${ViewALlClicked
					? "h-[308px] overflow-y-scroll hide-scrollbar"
					: "h-[308px] "
					}`}>
					{onlinePlayers?.results.map((item, index) => (
						<div key={index}>
							<PlayersContainer
								player={item}
							/>
						</div>
					)).slice(0, (ViewALlClicked ? onlinePlayers?.results.length  : 4))}
					{(onlinePlayers?.results.length ?? 0) > 4 && (
						<div className="w-full absolute bottom-0" onClick={handleViewAll}>
							<div className="w-full grid place-content-center">
								<div className='flex flex-row items-center justify-center'>
									<button className="flex  flex-row  rounded-[4px] bg-[#444444] p-2 h-[28px] min-w-[73px] ">
										<div className="flex flex-row max-w-[80px] items-center justify-between mx-auto">
											<div className="font-semibold text-[#A5A5A5] tracking-[.025] text-[10px]">{ViewALlClicked ? "SHOW LESS" : "VIEW MORE"}</div>
										</div>
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			}
		</div>
	);
}

export default OnlinePlayers;
