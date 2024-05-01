import React from "react";
import Image from "next/image";
import { TournamentsContainer } from "@/app/ui/dashboard/home/content_area/tournamentContainer";
import { tournamentLinks } from "@/constant/dashboard";

const HistoryWrapper = ({
	children,
	title,
}: {
	children?: Readonly<React.ReactNode>;
	title: string;
}) => {
	return (
		<div className='flex-1 w-full min-h-[20rem]  h-full rounded-lg bg-secondary-400 flex flex-col items-start justify-start p-3'>
			<h6 className='p-2 text-xl font-bold tracking-tight uppercase'>
				{title}
			</h6>
			<div className='w-full h-ful max-h-full overflow-y-scroll hide-scrollbar'>
				{children}
			</div>
		</div>
	);
};

const page = () => {
	return (
		<div className='flex flex-col justify-start items-start  h-full gap-10'>
			<div className='relative min-h-[21rem] w-full rounded-lg overflow-hidden'>
				<Image
					src='/assets/images/profile-bg.jpg'
					fill
					alt='profile background image'
					className='w-full h-full'
					objectFit='cover'
				/>
				<div className='absolute top-0 left-0 w-full h-full bg-secondary-400/80'></div>
			</div>
			<div className='flex-1 flex w-full   flex-col xl:flex-row items-center justify-center xl:max-h-[34rem] gap-5'>
				<HistoryWrapper title='tournament History'>
					<ul className='flex flex-col gap-2 items-center justify-start w-full h-full px-2 py-3'>
						{tournamentLinks.map((item, index) => (
							<li key={index} className='w-full '>
								<TournamentsContainer
									key={index}
									href={item.href}
									name={item.name}
									followers={item.followers}
									SecName={item.secName}
								/>
							</li>
						))}
					</ul>
				</HistoryWrapper>
				<HistoryWrapper title='Match History'></HistoryWrapper>
				<HistoryWrapper title='Last Achievements'></HistoryWrapper>
			</div>
		</div>
	);
};

export default page;
