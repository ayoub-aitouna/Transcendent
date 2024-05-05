'use client'

import Image from 'next/image';
import styles from '@/app/ui/dashboard/nav/nav.module.css'
import Link from "next/link";
import { Carousel } from 'react-bootstrap';
import Slider from 'react-slick';
import SliderSettings from 'react-slick';

function NewTournaments() {
	return (
		<div className='relative h-full '>
			<div className='p-4 '>
				<div className="pt-16 flex items-center bg">
					<button className={`${styles.highlighted} rounded-[4px] w-[145px] h-[23px] text-[12px] font-bold  text-[#FF3D00]`} >  REGISTRATION OPENS </button>
				</div>
				<div className="ml-2 pt-10 flex flex-col justify-center  w-[334px] h-[101px]">
					<div className=' text-[42px] font-bold'> VALORANT VCT </div>
					<div className='text-[42px] font-bold m-0'> CUP 2024 </div>
				</div>
				<div className="pt-16 flex items-center w-[334px] h-[45px] ">
					<div className='text-[12px] font-normal text-[#999999] tracking-tighter'>Valorant is a free-to-play first-person tactical hero shooter developed and published by Riot Games, for Windows. Teased under the codename Project A in October 2019, the game...</div>
				</div>
				<div className='pt-[63px]'>
					<Link href='/tournaments' className=" flex items-center " aria-label="Navigate to profile">
						<button className={`${styles.create_new_trn} rounded-md w-[104px] h-[37px] text-[14px] font-semibold`} >Register now</button>
						<div className="pl-2"><button className={`bg-[#3F3F3F] rounded-md w-[93px] h-[37px] text-[14px] font-semibold`}>Learn more</button></div>
					</Link>
				</div>
			</div>

			<div className="absolute top-[0px] right-[0px]  ">
				<div className="relative  h-[844.63px] w-[500.08px]" >
					<Image className=" blur-3xl" src="/assets/images/valorant_img.jpg" fill alt="Profile Image" />
				</div>
			</div>
			<div className="absolute top-[-30px] right-[44px]  ">
				<div className="relative  h-[544.63px] w-[363.08px]" >
					<Image className="rotate-[12.13deg] " src="/assets/images/valorant_img.jpg" fill alt="Profile Image" />
				</div>
			</div>


		</div>
	);
}


  
export default NewTournaments;
