import React from "react";
import Link from "next/link";
import { TournamentsContainer } from "@/app/ui/dashboard/home/content_area/tournamentContainer";
import { TopAchievementsList, tournamentLinks } from "@/constant/dashboard";
import { StreamingCard } from "@/app/ui/dashboard/tournament/index";
import { AchievementCard } from "@/app/ui/dashboard/profile/AchievementCard";
import {
	MatchHistory,
	ProfileData,
	TournamentHistory,
	UserDetail,
} from "@/api/user";
import { user } from "@/type/auth/user";
import Header from "../components/header";
import Empty from "@/app/ui/dashboard/component/Empty";
import { redirect } from "next/navigation";
import Error from "@/app/ui/dashboard/component/Error";
import { MatchUp, RegisteredPlayer } from "@/type/dashboard/tournament";
import { PaginationApiResponse } from "@/type";

const HistoryWrapper = ({
	children,
	title,
}: {
	children?: Readonly<React.ReactNode>;
	title: string;
}) => {
	return (
		<div
			className='flex-1 w-full xl:w-1/3 flex flex-col items-start justify-start gap-3 p-2 min-h-[20rem]
						h-full rounded-lg bg-secondary-400'>
			<h6 className='text-xl font-bold tracking-tight p-2 uppercase'>
				{title}
			</h6>
			<div className='w-full h-full max-h-full overflow-y-scroll hide-scrollbar p-2'>
				{children}
			</div>
		</div>
	);
};

const loadUserData = async (
	id: string
): Promise<
	[
		user,
		PaginationApiResponse<MatchUp>,
		PaginationApiResponse<RegisteredPlayer>
	]
> => {
	let data = null;
	let matchHistory;
	let tournamentHistory;
	try {
		if (id === "me") data = await ProfileData();
		else data = await UserDetail(parseInt(id));
	} catch (e) {
		console.error(e);
		redirect("/");
	}
	matchHistory = await MatchHistory(data.id);
	tournamentHistory = await TournamentHistory(data.id);
	return [data, matchHistory, tournamentHistory];
};

const page = async ({ params }: any) => {
	const [data, matchHistory, tournamentHistory] = await loadUserData(params.id);
	if (data.is_blocked)
		return (
			<Error
				status={404}
				title='User Not Found'
				desc="Sorry, we can't find that page. You'll find lots to explore on the home page."
			/>
		);
	return (
		<div className='flex flex-col justify-start items-start  h-full gap-10'>
			<Header data={data} isOtherUser={params.id !== "me"} />
			<div className='flex-1 flex w-full flex-col xl:flex-row items-center justify-center xl:max-h-[34rem] gap-5'>
				<HistoryWrapper title='tournament History'>
					{tournamentHistory.results.length !== 0 && (
						<ul className='flex  flex-col gap-3 items-center justify-start w-full h-full'>
							{tournamentHistory.results.map((item, index) => (
								<li key={index} className='w-full '>
									<TournamentsContainer {...item.tournament} />
								</li>
							))}
						</ul>
					)}
					{tournamentHistory.results.length === 0 && (
						<div className='w-full h-full grid place-content-center'>
							<Empty text='no Tournament are available right now' />
						</div>
					)}
				</HistoryWrapper>
				<HistoryWrapper title='Match History'>
					{matchHistory.results.length !== 0 && (
						<ul className='flex flex-col gap-3 items-center justify-start w-full h-full'>
							{matchHistory.results.map((data, index) => (
								<Link key={index} className='w-full' href={`/`}>
									<StreamingCard
										user1={data.first_player}
										user2={data.second_player}
									/>
								</Link>
							))}
						</ul>
					)}
					{matchHistory.results.length === 0 && (
						<div className='w-full h-full grid place-content-center'>
							<Empty text='no Game are available right now' />
						</div>
					)}
				</HistoryWrapper>
				<HistoryWrapper title='Last Achievements'>
					{data.achievements.length !== 0 && (
						<ul className='flex flex-col gap-3 items-center justify-start w-full h-full'>
							{data.achievements.map((item, index) => (
								<AchievementCard key={index} achievement={item} />
							))}
						</ul>
					)}
					{data.achievements.length === 0 && (
						<div className='w-full h-full grid place-content-center'>
							<Empty text='no Achievements are available right now' />
						</div>
					)}
				</HistoryWrapper>
			</div>
		</div>
	);
};

export default page;
