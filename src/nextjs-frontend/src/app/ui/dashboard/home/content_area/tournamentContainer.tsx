import { string } from "yup";
import Image from 'next/image';
import styles from '@/app/ui/dashboard/nav/nav.module.css'
import RightArrow from "../../icons/content_area/RightArrow";



export function TournamentsContainer({ href, name, followers, SecName }: {
	href: string;
	name: string;
	followers: string;
	SecName: string;
}) {
	const handleClick = () => {
		window.location.href = "/tournaments";
	};
	return (
		<button
			className={` w-full bg-[#373737] h-[97px] flex items-center justify-between rounded-lg overflow-hidden  p-2  mt-2`}
			onClick={handleClick}
			aria-label="Navigate to game">
			<div className='flex items-center justify-between w-full '>
				<Image className="" src={href} alt="Profile Image" width={73} height={73} />
				<div />
				<div className="w-full flex items-start flex-col">
					<div className="pl-[15px]  font-bold text-[18px]">{name}</div>
					<div className={`pl-[15px] text-[#878787] text-xs truncate font-normal`}>{SecName} </div>
				</div>
			</div>
			<div className="flex flex-row">
				<div className="flex flex-row justify-end w-full h-10">
					<div className={`flex flex-col items-start pr-12`}>
						<div className="font-bold text-[18px]">{followers}</div>
						<div className={`text-[#878787] text-xs truncate font-normal`}> Online Players</div>
					</div>
					<div className="flex flex-row items-center justify-center">
						<RightArrow />
					</div>
				</div>
			</div>
		</button>
	);
};