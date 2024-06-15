"use client";

import { useState, useEffect } from "react";

export default function ToggleSwitch({
	onCheck,
	checked = false,
}: {
	checked?: boolean;
	onCheck?: (value: boolean) => void;
}) {
	const [isChecked, setChecked] = useState<boolean>(false);

	useEffect(() => {
		setChecked(checked);
	}, [checked]);

	return (
		<label className='switch'>
			<input
				type='checkbox'
				checked={isChecked}
				onChange={() => {
					onCheck && onCheck(!isChecked);
					setChecked((prev) => !prev);
				}}
			/>
			<span className='slider'></span>
		</label>
	);
}
