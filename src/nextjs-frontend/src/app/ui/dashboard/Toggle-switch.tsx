"use client";

import { useState } from "react";

export default function ToggleSwitch({
	onCheck,
	checked = false,
}: {
	checked?: boolean;
	onCheck?: () => void;
}) {
	const [isChecked, setChecked] = useState<boolean>(checked);
	return (
		<label className='switch'>
			<input
				type='checkbox'
				checked={isChecked}
				onChange={(e) => {
					setChecked((prev) => !prev);
				}}
				onClick={() => onCheck && onCheck()}
			/>
			<span className='slider'></span>
		</label>
	);
}
