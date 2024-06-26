"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
type inputProps = {
	error?: boolean;
	helperText?: string;
	setValue?: any;
	props?: any;
	clear?: boolean;
};
const UploadButton = React.forwardRef<HTMLInputElement | null, inputProps>(
	({ error = false, helperText, setValue, clear }) => {
		const [src, setSrc] = useState<string>("");

		const GetUrl = (e: any) => {
			try {
				const reader = new FileReader();
				reader.onload = () => {
					const dataURL = reader.result;
					setSrc(dataURL as string);
				};
				reader.readAsDataURL(e.target.files[0]);
				setValue("image_file", e.target.files[0]);
			} catch (err) {
				setSrc("");
			}
		};
		useEffect(() => {
			setSrc("");
		}, [clear]);

		return (
			<div className='flex flex-col'>
				<label className='w-full h-28 flex flex-col justify-center items-center gap-3 rounded-md border border-secondary-200'>
					{src !== "" && (
						<div className='relative h-24 bg-white flex justify-center items-center'>
							<Image
								src={src}
								width={73}
								height={73}
								alt='uploaded-image'
								className='rounded !h-full'
							/>
							<div
								className='absolute top-[-10%] right-[-10%] h-4 w-4 rounded-full bg-secondary-100 grid place-content-center cursor-pointer'
								onClick={(e) => {
									e.preventDefault();
									setSrc("");
								}}>
								<Image
									src='/assets/icons/light_close.png'
									width={12}
									height={12}
									alt='close-icon'
								/>
							</div>
						</div>
					)}
					{src === "" && (
						<>
							<div className='w-6 h-6 grid place-content-center rounded border border-secondary-200'>
								<Image
									src='/assets/icons/upload.png'
									width={60}
									height={60}
									className='w-4 h-4 '
									alt='upload-icon'
								/>
							</div>
							<p className='text-sm text-secondary-100 text-center'>
								<span className='font-bold text-white'>Click to upload</span> or
								drag and drop
								<br />
								SVG, PNG, JPG or GIF (max. 800x400px)
							</p>
						</>
					)}
					<input
						type='file'
						name='image_file'
						id=''
						accept='image/*'
						onChange={(e) => GetUrl(e)}
						className='opacity-0 w-0 h-0'
					/>
				</label>
				{error && (
					<p className='mt-2 text-sm text-start text-red-600 dark:text-red-500'>
						{helperText}
					</p>
				)}
			</div>
		);
	}
);
export default UploadButton;
