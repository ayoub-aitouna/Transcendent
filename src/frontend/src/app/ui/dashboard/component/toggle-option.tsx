"use client";
import ToggleSwitch from "@/app/ui/dashboard/component/Toggle-switch";
import { useEffect, useState } from "react";

export default function ToggleOption({
	title,
	desc,
	checked,
	onCheck,
}: {
	title: string;
	desc: string;
	checked?: boolean;
	onCheck?: (value: boolean) => void;
}) {
	return (
		<div className='flex flex-row justify-between items-center p-2'>
			<div className='flex flex-col items-start justify-center gap-2'>
				<h6 className='text-lg font-semibold tracking-wide'>{title}</h6>
				<p className='text-[#94969C] font-light text-sm'>{desc}</p>
			</div>
			<ToggleSwitch
				checked={checked}
				onCheck={(value) => onCheck && onCheck(value)}
			/>
		</div>
	);
}
