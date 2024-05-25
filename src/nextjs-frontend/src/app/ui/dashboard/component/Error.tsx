import React from "react";
import Link from "next/link";
const Error = ({
	status,
	title,
	desc,
}: {
	status?: number;
	title: string;
	desc: string;
}) => {
	return (
		<section className='h-full grid place-content-center'>
			<div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
				<div className='mx-auto max-w-screen-sm text-center'>
					<h1 className='mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500'>
						{status}
					</h1>
					<p className='mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white'>
						{title}
					</p>
					<p className='mb-4 text-lg font-light text-gray-500 dark:text-gray-400'>
						{desc}
					</p>
					<Link
						href='/home'
						className='inline-flex text-white bg-primary hover:bg-primary/60 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4'>
						Back to Homepage
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Error;