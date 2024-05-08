import Empty from '@/app/ui/dashboard/Empty'
import React from 'react'
import Image from 'next/image';
import { AllOnlinePlayers } from '@/constant/dashboard';


export function BlocksContainer({ name, href, number }: {
	name: string;
	href: string;
	number: Number;
}) {
	const handleClick = () => {
		window.location.href = href;
	};
	return (
		<button
			className={`mt-2 w-full h-[69px] flex items-center justify-between rounded bg-[#373737] p-4 mb-5`}>
			<div className='flex items-center justify-between '>
				<Image className="bg-white  w-[53px] h-[53px] rounded-full" src={href} alt="Profile Image" width={53} height={53} />
				<div />
				<div className="flex items-start flex-col max-w-[80px]">
					<div className="ml-[10px]  text-white truncate text-[18px] font-bold">{name}</div>
					<div className={`ml-[10px]  text-[#878787] text-[12px] truncate font-medium`}>Level {String(number)}</div>
				</div>
			</div>
			{number && (
				<div
					className={`flex  items-center justify-center rounded-[4px]  bg-[#FD4106] w-[108px] h-[35px]`}>
						<div className=" flex items-center justify-between mx-auto text-white text-[16px] font-medium"> Unblock </div>
				</div>

			)}

		</button>
	);
}
const page = () => {
  return (
    <div className='flex items-center justify-center w-full'>
		<div className='p-10 bg-[#292929] w-[894px] h-[890px]'>
			{!AllOnlinePlayers.length ? 
				<div className="flex h-[320px] w-full justify-center items-center">
					<Empty text="no Online Players are available right now"/>
				</div> 
				:
				<div className={` overflow-y-scroll hide-scrollbar`}>
					{AllOnlinePlayers.map((item, index) => (
						<div>
							<BlocksContainer
								key={index}
								name={item.name}
								href={item.href}
								number={item.number}
							/>
						</div>
					))}
				</div>
			}
		</div>
	</div>
  )
}

export default page