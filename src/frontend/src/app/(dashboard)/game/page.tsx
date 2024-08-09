import React from "react";
import OnlinePlayers from '@/app/ui/dashboard/home/OnlinePlayer';
import Tournaments from "@/app/ui/dashboard/home/Tournaments";
import SelectGame from "@/app/(game)/slectGame";


const page = () => {
	return (
		<>
			<div className="h-full">
				<div className="flex-1  flex flex-col  gap-5">
					<div className="flex flex-col md:flex-row md:flex-wrap  gap-5">
						<div className="w-full md:w-1/2 bg-secondary-400 min-w-[400px]  h-[456px] rounded-xl flex-1 relative">
							<img src="/assets/images/Rectangle.png" alt="Profile Image" className="w-full h-[456px] rounded-xl " />
							<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl font-bold">
								<SelectGame/>
							</div>
						</div>
						<div className="w-full md:w-[381px] bg-secondary-400 rounded-xl h-[456px] p-4">
							<OnlinePlayers />
						</div>
					</div>

					<div className="flex flex-wrap h-[456px] gap-5">
						<div className="w-full bg-secondary-400 min-w-[400px] rounded-xl p-4">
							<Tournaments />
						</div>
					</div>
				</div>
			</div >
		</>
	);
};


export default page;