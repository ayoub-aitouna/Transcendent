import React from "react";
import Image from "next/image";
import Link from "next/link";
import Empty from "@/app/ui/dashboard/component/Empty";
import {
	ProfileImage,
	UserDetails,
	StreamingCard,
} from "@/app/ui/dashboard/tournament/index";
import { GetTournamentDetails } from "@/api/Tournament";
import { CountDownTimerButton } from "@/app/ui/dashboard/tournament/count-down-btn";
import { Bracket } from "@/app/ui/dashboard/tournament/bracket-board";
import { MatchUp, Tournament } from "@/type/dashboard/tournament";
import Error from "@/app/ui/dashboard/component/Error";
function StatusTable({ data }: { data: Array<MatchUp> }) {
	return (
		<div className='w-full overflow-x-scroll hide-scrollbar'>
			<table className='table-auto w-full  '>
				<thead>
					<tr className='border-b border-b-secondary-200 text-[#A2A2A2]'>
						<th className='text-start px-2 py-3'>Players</th>
						<th className='text-start px-2 py-3'>Score</th>
						<th className='text-start px-2 py-3'>Start date</th>
						<th className='text-start px-2 py-3'>Finish date</th>
						<th className='text-start px-2 py-3'>Winner</th>
					</tr>
				</thead>
				<tbody>
					{data.map((match, index) => (
						<tr>
							<td className='text-start px-2 py-3'>
								<div className='flex flex-row gap-2 items-center'>
									<div className='flex flex-row items-center justify-center flex-nowrap'>
										<ProfileImage
											image_url={
												match.first_player.image_url ||
												"/assets/images/profile.jpg"
											}
											className='relative w-12 h-12  rounded-full border border-[#A2A2A2] overflow-hidden '
										/>
										<ProfileImage
											image_url={
												match.second_player.image_url ||
												"/assets/images/profile.jpg"
											}
											className='relative w-12 h-12 ml-[-20px] rounded-full border border-[#A2A2A2] overflow-hidden'
										/>
									</div>
									<UserDetails
										name={match.first_player.username}
										level={match.first_player.current_xp}
									/>
									<p className='text-md font-bold'>VS</p>
									<UserDetails
										name={match.second_player.username}
										level={match.second_player.current_xp}
									/>
								</div>
							</td>
							<td className='text-start px-2 py-3'>
								{match.first_player_score} VS {match.first_player_score}
							</td>
							<td className='text-start px-2 py-3'>
								{new Date().toLocaleString()}
							</td>
							<td className='text-start px-2 py-3'>
								{new Date().toLocaleString()}
							</td>
							<td className='text-start px-2 py-3'>
								<div className='flex flex-row gap-2 items-center'>
									<div className='flex flex-row items-center justify-center flex-nowrap'>
										<ProfileImage
											image_url={
												match.Winner?.image_url || "/assets/images/profile.jpg"
											}
											className='relative w-12 h-12  rounded-full border border-[#A2A2A2] overflow-hidden '
										/>
									</div>
									<UserDetails
										name={match.Winner?.username}
										level={match.Winner?.current_xp}
									/>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

const page = async ({ params }: any) => {
	const { id } = params;
	let result = {} as Tournament;
	try {
		result = await GetTournamentDetails(id);
	} catch (e) {
		return (
			<Error
				title='Tournament not found'
				desc='The tournament you are looking for does not exist.'
			/>
		);
	}

	return (
		<div className='h-full w-full flex flex-col gap-5'>
			<div className='w-full rounded-xl bg-secondary-400 h-24 flex flex-row items-center justify-between p-3'>
				<div className='flex flex-row gap-4'>
					<Image
						className='rounded-md overflow-hidden'
						src={result.icon || "https://placehold.co/400x400.png"}
						alt={`icon of ${result.name}`}
						width={73}
						height={73}
					/>
					<div className='w-full flex flex-col items-start justify-center '>
						<div className='font-bold text-lg tracking-tight'>
							{result.name}
						</div>
						<div className='text-secondary-100 text-sm truncate font-normal tracking-tight'>
							{result.description}
						</div>
					</div>
				</div>
				<div className='flex flex-col items-start justify-center '>
					<div className='font-bold text-lg tracking-tight'>
						{result.max_players}
					</div>
					<div className='text-secondary-100 text-sm truncate font-normal tracking-tight'>
						Max Players
					</div>
				</div>
			</div>
			<div className='w-full xl:h-[28.5rem] flex flex-col xl:flex-row gap-5  '>
				<Bracket
					data={result.tournament_bracket}
					max_players={result.max_players}
				/>
				<div className='rounded-xl bg-secondary-400 w-full xl:w-96 p-3 flex flex-col gap-5 '>
					<div className='flex flex-row items-center justify-between w-full'>
						<h6 className='text-lg font-bold text-white'>Streaming</h6>
					</div>
					{result.streams.length !== 0 && (
						<ul className='flex flex-col items-center justify-start w-full gap-4 overflow-y-scroll hide-scrollbar'>
							{result.streams.map((data, index) => (
								<Link
									key={index}
									className='w-full'
									href={`/game?streaming=${index}`}>
									<StreamingCard user1={data.player1} user2={data.player2} />
								</Link>
							))}
						</ul>
					)}
					{result.streams.length === 0 && (
						<Empty text='no Game are available right now' />
					)}
					<CountDownTimerButton
						targetDate={result.start_date}
						// Onclick={() => handleRegister()}
					/>
				</div>
			</div>
			<div className='rounded-xl bg-secondary-400 flex-1 min-h-80 max-h-[30rem] flex flex-col items-start justify-start px-6 pt-10 pb-4'>
				<div className='w-full'>
					<h6 className='text-lg font-bold'>States</h6>
				</div>
				{result.games_states.length === 0 && (
					<Empty text='no games are available right now' />
				)}
				{result.streams.length !== 0 && (
					<StatusTable data={result.games_states} />
				)}
			</div>
		</div>
	);
};

export default page;
