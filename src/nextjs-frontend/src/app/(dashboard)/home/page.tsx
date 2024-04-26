import React from "react";
import TeamLeader from '@/app/ui/dashboard/home/teamLeader';
import MyTeam from '@/app/ui/dashboard/home/myTeam';
import TopPlayers from '@/app/ui/dashboard/home/topPlayers';
import Tournaments from '@/app/ui/dashboard/home/Tournaments';
import TeamRanking from '@/app/ui/dashboard/home/teamRanking';
import NewTournaments from '@/app/ui/dashboard/home/newTournament';


const page = () => {
	return <>
		<div className="h-full">
			<div className="flex-1 h-full flex flex-col gap-5">
				<div className="flex  flex-row flex-wrap h-[400px] gap-5">
					<div className="w-full lg:w-[381px] h-full bg-secondary-200 rounded-xl "><TeamLeader /></div>
					<div className="w-full flex-1 h-full bg-secondary-200  min-w-[400px] rounded-xl"><NewTournaments /></div>
					<div className="w-full lg:w-[381px] h-full bg-secondary-200 rounded-xl "><TopPlayers /></div>
				</div>

				<div className="flex flex-row flex-wrap h-[400px] gap-5">
					<div className="w-full lg:w-[381px] bg-secondary-200 rounded-xl "><MyTeam /></div>
					<div className="w-full flex-1 bg-secondary-200  min-w-[400px] rounded-xl"><Tournaments /></div>
					<div className="w-full lg:w-[381px] bg-secondary-200 rounded-xl "><TeamRanking /></div>
				</div>

			</div>
		</div>
	</>
};

export default page;
