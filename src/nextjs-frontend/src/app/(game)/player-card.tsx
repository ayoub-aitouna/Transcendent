
import React from 'react'
import Image from 'next/image'

const PlayerCard = ({ href, name, lvl, icon }:
	{
		href: string;
		name: string;
		lvl: string;
		icon: string;
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
						src={icon}
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

export default PlayerCard