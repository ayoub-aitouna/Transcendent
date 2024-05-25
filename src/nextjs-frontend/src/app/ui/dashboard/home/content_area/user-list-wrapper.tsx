
import { AllOnlinePlayers } from "@/constant/dashboard";
import Empty from "../../component/Empty";
import SearchIcon from "../../icons/messenger/search";

export function UsersListWrapper({ children }: {
	children: React.ReactNode;
}) {
	return (
		<div className='flex items-center justify-center w-full'>
			<div className='p-10 bg-[#292929] w-[894px] h-[890px]'>
				<div className='pb-6'>
					<div className="flex flex-row items-center justify-between  relative">
						<textarea
							className="flex-row items-center justify-between rounded-lg overflow-hidden p-3 bg-[#474747] pl-10 h-[50px] w-full resize-none outline-none"
							placeholder="Type Name of User"
						></textarea>
						<div className="absolute pl-3 top-1/2 transform -translate-y-1/2">
							<SearchIcon />
						</div>

					</div>
				</div>
				{!AllOnlinePlayers.length ?
					<div className="flex h-[320px] w-full justify-center items-center">
						<Empty text="no Online Players are available right now" />
					</div>
					:
					<div className={`h-[750px] overflow-y-scroll hide-scrollbar `}>
						{children}
					</div>
				}
			</div>
		</div>
	);
}