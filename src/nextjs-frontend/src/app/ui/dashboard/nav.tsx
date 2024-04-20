"use client";
import React from "react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, socialLinks } from "@/constant/dashboard";

const AuthNav = () => {
	const pathname = usePathname();
	return (
		<div className='h-[46px] w-full flex flex-row items-center justify-between mt-[20px]'>
			<div className='flex felx-row gap-[64px]'>
				<PlayButton
					value={navLinks[0].title}
					href={navLinks[0].href}
					Selected={pathname === navLinks[0].href}
				/>
				<div className='flex flex-row justify-center items-center gap-[32px] w-full lg:w-auto '>
					{navLinks.slice(1).map((link, index) => (
						<NavButton
							key={index}
							Icon={link.Icon}
							value={link.title}
							href={link.href}
							Selected={pathname === link.href}
						/>
					))}
				</div>
			</div>

			<div className='flex h-full flex-row gap-[16px] items-center'>
				<div className='flex h-full flex-row items-center gap-[11px]'>
					{socialLinks.map((link, index) => (
						<SocialButton key={index} Icon={link.Icon} href={link.href} />
					))}
				</div>
				<div className='w-[160px] h-[50px] rounded-[8px] bg-[#303030]'></div>
			</div>
		</div>
	);
};

const PlayButton = ({
	Selected,
	value,
	href,
}: {
	Selected?: boolean;
	value: string;
	href: string;
}) => {
	if (Selected) return null;
	return (
		<Link
			href={href}
			className=' min-w-[140px] max-h-[37px] rounded-[4px] flex justify-center items-center primary-button-gradiant'>
			<p className='text-[14px] trackin-[-3%] font-semibold text-white  text-center'>
				{value}
			</p>
		</Link>
	);
};

const NavButton = ({
	Selected,
	value,
	Icon,
	href,
}: {
	Selected?: boolean;
	value: string;
	Icon: any;
	href: string;
}) => {
	return (
		<Link
			href={href}
			className={clsx(
				"rounded-[2px] font-semibold text-[18px] tracking-[4%]  ",
				{
					"text-[#FF3D00] border-b-[#FF3D00] border-b-2  ": Selected,
					"text-[#a2a2a2] border-b-transparent border-b-2": !Selected,
				}
			)}>
			<div className='w-full flex flex-row gap-2  py-[5px] justify-center items-center px-2 '>
				<Icon fill={Selected ? "#FF3D00" : "#a2a2a2"} />
				<p>{value}</p>
			</div>
		</Link>
	);
};

const SocialButton = ({ Icon, href }: { Icon: any; href: string }) => {
	return (
		<Link href={href}>
			<div className='w-[40px] h-[40px] rounded-full bg-[#303030] flex justify-center items-center'>
				<Icon width={20} height={16} />
			</div>
		</Link>
	);
};
export default AuthNav;
