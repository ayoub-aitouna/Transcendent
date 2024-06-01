import React from "react";
import { Achievement } from "@/type/dashboard/index";
import Image from "next/image";

export const AchievementCard = ({
	achievement,
}: {
	achievement: Partial<Achievement>;
}) => {
	return (
		<>
			<div className='w-full h-[100px] flex flex-row justify-start items-center p-[10px] bg-secondary-200 rounded-sm'>
				<div className='flex-1 w-full h-full flex flex-col items-start justify-center gap-[10px] p-[10px]'>
					<h6 className='text-lg text-white font-bold leading-3 tracking-tighter'>
						{achievement.name}
					</h6>
					<p className='text-sm font-normal text-[#a2a2a2] line-clamp-2 tracking-tighter '>
						{achievement.description}
					</p>
				</div>
				<div className='flex-shrink-0 h-full grid place-content-center '>
					<Image
						src={achievement.icon || ""}
						alt='Decathlon Dominator'
						width={80}
						height={80}
					/>
				</div>
			</div>
		</>
	);
};
