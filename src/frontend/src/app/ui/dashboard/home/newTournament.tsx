'use client'
import Image from 'next/image';
import styles from '@/app/ui/dashboard/nav/nav.module.css'
import Link from "next/link";
import { useEffect, useRef, useState } from 'react';
import { PaginationApiResponse } from '@/type';
import { Tournament } from '@/type/dashboard/tournament';
import apiMock from '@/lib/axios-mock';
import { GetAnnouncedTournaments } from '@/api/Tournament';
import Error from "@/app/ui/dashboard/component/Error";
import Empty from '../component/Empty';



function SliderContent({ Tournament }: { Tournament: Tournament }) {
	const buttonStyles = {
		borderRadius: '4px',
		width: '145px',
		height: '23px',
		fontSize: '12px',
		fontWeight: 'bold',
		color: '#FF3D00',
	};
	const images = [
		'/assets/images/valorant1.jpg',
		'/assets/images/valorant_img.jpg',
		'/assets/images/valorant_img0.jpg',
	]
	let index = Math.floor(Math.random() * images.length);
	const current_image = images[index]
	return (
		<div className='position-relative h-100 '>
			<div className='p-4 '>
				<div className="pt-16 flex items-center bg">
					<button className={` ${styles.highlighted}`} style={buttonStyles} >  REGISTRATION OPENS </button>
				</div>
				<div className=" pt-10 flex flex-col justify-center  w-[334px] h-[101px]">
					<div className=' text-[42px] font-bold'> {Tournament.name} </div>
				</div>
				<div className="pt-16 flex items-center w-[334px] h-[45px] ">
					<div className='text-[12px] font-normal text-[#999999] tracking-tighter'>{Tournament.description}</div>
				</div>
				<div className='pt-[63px]'>
					<div className=" flex items-center " aria-label="Navigate to profile">
						<Link href='/tournaments' style={{
							zIndex: 99
						}}> <button className={`${styles.create_new_trn} font-semibold `} style={{ borderRadius: '4px', width: '104px', height: '37px', fontSize: '14px' }} >Register now</button></Link>
						<Link href='/tournaments' className="pl-2"><button className={`bg-[#3F3F3F] rounded-md w-[93px] h-[37px] font-semibold`} style={{ borderRadius: '4px', fontSize: '14px' }}>Learn more</button></Link>
					</div>
				</div>
			</div>

			<div className="absolute top-[0px] right-[0px]  ">
				<div className="relative  h-[844.63px] w-[500.08px]" >
					<Image className=" blur-3xl" src={current_image} width={600} height={900} alt="Profile Image" />
				</div>
			</div>
			<div className="absolute top-[-30px] right-[44px]  ">
				<div className="relative  h-[544.63px] w-[363.08px]" >
					<Image className="rotate-[12.13deg] " src={current_image} width={364} height={600} alt="Profile Image" />
				</div>
			</div>
		</div>
	);
}



function NewTournaments() {
	const [tournaments, setTournament] = useState<Tournament[]>();
	const btn = useRef<HTMLButtonElement>(null);
	let response: Tournament[] = [];
	useEffect(() => {
		btn?.current?.click();
	},
		[btn])

	useEffect(() => {
		const fetchAnnouncedTournaments = async () => {
			try {
				response = await GetAnnouncedTournaments();
				setTournament(response)
				console.log(response)
			} catch (error) {
				<Error
					title='Tournaments Announce not found'
					desc='The Announced Tournaments looking for does not exist.'
				/>
			}
		};
		fetchAnnouncedTournaments();
	}, []);

	return (
		<div>
			{tournaments && tournaments.length >= 1 ?
				<div className="bootstrap-namespace position-relative ">
					<div id="carouselExampleIndicators" className="carousel slide" style={{ maxWidth: '100%', height: '456px', overflow: 'hidden' }} data-bs-ride="true">
						<div className="carousel-indicators">
							<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
							{
								tournaments && tournaments.length > 1 &&
								<><button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2">
								</button><button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button></>
							}
						</div>
						<div className="carousel-inner bg-white" >
							{
								tournaments && tournaments.map((item, index) => (
									<div key={item.id} className={`carousel-item ${index === 0 ? 'active' : ''}`} style={{ height: '456px', userSelect: 'none' }}>
										<SliderContent Tournament={item} />
									</div>
								))
							}
						</div>
						<button ref={btn} className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
							<span className="visually-hidden  carousel-control-prev-icon" aria-hidden="true"></span>
							<span className="visually-hidden">Previous</span>
						</button>
						<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
							<span className="visually-hidden carousel-control-next-icon" aria-hidden="true"></span>
							<span className="visually-hidden">Next</span>
						</button>
					</div>

				</div>
				:
				<div>
					<div className="flex justify-center items-center flex-col h-[456px]">
						<div className="text-3xl font-bold">Tournaments</div>
						<div className="text-lg font-light mt-2">
							No Tournaments Announced yet.
						</div>
					</div>
				</div>
			}
		</div>

	)
}



export default NewTournaments;
