import React from "react";

const FormWrapper = ({
	title,
	desc,
	children,
}: {
	title: string;
	desc: string;
	children: React.ReactNode;
}) => {
	return (
		<>
			<div className=' w-fit flex flex-col gap-3'>
				<div className='flex flex-col gap-2 py-3'>
					<h6 className='text-lg font-bold text-white'>{title}</h6>
					<p className='text-[14px] text-[#a2a2a2]'>{desc}</p>
				</div>
				<div className='w-[640px] rounded-lg bg-black min-h-[408px]'>
					{children}
				</div>
			</div>
		</>
	);
};

export default FormWrapper;
