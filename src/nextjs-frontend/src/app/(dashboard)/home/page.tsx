import React from "react";
import TeamLeader from '@/app/ui/dashboard/home/teamLeader';
import OnlinePlayers from '@/app/ui/dashboard/home/OnlinePlayer';
import TopPlayers from '@/app/ui/dashboard/home/topPlayers';
import Tournaments from '@/app/ui/dashboard/home/Tournaments';
import TeamRanking from '@/app/ui/dashboard/home/friends';
import NewTournaments from '@/app/ui/dashboard/home/newTournament';



const page = () => {
	return <>
		<div className="h-full">
			<div className="flex-1 h-full flex flex-col gap-5">
				<div className="flex  flex-row flex-wrap  gap-5">
					<div className="w-full lg:w-[381px] h-[456px] bg-secondary-400 rounded-xl p-4"><TeamLeader /></div>
					<div className="w-full flex-1 h-[456px] bg-secondary-400  min-w-[400px] rounded-xl  overflow-hidden"><NewTournaments /></div>
					<div className="w-full lg:w-[381px] h-[456px] bg-secondary-400 rounded-xl p-4"><TopPlayers /></div>
				</div>

				<div className="flex flex-row flex-wrap  gap-5">
					<div className="h-[456px] lg:w-[381px] bg-secondary-400 rounded-xl p-4"><OnlinePlayers /></div>
					<div className="h-[456px] flex-1 bg-secondary-400  min-w-[400px] rounded-xl p-4"><Tournaments /></div>
					<div className="h-[456px] lg:w-[381px] bg-secondary-400 rounded-xl p-4"><TeamRanking /></div>
				</div>

			</div>
		</div>
	</>
};

export default page;
