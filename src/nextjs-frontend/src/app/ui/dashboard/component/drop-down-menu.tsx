"use client";
import React, { useEffect, useState } from "react";
import ThreePointsIcon from "../icons/messenger/three-points";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/provider/ToastProvider";

export const MenuButton = ({
	title,
	icon,
	onClick,
}: {
	title: string;
	icon: string;
	onClick?: () => void;
}) => {
	return (
		<button
			className='flex flex-row items-start justify-start text-[16px] text-[#878787] gap-2 hover:bg-[#262626] py-2 px-2 w-full rounded-md'
			onClick={() => onClick && onClick()}>
			<Image src={icon || ""} alt='Block User' height={24} width={24} />
			<p className=''>{title}</p>
		</button>
	);
};

const DropDownMenu = ({
	username,
	children,
}: {
	username: string;
	children: React.ReactNode;
}) => {
	const [clickedThreePoints, setClickedThreePoints] = useState(false);
	const router = useRouter();
	const handleThreePoints = () => {
		setClickedThreePoints(!clickedThreePoints);
	};
	const { addToast } = useToast();
	const deleteTournament = async () => {
		try {
		} catch (error) {}
	};

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			const panel = document.getElementById("tournament-menu");
			const trigger = document.getElementById("three-points-trigger");
			if (
				panel &&
				trigger &&
				!panel.contains(target) &&
				!trigger.contains(target)
			) {
				setClickedThreePoints(false);
			}
		};

		document.addEventListener("mousedown", handleOutsideClick);

		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, []);

	return (
		<div className=''>
			<div
				id='three-points-trigger'
				className='flex flex-col items-center'
				onClick={handleThreePoints}>
				<ThreePointsIcon />
			</div>
			{clickedThreePoints && (
				<div
					id='tournament-menu'
					className='z-[999] absolute top-10 right-3
                     bg-[#161616]  w-[200px] p-4 flex flex-col items-center justify-center rounded-md'>
					{children}
				</div>
			)}
		</div>
	);
};

export default DropDownMenu;
