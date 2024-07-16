"use client";
import { useEffect, useState } from "react";

const useCountdown = (targetDate: Date) => {
	const countDownDate = targetDate.getTime();
	const [countDown, setCountDown] = useState<number>(
		countDownDate - new Date().getTime()
	);
	useEffect(() => {

		const Interval = setInterval(() => {
			setCountDown(countDownDate - new Date().getTime());
		}, 1000);
		return () => clearInterval(Interval);
	}, [countDownDate]);

	return FormateTime(countDown);
};

const FormateTime = (time: number) => {
	const days = Math.floor(time / (1000 * 60 * 60 * 24));
	const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((time % (1000 * 60)) / 1000);
	return [days, hours, minutes, seconds];
};
export { useCountdown };
