"use client";
import { inputProps } from "@/type";
import clsx from "clsx";
import React from "react";

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
			props,
			additionalStyles,
		},
		ref
	) => {
		const handle_register = register !== null ? register(name) : null;
		return (
			<div className='flex flex-col w-full gap-[10px]'>
				<label className='text-[14px] text-[#a2a2a2]' htmlFor={type}>
					{title}
				</label>
				<input
					className={clsx(
						"w-full h-[50px] bg-[#606060]/50 outline-none px-2",
						additionalStyles,
						{
							"border border-red-700": error,
						}
					)}
					onChange={onChange}
					placeholder={placeholder}
					type={type}
					name={name}
					{...props}
					id={type}
					{...handle_register}
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
