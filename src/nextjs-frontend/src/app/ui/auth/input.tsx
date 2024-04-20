"use client";
import React from "react";

type inputProps = {
	type: string;
	placeholder: string;
	title: string;
	name: string;
	error: boolean;
	helperText?: string | null;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	register: any;
};

const Input = React.forwardRef<HTMLInputElement | null, inputProps>(
	(
		{
			type,
			placeholder,
			title,
			name,
			error = false,
			helperText,
			onChange,
			register,
		},
		ref
	) => {
		return (
			<div className='flex flex-col w-full gap-[10px]'>
				<label className='text-[14px] text-[#a2a2a2]' htmlFor={type}>
					{title}
				</label>
				<input
					className='w-full h-[50px] bg-[#606060]/50 outline-none px-2'
					onChange={onChange}
					placeholder={placeholder}
					type={type}
					name={name}
					id={type}
					{...register(name)}
				/>
				{error && (
					<p className='mt-2 text-sm text-start text-red-600 dark:text-red-500'>
						{helperText}
					</p>
				)}
			</div>
		);
	}
);

export default Input;
