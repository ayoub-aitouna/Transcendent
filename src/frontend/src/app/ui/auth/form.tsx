"use client";
import React from "react";
import Link from "next/link";

const AuthForm: React.FC<{
	title?: string;
	onSubmit: (e: React.FormEvent) => void;
	children?: React.ReactNode;
	error?: boolean;
	error_message?: string | null;
}> = ({ title, onSubmit, children, error, error_message }) => {
	return (
		<div
			className='flex flex-col w-[374px] gap-[45px]
          rounded-[4px] bg-[#303030] px-[25px] py-[27px] justify-center items-center'>
			<div className='flex-1 w-full items-center justify-start flex flex-col mt-[10px] gap-[80px]'>
				<h2 className='font-semibold tracking-[4%] text-[20px]'>{title}</h2>
				<form
					className='flex flex-col w-full items-center gap-[20px]'
					onSubmit={onSubmit}>
					{children}
					{error && (
						<p className='mt-2 text-sm text-center text-red-600 dark:text-red-500'>
							{error_message}
						</p>
					)}
				</form>
			</div>
			<p className='w-[306px] text-[14px] text-center text-[#a2a2a2]'>
				By continuing, you agree to Transcendent's
				<Link href='' className='underline'>
					Terms of Service
				</Link>
				and
				<Link href='' className='underline'>
					Privacy Policy
				</Link>
			</p>
		</div>
	);
};

export default AuthForm;
