'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from '@/app/ui/dashboard/nav/nav.module.css'
import Link from 'next/link'
import PlayerCard from '../player-card'
import { useSearchParams } from 'next/navigation'
import { getUser, UserDetail } from '@/api/user'
import { user } from '@/type/auth/user'
import AuthWebSocket from "@/lib/AuthWebSocket";
import { WS_BASE_URL } from '@/constant/api'
import GameCountdown from "@/hooks/game-count-down";
import { useRouter } from 'next/navigation'
import LeftArrow from '@/app/ui/dashboard/icons/content_area/left-arrow'
import { it } from 'node:test'
import { serialize } from 'node:v8'


const page = ({ searchParams }: {
	searchParams?: {
		player?: string;
		isRobot?: string;
	};
}) => {
	let player = searchParams?.player || '';
	let isRobot = searchParams?.isRobot || '';
	const [myInfo, setMyInfo] = useState<user>();
	const [playerInfo, setPlayerInfo] = useState<user>();
	const router = useRouter();
	const targetDateRef = useRef(new Date(new Date().getTime() + 1000 * 120));
	const sec = useRef(new Date(new Date().getTime() + 1000 * 5));
	const [minutes, seconds] = GameCountdown(targetDateRef.current);
	const [isMatched, setIsMatched] = useState(false);
	const [uid, setUuid] = useState<number>(0);

	useEffect(() => {
		const fetchInfo = async () => {
			try {
				const myInfo = await getUser('me')
				setMyInfo(myInfo)
			}
			catch (e) {
				console.log("ERROR in fetching user data: ", e);
			}
		}
		fetchInfo();
	}, []);
	useEffect(() => {
		const fetchPlayerInfo = async () => {
			try {
				const playerInfo = await getUser(player)
				setPlayerInfo(playerInfo)
			}
			catch (e) {
				console.log("ERROR in fetching user data: ", e);
			}
		}
		fetchPlayerInfo();
	}, [player]);

	let socket = useRef<any>(null)
	useEffect(() => {
		if (minutes == 0 && seconds == 0 && !isMatched) {
			if (socket.current) {
				socket.current.close();
			}
			router.replace('/game')
		}
	}, [minutes, seconds])

	useEffect(() => {
		if (isMatched) {
			router.replace(`/ingame?uuid=${uid}`)
			socket.current.close()
		}
	}, [isMatched])

	useEffect(() => {
		if (socket.current)
			return
		socket.current = new AuthWebSocket(`${WS_BASE_URL}/game/normal/looby/`);
		socket.current.onmessage = (event: any) => {
			const data = JSON.parse(event.data);
			const game_room = data;
			if (game_room) {
				console.log('Game Room', game_room);
				setIsMatched(true);
				setUuid(game_room.game_uuid);
				router.replace(`/match-making?player=${game_room.player}`);
			}

		};
		socket.current.onopen = () => {
			console.log('game Socket is opened')
		}
		socket.current.onerror = (error: any) => {
			console.error('WebSocket error', error);
		};

	}, []);
	return (
		<div className=''>
			<div className="bg-image">
				<Image
					src="/assets/images/matching-bg.jpg"
					layout="fill"
					alt=''
					objectFit="cover"
					quality={100}
				/>
				<div
					className="absolute  h-full w-full overflow-hidden bg-fixed p-16">
					<button className={`${styles.play_now_button} w-[140px] h-[44px] font-semibold text-[14px]`} onClick={() => {
						socket.current.close();
						router.replace('/game')
					}}>
						<span className='ml-1 lowercase flex flex-row items-start justify-start'>
							<div className=' justify-start items-start'
							>
								<LeftArrow />
							</div>
							<div className='px-1'>
								{minutes}m:{seconds}s
							</div>
						</span>
					</button>
					<div className="flex h-full items-center justify-center">
						<div className="text-white p-32">
							<PlayerCard href={myInfo?.image_url || "/assets/images/Unknown.jpg"} name={myInfo?.username || '----'} lvl={String(myInfo?.level)} icon={myInfo?.rank?.icon || "/assets/icons/Gold_3_Rank.png"} />
						</div>
						<div className=' font-black text-[60px] text-[#A2A2A2] '>VS</div>
						{
							isRobot === 'true' ?
								<div className="my-4 p-32">
									<div role="status" className="  flex items-center justify-center  bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
										<PlayerCard href={"/assets/images/robot.webp"} name={"Machine"} lvl={String("---")} icon={"/assets/icons/Gold_3_Rank.png"} />
									</div>
								</div>
								: !playerInfo?.username ?
									<div className="scroll-parent p-32 max-h-[600px]">
										<div className="scroll-element primary my-4">
											<div className="text-white my-4">
												<PlayerCard href='/assets/images/Unknown.jpg' name='Unknown' lvl={'---'} icon='/assets/icons/Gold_3_Rank.png' />
											</div>
											<div className="text-white my-4">
												<PlayerCard href='/assets/images/Unknown.jpg' name='Unknown' lvl={'---'} icon='/assets/icons/Gold_3_Rank.png' />
											</div>
										</div>
										<div className="scroll-element secondary my-4">
											<div className="text-white my-4">
												<PlayerCard href='/assets/images/Unknown.jpg' name='Unknown' lvl={'---'} icon='/assets/icons/Gold_3_Rank.png' />
											</div>
											<div className="text-white my-4">
												<PlayerCard href='/assets/images/Unknown.jpg' name='Unknown' lvl={'---'} icon='/assets/icons/Gold_3_Rank.png' />
											</div>
										</div>
									</div> :
									<div className="my-4 p-32">
										<div role="status" className="  flex items-center justify-center  bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
											<PlayerCard href={playerInfo?.image_url || '/assets/images/Unknown.jpg'} name={playerInfo.username} lvl={String(playerInfo?.level)} icon={playerInfo?.rank?.icon} />
										</div>
									</div>

						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default page


