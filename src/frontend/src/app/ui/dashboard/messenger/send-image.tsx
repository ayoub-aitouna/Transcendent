'use client'

import React, {useState,} from "react";
import Upload from "../icons/messenger/Upload";

export default function SendImage({ onImageUpload }: { onImageUpload: (image: File | null) => void }) {
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files && e.target.files[0];
		if (file) {
			setSelectedImage(URL.createObjectURL(file));
			onImageUpload(file);
		}
	};

	const removeImage = () => {
		setSelectedImage(null);
		onImageUpload(null);
	};

	return (
		<div>
			{selectedImage ? (
				<div className='p-2 pr-8' onClick={removeImage}>
					<div className='p-2'>
						<Upload color=' #3342ff ' />
					</div>
					<div className='text-[10px] text-[#3342ff]'>Uploaded</div>
				</div>
			) : (
				<label className='p-2 pr-8'>
					<div className='p-1'>
						<Upload color='#878787' />
					</div>
					<div className='text-[10px] text-[#878787]'>Upload</div>
					<input
						type='file'
						className='hidden'
						onChange={handleImageUpload}
						accept='image/*'
					/>
				</label>
			)}
		</div>
	);
};