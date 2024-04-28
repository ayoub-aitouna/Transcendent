import Filter from "../../icons/content_area/filters";

export function FilterBtn({ name }: {
	name: string;
}) {
	const handleClick = () => {
		window.location.href = '/filter';
	};
	return (
		<div className="mb-8 flex items-center justify-between" onClick={handleClick} aria-label="Navigate to profile">
			<div className=" text-white  truncate font-bold text-base">{name}</div>
			<button
				className={`flex-row items-center rounded-md  bg-[#444444] w-[93px] h-[32px]`}
				onClick={handleClick}
				aria-label="Navigate to game">
				<div className='mx-auto flex  justify-start ml-2'> <Filter /> <div />
					<div className="flex items-center justify-between mx-auto ">
						<div className="text-white text-xs font-semibold"> FILTER </div>
					</div>
				</div>
			</button>
		</div>
	);
};