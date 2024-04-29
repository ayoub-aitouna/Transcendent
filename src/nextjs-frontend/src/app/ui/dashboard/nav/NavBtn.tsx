import Link from 'next/link';
import * as React from "react";
import { usePathname } from 'next/navigation'

function NavBtn({ href, name, Icon }: {
	href: string;
	name: string;
	Icon: any;
}) {

	const pathname = usePathname()
	console.log('pathname', pathname, 'href', href, 'pathname.startsWith(href)', pathname.startsWith(href))
	const selected = pathname.startsWith(href);

	return (
		<Link href={href} className='underline-none '>
			<div className={`flex items-center space-x-1 cursor-pointer  h-12 border-b-2 
					${selected ? "border-[#FF3D00]  text-[#FF3D00]" : "text-[#A2A2A2] border-transparent"}`}>
				<Icon className="" fill={selected ? '#FF3D00' : '#A2A2A2'} />
				<div>{name}</div>
			</div>
		</Link>
	)
}

export default NavBtn;


