import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart: React.FC = () => {
	const chartRef = useRef<HTMLCanvasElement | null>(null);
	const chartInstanceRef = useRef<Chart<"line"> | null>(null); // Store Chart instance


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
								suggestedMin: 0, // Set minimum value for y-axis
								suggestedMax: 100, // Set maximum value for y-axis
								display: false, // Remove the y-axis scale
							},
							x: {
								display: false, // Remove the y-axis scale
							},
						},
						plugins: {
							filler: {
								propagate: false,
							},
							title: {
								display: false,
								// text: (ctx) => 'Fill: ' + ctx.chart.data.datasets[0].fill,
							},
						},
						interaction: {
							intersect: true,
						},
						elements: {
							line: {
								tension: 0.4, // Adjust line tension for smoothing
							},
							point: {
								radius: 0, // Remove data points
							},
						},
						layout: {
							padding: {
								top: 0, // Remove top padding
							},
						},
						plugins: {
							legend: {
								display: false, // Remove legend
							},
						},
					},
				};

				// Destroy existing chart instance if it exists
				if (chartInstanceRef.current) {
					chartInstanceRef.current.destroy();
				}

				// Create new chart instance
				chartInstanceRef.current = new Chart(ctx, config);
			}
		}

		// Cleanup function to destroy the chart instance
		return () => {
			if (chartInstanceRef.current) {
				chartInstanceRef.current.destroy();
			}
		};
	}, []);

	return <canvas ref={chartRef} />;
};

export default LineChart;


