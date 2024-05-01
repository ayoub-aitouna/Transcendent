import { TournamentsContainer } from "@/app/ui/dashboard/home/content_area/tournamentContainer";
import { tournamentLinks } from "@/constant/dashboard";
import Link from "next/link";
import React from "react";

const page = () => {
	return (
		<div className='w-full h-full'>
			<div className='bg-secondary-400 rounded-xl h-[87vh] flex flex-col gap-7 px-2 py-4'>
				<div className='w-full flex flex-row items-center justify-between px-5'>
					<h6 className='font-bold text-lg tracking-tight text-white'>
						Ranking
					</h6>
				</div>
				<div className='w-full h-full overflow-y-scroll hide-scrollbar'>
					<table className='table-auto w-full '>
						<thead className=''>
							<tr className='bg-secondary-200 font-semibold text-[#A2A2A2]'>
								<th className='text-start text-[#a2a2a2a] px-2 py-3 rounded-l-lg'>
									Rank
								</th>
								<th className='text-start text-[#a2a2a2a] px-2 py-3 w-[50%]'>
									Player name
								</th>
								<th className='text-start text-[#a2a2a2a] px-2 py-3'>
									Tournament played
								</th>
								<th className='text-start text-[#a2a2a2a] px-2 py-3'>
									Movments
								</th>
								<th className='text-start text-[#a2a2a2a] px-2 py-3 rounded-r-lg'>
									Points
								</th>
							</tr>
						</thead>
						<tbody>
							{Array.from({ length: 30 }).map((_, index) => (
								<tr>
									<td className='text-start px-2 py-3'>
										<p>{index + 1}</p>
									</td>
									<td className='text-start px-2 py-3'>
										<p>Ayoub Aitouna</p>
									</td>
									<td className='text-start px-2 py-3'>
										<p>{Math.round(Math.random() * 100)}</p>
									</td>
									<td className='text-start px-2 py-3'>
										<p>
											{Math.round(Math.random()) < 0.5 ? (
												<span className='text-red-600'>- </span>
											) : (
												<span className='text-green-600'>+ </span>
											)}
											{Math.round(Math.random() * 100)}
										</p>
									</td>
									<td className='text-start px-2 py-3'>
										<p>{Math.round(Math.random() * 10000)}</p>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default page;
