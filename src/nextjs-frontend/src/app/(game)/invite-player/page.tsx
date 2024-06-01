import React from 'react'
import Image from 'next/image'
import styles from '@/app/ui/dashboard/nav/nav.module.css'
import Link from 'next/link'
import PlayerCard from '../player-card'
import { useAppSelector } from '@/redux/store'
import { useSearchParams } from 'next/navigation'
import { getUser } from '@/api/user'
import { useRouter } from 'next/router';
import { user } from '@/type/auth/user'

export async function getServerSideProps(context : any) {
	const { player } = context.query;
	const playerInfo = await getUser(player);
	const myInfo = await getUser('me');

	return {
		props: {
			playerInfo,
			myInfo,
		},
	};
}

const Page = ({ playerInfo, myInfo }:{
	playerInfo :user;
	myInfo :user;
}) => {
	return (
		<div className=''>
			<div className="bg-image">
				<Image
					src={myInfo.image_url}
					layout="fill"
					alt=''
					objectFit="cover"
					quality={100}
				/>
				<div
					className="absolute  h-full w-full overflow-hidden bg-fixed p-16">
					<Link href="/game">
						<button className={`${styles.play_now_button} w-[140px] h-[37px] font-semibold text-[14px]`}> Go Back </button>
					</Link>
					<div className="flex h-full items-center justify-center">
						<div className="text-white p-32">
							<PlayerCard href={myInfo.image_url} name={myInfo.username} lvl={String(myInfo.level)} icon={myInfo.rank.icon} />
						</div>
						<div className=' font-black text-[60px] text-[#A2A2A2] '>VS</div>
						<div className="text-white m-32 ">
							<PlayerCard href={playerInfo.image_url} name={playerInfo.username} lvl={String(playerInfo.level)} icon={playerInfo.rank.icon} />
						</div>
					</div>
				</div>
			</div>x
		</div>
	)
}

export default Page
