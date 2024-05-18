"use client";
import { useCountdown } from "@/hooks/count-down";
import { useEffect, useState } from "react";

export const CountDownTimerButton = ({ targetDate }: { targetDate: Date }) => {
	const [isClient, setIsClient] = useState(false);
	const [days, hours, minutes, seconds] = useCountdown(new Date(targetDate));

	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		<button className='self-center h-10 bg-primary px-3 py-2 rounded-sm'>
			<p className='flex flex-row uppercase'>
				Register Now -{" "}
				<span className='ml-1 lowercase'>
					{!isClient && <span className='ml-1 lowercase'>--D:--h:--m:--s</span>}
					{isClient && (
						<span className='ml-1 lowercase'>
							{days}D:{hours}h:{minutes}m:{seconds}s
						</span>
					)}
				</span>
			</p>
		</button>
	);
};
