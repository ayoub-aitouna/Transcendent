"use client";

import React, {
	createContext,
	useContext,
	useCallback,
	useEffect,
	useRef,
} from "react";
import { useToast } from "./ToastProvider";
import { useAppSelector } from "@/redux/store";
import { Tournament } from "@/type/dashboard/tournament";

type TournamentContextType = {
	useSetTournament: (tournament: any) => void;
	useEmitMessage: (message: any) => void;
};

const TournamentContext = createContext<TournamentContextType | undefined>(
	undefined
);

export const useTournamentRT = () => {
	const context = useContext(TournamentContext);
	if (!context) {
		throw new Error("useTournamentRT must be used within a TournamentProvider");
	}
	return context;
};

export const TournamentProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const user = useAppSelector((state) => state.user);
	let ws = useRef<WebSocket | null>(null);
	let ConnectedTournamentUuid = useRef<string | null>(null);
	const { addToast } = useToast();
	const useSetTournament = useCallback((tournament: Tournament) => {
		if (!ws.current || ConnectedTournamentUuid.current !== tournament.uuid) {
			ConnectedTournamentUuid.current = tournament.uuid;
			ws.current = new WebSocket(
				`ws://localhost:8000/ws/game/tournament/${tournament.uuid}/`
			);
			ws.current.onopen = () => {
				console.log("connected to ws");
			
			};
			ws.current.onclose = () => {
				console.log("disconnected from ws");
			};

			ws.current.onmessage = (event) => {
				const data = JSON.parse(event.data);
				switch (data.type) {
					case "start":
						addToast({
							id: tournament.id || 0,
							title: `${tournament.name} is about to start`,
							message:
								"Tournament is about to start, get ready!, check the bracket for more info",
							icon: "https://placehold.co/400x400.png",
							backgroundColor: "bg-primary",
						});
						break;
					case "match_info":
						addToast({
							id: tournament.id || 0,
							title: "Match info",
							message: `Match ${data.match_id} is about to start`,
							icon: "https://placehold.co/400x400.png",
							backgroundColor: "bg-primary",
						});
						break;
					case "status":
						addToast({
							id: tournament.id || 0,
							title: "Tournament status",
							message: `${data.status} ${
								(data.winner && "winner is " + data.winner) || data.reason
							}`,
							icon: "https://placehold.co/400x400.png",
							backgroundColor: "bg-primary",
						});
						if (data.status === "over") {
							ws.current?.close();
						}
						break;
				}
			};
		}
	}, []);

	useEffect(() => {
		console.log("connecting to ws");
		if (!ws.current) {
			ws.current = new WebSocket("ws://localhost:8000/ws/game/tournament/");
		}
	}, [ws]);

	const useEmitMessage = useCallback(
		(message: any) => {
			if (ws.current && ws.current.readyState === 1) {
				ws.current.send(JSON.stringify(message));
			} else {
				console.log("ws not connected");
			}
		},
		[ws]
	);

	return (
		<TournamentContext.Provider value={{ useSetTournament, useEmitMessage }}>
			{children}
		</TournamentContext.Provider>
	);
};
