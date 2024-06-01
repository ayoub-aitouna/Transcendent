'use client'
import React, { useEffect, useState } from 'react'
import ThreePointsIcon from '../icons/messenger/three-points';
import Image from 'next/image';
import { removeTournament } from '@/api/user';
import { useRouter } from 'next/navigation';
import { useToast } from '@/app/provider/ToastProvider';
import { error } from 'console';

function TournamentMenu({ id }: { id: number }) {
	const [clickedThreePoints, setClickedThreePoints] = useState(false);
	const router = useRouter();
	const handleThreePoints = () => {
		setClickedThreePoints(!clickedThreePoints);
	};
	const { addToast } = useToast()
	const deleteTournament = async () => {
		try {
			await removeTournament(id)
			router.push('/tournaments')
			router.refresh()
		} catch (error) {
			addToast({
				id: id,
				title: "Error",
				message: "we have encountered an error while trying to remove this tournament",
				icon: "/assets/icons/light_close.png",
				backgroundColor: 'bg-red-500'
			})
		}
	}

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			const panel = document.getElementById('tournament-menu');
			const trigger = document.getElementById('three-points-trigger');
			if (panel && trigger && !panel.contains(target) && !trigger.contains(target)) {
				setClickedThreePoints(false);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, []);

	return (
		<div className="relative">
			<div
				id="three-points-trigger"
				className="relative flex flex-col items-center p-7"
				onClick={handleThreePoints}
			>
				<ThreePointsIcon />
			</div>
			{clickedThreePoints && (
				<div
					id="tournament-menu"
					className="z-50 absolute left-[-205%] bottom-[-80%] bg-[#161616] h-[60px] w-[200px] p-4 flex flex-col items-center justify-center rounded-md"
				>
					<button className="flex flex-row items-start justify-start text-[16px] text-[#878787] gap-2 hover:bg-[#262626] py-2 px-2 w-full rounded-md"
						onClick={() => deleteTournament()}>
						<Image src="/assets/icons/remove-outline.svg" alt="remove" height={24} width={24} />
						<p className=""> Remove </p>
					</button>
				</div>
			)}
		</div>
	);
}

export default TournamentMenu;
