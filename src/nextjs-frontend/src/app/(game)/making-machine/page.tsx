'use client'
import React from 'react'
import Image from 'next/image'
import styles from '@/app/ui/dashboard/nav/nav.module.css'
import Link from 'next/link'
import PlayerCard from '../player-card'
import { useSearchParams } from 'next/navigation'

const page = () => {
	const searchParams = useSearchParams()

	const player = searchParams.get('player')
	console.log('player name', player);
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
					<Link href="/game">
						<button className={`${styles.play_now_button} w-[140px] h-[37px] font-semibold text-[14px]`}> Go Back </button>
					</Link>
					<div className="flex h-full items-center justify-center">
						<div className="text-white p-32">
							<PlayerCard href='/assets/images/girl.jpg' name='Helqwdmn' lvl={'498'} />
						</div>
						<div className=' font-black text-[60px] text-[#A2A2A2] '>VS</div>
						{player == null ?
							<div className="scroll-parent p-32 max-h-[600px]">
								<div className="scroll-element primary my-4">
									<div className="text-white my-4">
										<PlayerCard href='/assets/images/Unknown.jpg' name='Unknown' lvl={'---'} />
									</div>
									<div className="text-white my-4">
										<PlayerCard href='/assets/images/Unknown.jpg' name='Unknown' lvl={'---'} />
									</div>
								</div>
								<div className="scroll-element secondary my-4">
									<div className="text-white my-4">
										<PlayerCard href='/assets/images/Unknown.jpg' name='Unknown' lvl={'---'} />
									</div>
									<div className="text-white my-4">
										<PlayerCard href='/assets/images/Unknown.jpg' name='Unknown' lvl={'---'} />
									</div>
								</div>
							</div> :
							<div className="my-4 p-32">


								<div role="status" className="  flex items-center justify-center  bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
								<PlayerCard href='/assets/images/girl.png' name={player} lvl={'544'} />
										<path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
										<path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
									<span className="sr-only">Loading...</span>
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
