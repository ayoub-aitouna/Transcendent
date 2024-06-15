import React from "react";
import clsx from "clsx";
import Link from "next/link";
import RightArrow from "@/app/ui/dashboard/icons/content_area/right-arrow";

export default function OptionLink({
	title,
	desc,
	danger = false,
	href,
}: {
	title: string;
	desc: string;
	href?: string;
	danger?: boolean;
}) {
	return (
		<Link
			href={href ? href : "/"}
			className='flex flex-row justify-between items-center p-2'>
			<div className='flex flex-col items-start justify-center gap-2'>
				<h6
					className={clsx("text-lg font-semibold tracking-wide", {
						"text-[#9C2828]": danger === true,
					})}>
					{title}
				</h6>
				<p
					className={clsx(`text-[#94969C] font-light text-sm `, {
						"text-[#9C2828]": danger === true,
					})}>
					{desc}
				</p>
			</div>
			<RightArrow color={danger ? "#9C2828" : "#ffffff"} />
		</Link>
	);
}
