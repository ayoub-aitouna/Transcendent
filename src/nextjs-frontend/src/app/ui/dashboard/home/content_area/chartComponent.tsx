import React, { useEffect, useRef } from 'react';
import Chart, { ChartConfiguration, Point } from 'chart.js/auto';
import { RankLogs } from '@/type/auth/user';

const LineChart = ({ inputData }: { inputData: RankLogs[] }) => {
	const chartRef = useRef<HTMLCanvasElement | null>(null);
	const chartInstanceRef = useRef<Chart<"line"> | null>(null);


	const prepareChart = async () => {
		if (chartRef.current) {
			const ctx = chartRef.current.getContext('2d');
			var gradient = ctx?.createLinearGradient(0, 0, 0, 400);
			gradient?.addColorStop(0, 'rgba(253, 65, 6, 0.28)');
			gradient?.addColorStop(1, 'rgba(253, 65, 6, 0)');
			if (ctx) {
				const generateLabels = () => {
					return inputData.map(entry => new Date(entry.achieved_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
				};
				const generateData = () => {
					return inputData.map(entry => entry.point);
				};

				const data = {
					labels: generateLabels(),
					datasets: [
						{
							data: generateData(),
							borderColor: '#FF3D00',
							fill: 'start',
							backgroundColor: gradient,
						},
					],
				};

				const config = {
					type: 'line',
					data: data,
					options: {
						scales: {
							y: {
								suggestedMin: 0,
								suggestedMax: 100,
								display: false,
							},
							x: {
								display: false,
							},
						},
						plugins: {
							filler: {
								propagate: false,
							},
							title: {
								display: false,
							},
							legend: {
								display: false,
							},
						},
						interaction: {
							intersect: true,
						},
						elements: {
							line: {
								tension: 0.4,
							},
							point: {
								radius: 0,
							},
						},
						layout: {
							padding: {
								top: 0,
							},
						},
					},
				};
				if (chartInstanceRef.current) {
					chartInstanceRef.current.destroy();
				}
				chartInstanceRef.current = new Chart<"line">(ctx, {
					...config,
					data: {
						...config.data,
						datasets: [
							{
								...config.data.datasets[0],
								data: generateData() as (number | Point | null)[],
							},
						],
					},
				} as ChartConfiguration<"line", (number | Point | null)[], unknown>);
			}
		}
	}

	useEffect(() => {
		prepareChart()
		return () => {
			if (chartInstanceRef.current) {
				chartInstanceRef.current.destroy();
			}
		};
	}, []);

	return (
		<div className="chart-container">
			<canvas ref={chartRef} style={{ width: '100%', height: '100%' }} />
		</div>
	);
};

export default LineChart;


