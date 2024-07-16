import { useState, useEffect } from 'react';

const FormateTime = (time: number): [number, number] => {
	const minutes = Math.floor(time / 1000 / 60);
	const seconds = Math.floor((time / 1000) % 60);
	return [minutes, seconds];
};

const GameCountdown = (targetDate: Date): [number, number] => {
	const countDownDate = targetDate.getTime();
	const [countDown, setCountDown] = useState<number>(countDownDate - new Date().getTime());
	useEffect(() => {
		console.log('countDownDate', countDownDate);
		const interval = setInterval(() => {
			const newCountDown = countDownDate - new Date().getTime();
			setCountDown(newCountDown);

			// If the countdown is complete, clear the interval
			if (newCountDown <= 0) {
				clearInterval(interval);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [countDownDate]);

	return FormateTime(countDown);
};

export default GameCountdown;

