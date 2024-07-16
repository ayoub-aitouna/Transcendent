'use client'
import React, { useEffect, useState } from 'react'
import { removeNotification, seenNotification } from '@/api/user';
import { useRouter } from 'next/navigation';
import { useToast } from '@/app/provider/ToastProvider';

function NotificationMenu({ id }: { id: number }) {
	const [clickedThreePoints, setClickedThreePoints] = useState(false);
	const [deleteSuccess, setDeleteSuccess] = useState(false)
	const router = useRouter();
	const handleThreePoints = () => {
		setClickedThreePoints(!clickedThreePoints);
	};

	const { addToast } = useToast()
	const deleteNotification = async () => {
		try {
			await removeNotification(id)
			setDeleteSuccess(true)
		} catch (error) {
			addToast({
				id: id,
				title: "Error",
				message: "we have encountered an error while trying to remove this Notification",
				icon: "/assets/icons/light_close.png",
				backgroundColor: 'bg-red-500'
			})
		}
	}

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			const panel = document.getElementById('Notification-menu');
			const trigger = document.getElementById('three-points-trigger');
			if (panel && trigger && !panel.contains(target) && !trigger.contains(target)) {
				setClickedThreePoints(false);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, []);

	return (
		<div className="">
			<div
				id="three-points-trigger"
				className="flex flex-col items-center p-7"
				onClick={handleThreePoints}
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g
					fill="none"><path
						d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
					<path fill="currentColor"
						d="M12 16.5a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m0-6a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m0-6a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3" />
				</g>
				</svg>
			</div>
			{clickedThreePoints && (
				<div
					id="Notification-menu"
					className=" bg-[#161616] z-50 absolute right-[8px] bottom-[-42%] h-[40px] w-[120px] p-4 flex flex-col items-center justify-center rounded-md"
				>
					<button className="flex flex-row items-start justify-start text-[16px] text-[#878787] gap-2 hover:bg-[#262626] py-2 px-2 w-full rounded-md"
						onClick={() => deleteNotification()}>
						<p className=" font-light text-[12px]"> Remove </p>
					</button>
				</div>
			)}
		</div>
	);
}

export default NotificationMenu;
