"use client";
import { useCountdown } from "@/hooks/count-down";
import { useEffect, useState, useMemo } from "react";
import { Tournament } from "@/type/dashboard/tournament";
import { useAppSelector } from "@/redux/store";
import { RegisterTournament } from "@/api/Tournament";
import { useToast } from "@/app/provider/ToastProvider";
import { useRouter } from "next/navigation";
import { useTournamentRT } from "@/app/provider/TournamentProvider";

const RegisterForm = ({ tournament }: { tournament: Tournament }) => {
	const user = useAppSelector((state) => state.user);
	const router = useRouter();
	const [isClient, setIsClient] = useState(false);
	const { addToast } = useToast();
	const { useSetTournament } = useTournamentRT();
	const [days, hours, minutes, seconds] = useCountdown(
		new Date(tournament.start_date)
	);

	useEffect(() => {
		setIsClient(true);
		if (tournament.is_registered) useSetTournament(tournament);
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await RegisterTournament(tournament.id);
		} catch (e: any) {
			addToast({
				id: tournament.id,
				title: "Error",
				message:
					"we have encountered an error while trying to register for this tournament.",
				icon: "/assets/icons/light_close.png",
				backgroundColor: "bg-red-500",
			});
			return;
		}
		router.refresh();
	};

	const [buttonText, isDisabled] = useMemo(() => {
		if (tournament.is_registered) return ["Registered", false];
		if (tournament.registered_users.length >= tournament.max_players)
			return ["Tournament is full", true];
		return ["Register Now", false];
	}, [tournament, user]);

	return (
		<form onSubmit={handleSubmit} className='self-center'>
			<button
				type='submit'
				disabled={isDisabled}
				className='h-10 bg-primary px-3 py-2 rounded-sm group'>
				<p className='flex flex-row uppercase'>
					{buttonText}{" "}
					<span className='ml-1 lowercase group-disabled:hidden'>
						{!isClient && (
							<span className='ml-1 lowercase'>--D:--h:--m:--s</span>
						)}
						{isClient && (
							<span className='ml-1 lowercase'>
								{days}D:{hours}h:{minutes}m:{seconds}s
							</span>
						)}
					</span>
				</p>
			</button>
		</form>
	);
};

export default RegisterForm;
