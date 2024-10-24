import React from "react";
import ViewAll from "./content_area/viewAll";
import Empty from "../component/Empty";
import Link from "next/link";
import { FriendContainer } from "@/app/ui/dashboard/home/FriendContainer";
import { GetFriendsData } from "@/api/user";
import Error from "@/app/ui/dashboard/component/Error";

const SvgComponent = () => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		className='svg-icon'
		style={{
			width: "1em",
			height: "1em",
			verticalAlign: "middle",
			fill: "currentColor",
			overflow: "hidden",
		}}
		viewBox='0 0 1026 1024'>
		<path d='M759.296 691.797c7.424-9.173 5.995-22.613-3.157-29.994-44.267-35.776-97.088-61.76-154.411-77.206 107.072-47.53 182.037-154.666 182.037-279.146C783.744 137.003 646.72 0 478.315 0c-168.406 0-305.43 137.003-305.43 305.43 0 125.525 76.16 233.514 184.662 280.426C180.672 638.123 51.115 801.792 51.115 995.392c0 11.797 9.557 21.333 21.333 21.333s21.333-9.536 21.333-21.333c0-212.032 172.502-384.533 384.534-384.533 94.741 0 183.893 29.866 250.965 84.096 9.195 7.466 22.635 5.973 30.016-3.158zM215.552 305.43c0-144.896 117.867-262.762 262.763-262.762 144.896 0 262.762 117.866 262.762 262.762S623.211 568.192 478.315 568.192c-144.896 0-262.763-117.888-262.763-262.763z' />
		<path d='M1004.181 795.712H842.86V634.389c0-11.797-9.536-21.333-21.334-21.333s-21.333 9.536-21.333 21.333v161.323H638.869c-11.797 0-21.333 9.536-21.333 21.333s9.536 21.334 21.333 21.334h161.323V999.7c0 11.798 9.536 21.334 21.333 21.334s21.334-9.536 21.334-21.334V838.38h161.322c11.798 0 21.334-9.536 21.334-21.334s-9.536-21.333-21.334-21.333z' />
	</svg>
);

const Friends = async ({}) => {
	let friends = null;
	try {
		friends = await await GetFriendsData("");
	} catch (e) {
		return (
			<Error
				title='Tournament not found'
				desc='The tournament you are looking for does not exist.'
			/>
		);
	}
	return (
		<div className='relative h-full w-full'>
			<Link href={"/home/all-players"}>
				<div className='mb-8 flex items-center justify-between'>
					<div className=' text-white  truncate font-bold text-base'>
						Friends
					</div>
					<button
						className={`flex-row items-center rounded-md  bg-[#444444] w-[93px] h-[32px]`}>
						<div className='mx-auto flex  justify-start ml-2'>
							{" "}
							<SvgComponent />
							<div />
							<div className='flex items-center justify-between mx-auto cursor-pointer'>
								<div className='text-white text-xs font-semibold'>
									{" "}
									Add More{" "}
								</div>
							</div>
						</div>
					</button>
				</div>
			</Link>
			<div>
				{!friends.length ? (
					<div className='flex h-[320px] w-full justify-center items-center'>
						<Empty text='No Friends Found' />
					</div>
				) : (
					<div>
						{friends?.slice(0, 4).map(
							(
								item: {
									username: string;
									image_url: string;
									level: number;
									id: number;
								},
								index: React.Key | null | undefined
							) => (
								<div key={index}>
									<FriendContainer
										name={item.username}
										href={item.image_url}
										number={item.level}
										id={item.id}
									/>
								</div>
							)
						)}
					</div>
				)}
				{friends?.length > 4 && (
					<div className='w-full absolute bottom-0'>
						<div className='w-full grid place-content-center'>
							<div className='flex flex-row items-center justify-center'>
								<Link href={"/home/friends"}>
									{" "}
									<ViewAll />{" "}
								</Link>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Friends;
