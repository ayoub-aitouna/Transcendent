"use client";
import Image from "next/image";
import { useToast } from "@/app/provider/ToastProvider";
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Toast } from "@/type/dashboard/index";

const ToastItem = ({
	item,
	removeToast,
}: {
	item: Toast;
	removeToast: (id: number) => void;
}) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			removeToast(item.id);
		}, 11 * 1000);
		return () => clearTimeout(timer);
	}, [item.id, removeToast]);

	return (
		<div className='dropdown-animation rounded overflow-hidden w-[643px] h-[143px] bg-secondary-300 flex flex-col pointer-events-auto'>
			<div className='flex-1 flex flex-row  cursor-pointer'>
				<div className='flex-1 flex flex-row  items-center justify-start p-3 gap-4'>
					<div
						className={clsx(
							"w-16 h-16 rounded-full flex justify-center items-center ",
							item.backgroundColor
						)}>
						<Image
							className='cursor-pointer'
							width={30}
							height={30}
							src={item.icon}
							alt='toast-icon'
						/>
					</div>
					<div className='flex-1 flex-col items-center justify-start gap-3'>
						<h1 className='font-bold text-white uppercase'>{item.title}</h1>
						<p>{item.message}</p>
					</div>
				</div>
				<div
					className='w-9 grid place-content-center cursor-pointer'
					onClick={() => removeToast(item.id)}>
					<Image
						className='cursor-pointer'
						width={24}
						height={24}
						src='/assets/icons/light_close.png'
						alt='close'
					/>
				</div>
			</div>
			<div
				className={clsx(
					"loading-progress-bar-10 duration-[2s] h-[10px]",
					item.backgroundColor
				)}></div>
		</div>
	);
};

const ToastContainer = () => {
	const { toasts, removeToast } = useToast();
	return (
		<div className='fixed z-[999] top-0 left-0 right-0 bottom-0 h-full flex justify-center items-start py-10 pointer-events-none'>
			<ul className='flex flex-col-reverse gap-3 '>
				{toasts.map((item, _) => (
					<ToastItem key={item.id} item={item} removeToast={removeToast} />
				))}
			</ul>
		</div>
	);
};

export default ToastContainer;
