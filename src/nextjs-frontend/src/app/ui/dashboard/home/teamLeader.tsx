
'use client'
import React from 'react';
import Image from 'next/image';
import { Rank } from '../icons/content_area/rank';
import Coins from '../icons/content_area/coins';
import Messages from '../icons/content_area/messages';
import { ContentBtn } from './content_area/contentBtn';
import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';

// width={340}
// height={161}


export const ChartComponent = () => {
  const chartRef = useRef<Chart>();

  const xValues: number[] = [];
  const yValues: number[] = [];
  useEffect(() => {
    generateData(Math.sin, 0, 10, 0.5);

    const ctx = document.getElementById("myChart") as HTMLCanvasElement;
    if (!ctx) return;

    if (chartRef.current) {
      chartRef.current.destroy(); // Destroy the previous Chart instance
    }

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: xValues,
        datasets: [{
          fill: false,
          pointRadius: 2,
          borderColor: "rgba(0,0,255,0.5)",
          data: yValues
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "y = sin(x)",
            fontSize: 16
          }
        },
        interaction: {
          mode: 'index',
          intersect: false,
        },
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
          },
          y: {
            type: 'linear',
            position: 'left',
          }
        }
      }
    });

    // Clean up function
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy(); // Destroy the Chart instance when the component unmounts
      }
    };
  }, []);

  function generateData(func: (x: number) => number, i1: number, i2: number, step: number = 1) {
    for (let x = i1; x <= i2; x += step) {
      yValues.push(func(x));
      xValues.push(x);
    }
  }

  return <canvas id="myChart" style={{ width: '100%', maxWidth: '600px' }} />;
};



function TeamLeader() {
	const handleClick = () => {
		window.location.href = "/profile";
	};
	return (
		<div className='' >
			<div className="pt-4 flex items-center" onClick={handleClick} aria-label="Navigate to profile">
				<div className="rounded-full overflow-hidden bg-white w-[62px] h-[62px]">
					<Image src="/aaitouna.png" alt="Profile Image" width={62} height={62} />
				</div>
				<div className="flex flex-col ml-5">
					<div className=" text-white  font-bold text-base tracking-tight	">Ayoub Aitouna </div>
					<div className="font-light mt-[2px] text-[#A1A1A1] text-xs">Team Leader </div>
				</div>
			</div >
			<div className=' mt-10 h-[12px] text-white font-light text-sx flex justify-between">'>
				<div className=' text-sx font-light'>My Level</div>
				<div className="ml-auto">7.9000/9000</div>
			</div>
			<div className='mt-5'>
				<ChartComponent />
			</div >
			<div className='mt-5'>
				<div className='container  flex flex-row justify-between items-center'>
					<ContentBtn
						name={"Rank"}
						href={"/ranking"}
						Icon={Rank}
						number={'4561'}
					/>
					<ContentBtn
						name={"Coins"}
						href={"/ranking"}
						Icon={Coins}
						number={'345'}
					/>
				</div>
				<ContentBtn
					name={"Messages"}
					href={"/messenger"}
					Icon={Messages}
					number={'15'}
				/>
			</div>
			<div>

			</div>
		</div>
	);
}

export default TeamLeader;
