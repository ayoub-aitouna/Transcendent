import React from "react";
import TeamLeader from '@/app/ui/dashboard/home/teamLeader';
import OnlinePlayers from '@/app/ui/dashboard/home/OnlinePlayer';
import TopPlayers from '@/app/ui/dashboard/home/topPlayers';
import Tournaments from '@/app/ui/dashboard/home/Tournaments';
import TeamRanking from '@/app/ui/dashboard/home/friends';
import NewTournaments from '@/app/ui/dashboard/home/newTournament';
import Friends from "@/app/ui/dashboard/home/friends";



const page = () => {
	return <>
		<div className="h-full">
			<div className="flex-1 h-full flex flex-row flex-wrap gap-5">
				<div className="grid-container gap-4">
					<div className="bg-secondary-400 rounded-xl p-4  item-a"><TeamLeader /></div>
					<div className="bg-secondary-400 rounded-xl p-4  item-b"><NewTournaments /></div>
					<div className="bg-secondary-400 rounded-xl p-4  item-c"><TopPlayers /></div>
				</div>

				<div className="grid-container gap-4">
					<div className="item-a h-[456px] bg-secondary-400 rounded-xl p-4">
						<OnlinePlayers />
					</div>
					<div className="item-b h-[456px] flex-1 bg-secondary-400  min-w-[400px] rounded-xl p-4">
						<Tournaments />
					</div>
					<div className="item-c h-[456px] bg-secondary-400 rounded-xl p-4">
						< Friends />
					</div>
				</div>

			</div>
		</div>
	</>
};


export default page;