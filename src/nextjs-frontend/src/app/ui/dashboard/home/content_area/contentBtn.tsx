import { string } from "yup";

export function ContentBtn({ name, Icon, href, number }: {
	name: string;
	Icon: any;
	href: string;
	number: string;
}) {
	const isMessage = name == "Messages";
	const handleClick = () => {
		window.location.href = href;
	};
	return (
		<button
			className={`profile-button flex items-center justify-between rounded-lg ${number && (isMessage ? "w-[340px]" : "w-[165px]")
				} overflow-hidden bg-[#323232] p-2 h-[44px] mb-[10px]`}
			onClick={handleClick}
			aria-label="Navigate to game"
		>
			<div className='flex items-center justify-between  '> <Icon /> <div />
				<div className="flex items-center justify-between ml-2">
					<div className="text-white font-medium">{name}</div>
				</div>
			</div>
			{number && (
				<div className="flex items-center justify-end">
					<div className="bg-[#434343] rounded-md dark:text-white">
						<div className="ml-3 mr-3 font-medium">{number}</div>
					</div>
				</div>
			)}

		</button>
	);
};