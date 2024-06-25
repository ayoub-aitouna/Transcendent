import {
	NotificationContent,
	Notifications,
} from "@/app/ui/dashboard/nav/NavBar";
import apiMock from "@/lib/axios-mock";
import { PaginationApiResponse } from "@/type";
import React from "react";

const GetData = async () => {
	const response = await apiMock.get("/notifications/");
	return response.data;
};
const page = async () => {
	const notifications: PaginationApiResponse<Notifications> = await GetData();

	return (
		<div className='p-2 rounded h-full bg-[#242424] flex flex-col'>
			<div className='font-semibold text-[14px] w-full text-[#666666]'>
				{" "}
				NOTIFICATION
			</div>
			<div className='w-full border-t-[2px] border-[#363636] pt-3 mt-3'></div>
			<div className='flex h-full w-full flex-col items-center'>
				<div className='w-full h-full overflow-y-scroll hide-scrollbar'>
					{notifications?.results.map((item, index) => (
						<div
							key={index}
							className={`container flex flex-col justify-between items-center relative`}>
							<NotificationContent notifications={item} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default page;
