import React from 'react'
import Image from 'next/image'
import styles from '@/app/ui/dashboard/nav/nav.module.css'
import Link from 'next/link'


const PlayerCard = () => {
	return (
		<div className='flex w-[300px] h-[440px] bg-[#373737]'>
			<div className=' relative w-[300px] h-[330px]'>
				<Image src="/assets/images/girl.jpg" height={330} width={300} alt={'....'} />
				<div
					className='absolute bottom-[-10%] right-[-10%] h-[48.45px] w-[60px]'>
					<Image
						src='/assets/icons/Gold_3_Rank.png'
						width={60}
						height={48.45}
						alt='close-icon'
					/>
				</div>
			</div>
		</div>
	)
}



const page = () => {
	return (
		// <div className='bootstrap-namespace position-relative '>
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
						<div className="text-white">
							<PlayerCard />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default page
