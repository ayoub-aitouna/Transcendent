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
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default page
