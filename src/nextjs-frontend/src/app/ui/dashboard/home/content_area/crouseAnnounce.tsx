'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';

import Image from 'next/image';

function CarouselAnnounce() {
	return (
		<div>
			<div id="carouselExampleControlsNoTouching" className="carousel slide" data-bs-touch="false">
				<div className="carousel-inner">
					<div className="carousel-item active">
						{/* <Image src='/assets/images/Valorant.png' alt="Profile Image" width={363.08} height={544.63} /> */}

					</div>
					<div className="carousel-item">
						{/* <Image src='/assets/images/Valorant.png' alt="Profile Image" width={363.08} height={544.63} /> */}

					</div>
					<div className="carousel-item">
						{/* <Image src='/assets/images/Valorant.png' alt="Profile Image" width={363.08} height={544.63} /> */}

					</div>
				</div>
				<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
					<span className="carousel-control-prev-icon" aria-hidden="true"></span>
					<span className="visually-hidden">Previous</span>
				</button>
				<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
					<span className="carousel-control-next-icon" aria-hidden="true"></span>
					<span className="visually-hidden">Next</span>
				</button>
			</div>
		</div>
	);
}

export default CarouselAnnounce;