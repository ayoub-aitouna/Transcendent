import React from 'react'
import Image from 'next/image'
import styles from '@/app/ui/dashboard/nav/nav.module.css'
import Link from 'next/link'


const PlayerCard = ({ href, name, lvl }:
	{
		href: string;
		name: string;
		lvl: string;
	}) => {
	return (
		<div className='flex w-[299px]  h-[440px] bg-[rgb(55,55,55)] rounded-xl overflow-hidden'>
			<div className='relative w-full  h-[330px] '>
				<div className="relative h-[330px] w-full bg-white">
					<Image className='' src={href} layout={'fill'} objectFit={'cover'} alt={'....'} />
				</div>
				<div
					className='absolute bottom-[-10%] left-[45%] w-[48.45px] h-[60px]'>
					<Image
						src='/assets/icons/Gold_3_Rank.png'
						width={48.45}
						height={60}
						alt='close-icon'
					/>
				</div>
				<div className="flex flex-col items-center justify-center pt-8">
					<div className="text-white truncate text-[18px] font-medium">@{name}</div>
					<div className="items-center font-medium text-[#A2A2A2] text-[14px] truncate">Lvl. {lvl}</div>
				</div>
			</div>
		</div>
	)
}



const page = () => {
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
