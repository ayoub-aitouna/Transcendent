import * as React from "react";

export const ViewAll = () => {
	const handleClick = () => {
		// Handle button click event to navigate to the game
		window.location.href = "/kmahdi.jpg";
	};

	return (
		<button className="flex  flex-row  rounded-[4px] bg-[#444444] p-2 h-[28px] min-w-[73px] "
			onClick={handleClick} aria-label="Navigate to game">
			<div className="flex flex-row max-w-[80px] items-center justify-between mx-auto">
				<div className="font-semibold text-[#A5A5A5] tracking-[.025] text-[10px]">VIEW ALL</div>
			</div>
		</button>
	);
};

export default ViewAll;