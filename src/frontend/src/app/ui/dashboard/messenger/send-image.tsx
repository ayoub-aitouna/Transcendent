'use client'

import React, { useEffect, useState, } from "react";
import Upload from "../icons/messenger/Upload";
import { useModal } from "@/app/provider/modal-provider";
import UploadImage from "../../modal/upload-image";

export default function SendImage({ onImageUpload, onImageConfirm }: {
	onImageUpload: (image: File | null) => void,
	onImageConfirm: (file: File) => void
}) {
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const { OpenModal, CancelModal } = useModal();
	const [file, setFile] = useState<any>()
	const [error, setError] = useState<boolean>(false);


	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files && e.target.files[0];
		if (file) {
			console.log("file type:" , file.type)
            if (file.type !== 'image/png' && file.type !== 'image/jpeg') 
                setError(true);
			setSelectedImage(URL.createObjectURL(file));
			setFile(file)
		}
	};

	const removeImage = () => {
		setSelectedImage(null);
		onImageUpload(null);
	};

	useEffect(() => {
		if (selectedImage) {
			OpenModal(
				<UploadImage
					onCancel={() => {
						removeImage();
						CancelModal();
					}}
					onConfirm={() => {
						if (file && !error) {
							onImageConfirm(file);
						}
						removeImage();
						CancelModal();
					}}
					imageSrc={selectedImage}
					error={error}
				/>
			);
		}
	}, [selectedImage]);

	return (
		<div>
			{selectedImage ? (
				<div className='' onClick={removeImage}>
					<div className='p-1'>
						<Upload color=' #3342ff ' />
					</div>
					<div className='text-[10px] text-[#3342ff]'>Upload</div>
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
						accept='image/png, image/jpeg'
					/>
				</label>
				
			)}
		</div>
	);
};

