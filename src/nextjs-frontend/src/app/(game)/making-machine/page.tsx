import React from 'react'
import Image from 'next/image'

const page = () => {
	return (
		<div className='bootstrap-namespace position-relative '>
			<div className="bg-image">
				<Image
					src="/assets/images/matching-bg.jpg" // replace with your image path
					layout="fill"
					alt=''
					objectFit="cover"
					quality={100}
				/>
				<div className="content">
					{/* Your content goes here */}
				</div>
			</div>
		</div>
	)
}

export default page
