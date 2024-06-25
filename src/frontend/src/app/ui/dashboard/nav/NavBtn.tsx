import Link from "next/link";
import * as React from "react";
import { usePathname } from "next/navigation";

function NavBtn({
	href,
	name,
	Icon,
}: {
	href: string;
	name: string;
	Icon: any;
}) {
	const pathname = usePathname();
	const selected = pathname.startsWith(href);

	return (
		<Link href={href} className='underline-none'>
			<div
				className={`flex items-center space-x-1 cursor-pointer h:6 lg:h-12 border-b-2 
					${
						selected
							? "border-[#FF3D00]  text-[#FF3D00]"
							: "text-[#A2A2A2] border-transparent"
					}`}>
				<Icon className='scale-75 lg:scale-100' fill={selected ? "#FF3D00" : "#A2A2A2"} />
				<p className='text-sm lg:text-base'>{name}</p>
			</div>
		</Link>
	);
}

export default NavBtn;
