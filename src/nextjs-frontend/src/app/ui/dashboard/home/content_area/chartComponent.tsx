import React, { useEffect, useRef } from 'react';
import Chart, { ChartConfiguration, Point } from 'chart.js/auto';

const LineChart: React.FC = () => {
	const chartRef = useRef<HTMLCanvasElement | null>(null);
	const chartInstanceRef = useRef<Chart<"line"> | null>(null);


	useEffect(() => {
		if (chartRef.current) {
			const ctx = chartRef.current.getContext('2d');
			var gradient = ctx?.createLinearGradient(0, 0, 0, 400);
			gradient?.addColorStop(0, 'rgba(253, 65, 6, 0.28)');
			gradient?.addColorStop(1, 'rgba(253, 65, 6, 0)');
			if (ctx) {
				const inputs = {
					min: 0,
					max: 100,
					count: 16,
					decimals: 2,
					continuity: 1,
				};

				const generateLabels = () => {
					return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
				};

				const generateData = () => {
					return Array.from({ length: inputs.count }, () =>
						Math.random() * (inputs.max - inputs.min) + inputs.min
					);
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

		return () => {
			if (chartInstanceRef.current) {
				chartInstanceRef.current.destroy();
			}
		};
	}, []);

	return <canvas ref={chartRef} />;
};

export default LineChart;


